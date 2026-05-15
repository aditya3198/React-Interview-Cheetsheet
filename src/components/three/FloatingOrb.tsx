'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

export default function FloatingOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#330a3b"
        emissive="#e461fb"
        emissiveIntensity={0.25}
        roughness={0.2}
        metalness={0.8}
      />
      <pointLight color="#e461fb" intensity={3} distance={6} />
    </mesh>
  );
}
