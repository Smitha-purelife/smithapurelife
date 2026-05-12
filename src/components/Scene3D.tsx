import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, MeshTransmissionMaterial, Sparkles, Float } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// --- Custom Shader Material for Flowing Liquid Silk ---
const LiquidSilkMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#FDF9F6") },
    uColor2: { value: new THREE.Color("#DDF1E9") },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    // Classic Perlin 3D Noise 
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
    float cnoise(vec3 P){
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Complex wave motion based on time, scroll, and mouse
      float noiseFreq = 0.5;
      float noiseAmp = 3.0;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2 + uMouse.x, pos.y * noiseFreq + uScroll * 5.0, uTime * 0.1);
      
      float elevation = cnoise(noisePos) * noiseAmp;
      
      // Add secondary high-frequency ripples
      elevation += cnoise(noisePos * 2.5) * (noiseAmp * 0.2);
      
      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + 2.0) / 4.0;
      vec3 color = mix(uColor1, uColor2, clamp(mixStrength, 0.0, 1.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function FlowingLandscape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, viewport } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / Math.max(totalHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate mouse and scroll
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x * 5, mouse.y * 5), 0.05);
      const currentScroll = materialRef.current.uniforms.uScroll.value;
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(currentScroll, scrollProgress, 0.05);
    }
    
    if (meshRef.current) {
      // Tilt the entire landscape slightly based on mouse
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -Math.PI / 3 + mouse.y * 0.1, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -5, -15]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={LiquidSilkMaterial.vertexShader}
        fragmentShader={LiquidSilkMaterial.fragmentShader}
        uniforms={THREE.UniformsUtils.clone(LiquidSilkMaterial.uniforms)}
        wireframe={false}
      />
    </mesh>
  );
}

// Giant floating abstract glass droplets
function GlassDroplets() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / Math.max(totalHeight, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const droplets = useMemo(() => Array.from({ length: 8 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 5
    ] as [number, number, number],
    scale: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.1,
    offset: Math.random() * Math.PI * 2
  })), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const drop = droplets[i];
      // Parallax scrolling
      const targetY = drop.position[1] + (scrollProgress * 15) + Math.sin(t * drop.speed + drop.offset) * 2;
      
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.05);
      child.position.x = THREE.MathUtils.lerp(child.position.x, drop.position[0] + mouse.x * drop.scale * 2, 0.05);
      
      child.rotation.x += 0.005 * drop.speed;
      child.rotation.y += 0.005 * drop.speed;
    });
  });

  return (
    <group ref={groupRef}>
      {droplets.map((drop, i) => (
        <mesh key={i} position={drop.position} scale={drop.scale}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial 
            backside
            samples={16}
            resolution={1024}
            transmission={1}
            roughness={0.05}
            thickness={2.5}
            ior={1.5}
            chromaticAberration={1.5}
            anisotropy={0.5}
            distortion={1.2}
            distortionScale={0.8}
            temporalDistortion={0.2}
            color="#ffffff"
            attenuationColor="#A8D5BA"
            attenuationDistance={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Interactive 3D Botanical Debris (Leaves/Petals)
function BotanicalDebris() {
  const groupRef = useRef<THREE.Group>(null);
  
  const debris = useMemo(() => Array.from({ length: 15 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 2
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
    scale: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.2 + 0.05
  })), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * debris[i].speed) * 0.01;
      child.rotation.x += 0.01;
      child.rotation.z += 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {debris.map((item, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#A8D5BA" : "#DDF1E9"} 
              transparent 
              opacity={0.6}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Central Interactive Light Orb (acts as a sun/light source)
function LightOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 5 + Math.sin(t)*0.5, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      <pointLight intensity={10} color="#ffffff" distance={40} decay={1.5} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FDF9F6]">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }} gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}>
        <color attach="background" args={["#FDF9F6"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} color="#DDF1E9" />
          
          <LightOrb />
          <FlowingLandscape />
          <GlassDroplets />
          <BotanicalDebris />
          
          {/* Intense botanical particles */}
          <Sparkles count={800} scale={30} size={4} speed={0.4} opacity={0.6} color="#052B08" />
          <Sparkles count={400} scale={40} size={2} speed={1.2} opacity={0.3} color="#A8D5BA" />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
