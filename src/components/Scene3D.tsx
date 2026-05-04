import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function ProceduralBottle() {
  const meshRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Dynamic positioning based on scroll
      const targetX = Math.sin(scrollProgress * Math.PI) * 2;
      const targetY = -0.8 + scrollProgress * 1.5;
      const targetZ = -Math.sin(scrollProgress * Math.PI) * 1;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY + Math.sin(t / 2) * 0.05, 0.05);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
      
      const mouseX = (state.mouse.x * Math.PI) / 10;
      const mouseY = (state.mouse.y * Math.PI) / 10;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX + scrollProgress * Math.PI * 2, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.05);
    }
  });

  return (
    <group ref={meshRef} position={[1.5, -0.8, 0]} scale={0.8}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 1.8, 64]} />
        <meshPhysicalMaterial 
          color="#D1E0D7" 
          transmission={0.98} 
          thickness={0.5} 
          roughness={0.1} 
          metalness={0.05}
          clearcoat={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.61]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="white" opacity={0.7} transparent />
      </mesh>

      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 32]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.6, 32]} />
        <meshStandardMaterial color="#1A3129" metalness={0.1} roughness={0.6} />
      </mesh>
    </group>
  );
}

function FloatingPetals() {
  const petals = Array.from({ length: 25 });
  return (
    <>
      {petals.map((_, i) => (
        <Float
          key={i}
          speed={0.8} 
          rotationIntensity={2} 
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}
        >
          <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <planeGeometry args={[0.12, 0.18]} />
            <meshStandardMaterial 
              color="#D1E0D7" 
              transparent 
              opacity={0.15} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D1E0D7" />
          
          <ProceduralBottle />
          <FloatingPetals />
          
          <Environment preset="apartment" />
          <ContactShadows 
            position={[0, -2.8, 0]} 
            opacity={0.3} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
