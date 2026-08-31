"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Custom shader material for a black hole effect
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Animate the ring
          float ring = smoothstep(0.4, 0.45, dist) - smoothstep(0.45, 0.5, dist);
          
          // Pulsing glow
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          
          // Color mix (Black core, glowing edges)
          vec3 coreColor = vec3(0.0);
          vec3 edgeColor = vec3(0.2, 1.0, 0.5); // Neon green
          
          vec3 finalColor = mix(coreColor, edgeColor, ring * pulse * 2.0);
          
          // Fade out the hard edges of the plane
          float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [])

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function FloatingAstronaut() {
  const ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
      ref.current.rotation.x = state.clock.elapsedTime * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={ref} position={[0, 0, 2]}>
      {/* Simple abstract cube representing the user floating in space */}
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  )
}

export default function NotFound() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black -mt-32">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <BlackHole />
          <FloatingAstronaut />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
        <h1 className="text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none select-none">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-white tracking-tight">
          Lost in the void.
        </h2>
        <p className="mt-4 text-lg text-zinc-400 max-w-md mx-auto">
          The page you are looking for has been pulled into a singularity and no longer exists.
        </p>
        <div className="mt-10 pointer-events-auto">
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
