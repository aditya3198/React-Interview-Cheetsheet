'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import SceneEnvironment from './SceneEnvironment';
import ParticleField from './ParticleField';
import FloatingOrb from './FloatingOrb';

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneEnvironment />
        <ParticleField />
        <FloatingOrb />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
