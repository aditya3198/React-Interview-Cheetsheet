'use client';

export default function SceneEnvironment() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#e461fb" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#330a3b" intensity={1} />
      <fog attach="fog" args={['#20222b', 8, 30]} />
    </>
  );
}
