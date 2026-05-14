import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, MeshTransmissionMaterial, Sparkles, Float, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useRef, useState, useMemo } from 'react';
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

    // Simpler Noise for performance
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 0.4;
      float noiseAmp = 2.5;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.15 + uMouse.x * 0.2, pos.y * noiseFreq + uScroll * 3.0, uTime * 0.05);
      float elevation = snoise(noisePos) * noiseAmp;
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
  const { mouse } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x * 2, mouse.y * 2), 0.03);
      
      // Drive scroll uniform from window scroll without React state
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / Math.max(totalHeight, 1);
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uScroll.value, progress, 0.05);
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -Math.PI / 3 + mouse.y * 0.05, 0.03);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.05, 0.03);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -5, -15]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[50, 50, 48, 48]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={LiquidSilkMaterial.vertexShader}
        fragmentShader={LiquidSilkMaterial.fragmentShader}
        uniforms={THREE.UniformsUtils.clone(LiquidSilkMaterial.uniforms)}
      />
    </mesh>
  );
}

function GlassDroplets({ quality = 1 }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const droplets = useMemo(() => Array.from({ length: quality > 0.5 ? 6 : 3 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 5
    ] as [number, number, number],
    scale: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.1,
    offset: Math.random() * Math.PI * 2
  })), [quality]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / Math.max(totalHeight, 1);

    groupRef.current.children.forEach((child, i) => {
      const drop = droplets[i];
      if (!drop) return;
      const targetY = drop.position[1] + (scrollProgress * 15) + Math.sin(t * drop.speed + drop.offset) * 2;
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.05);
      child.position.x = THREE.MathUtils.lerp(child.position.x, drop.position[0] + mouse.x * drop.scale, 0.05);
      child.rotation.x += 0.002 * drop.speed;
      child.rotation.y += 0.002 * drop.speed;
    });
  });

  return (
    <group ref={groupRef}>
      {droplets.map((drop, i) => (
        <mesh key={i} position={drop.position} scale={drop.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshTransmissionMaterial 
            backside
            samples={quality > 0.5 ? 4 : 2}
            resolution={quality > 0.5 ? 128 : 64}
            transmission={1}
            roughness={0.1}
            thickness={2}
            ior={1.2}
            chromaticAberration={0.5}
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#A8D5BA"
            attenuationDistance={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function BotanicalDebris() {
  const groupRef = useRef<THREE.Group>(null);
  
  const debris = useMemo(() => Array.from({ length: 12 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 2
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
    scale: Math.random() * 0.4 + 0.1,
    speed: Math.random() * 0.2 + 0.05
  })), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * debris[i].speed) * 0.005;
      child.rotation.x += 0.005;
      child.rotation.z += 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {debris.map((item, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#A8D5BA" : "#DDF1E9"} 
              transparent 
              opacity={0.4}
              roughness={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function LightOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 4, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 4 + Math.sin(t)*0.3, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[1.2, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      <pointLight intensity={5} color="#ffffff" distance={30} decay={2} />
    </mesh>
  );
}

export default function Scene3D() {
  const [dpr, setDpr] = useState(1);
  const [quality, setQuality] = useState(1);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FDF9F6]">
      <Canvas 
        dpr={dpr} 
        performance={{ min: 0.5 }} 
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance", 
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <PerformanceMonitor onIncline={() => {setDpr(2); setQuality(1)}} onDecline={() => {setDpr(1); setQuality(0.5)}} />
        <color attach="background" args={["#FDF9F6"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Suspense fallback={null}>
          <ambientLight intensity={1} color="#DDF1E9" />
          
          <LightOrb />
          <FlowingLandscape />
          <GlassDroplets quality={quality} />
          <BotanicalDebris />
          
          <Sparkles count={150} scale={30} size={3} speed={0.3} opacity={0.4} color="#052B08" />
          <Sparkles count={80} scale={40} size={1} speed={0.8} opacity={0.2} color="#A8D5BA" />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

