"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial 
          color="#39FF14" // Will appear green-ish, but Environment mapping makes it look premium
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full aspect-square max-w-lg mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-tr from-muted/50 to-muted/10 border shadow-2xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <PresentationControls 
          global={false} // Only rotates when dragging the canvas
          cursor={true}
          snap={true}
          speed={1}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <AnimatedShape />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
        <span className="text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border">
          Drag to interact
        </span>
      </div>
    </div>
  )
}
