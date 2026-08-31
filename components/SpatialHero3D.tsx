"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleSphere({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Lower particle count on mobile for performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const count = isMobile ? 1500 : 4000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate points on a sphere with slight displacement
      const r = 2.5 + (Math.random() - 0.5) * 0.4;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Respect prefers-reduced-motion for accessibility
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Subtle constant rotation + mouse influence
  useFrame((state, delta) => {
    if (!prefersReducedMotion.current) {
      // 1. Constant slow spin on the inner sphere
      if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += delta * 0.02;
      }
      
      // 2. High interactivity: Make the entire group follow the cursor (like Antigravity)
      if (groupRef.current) {
        // Heavy rotation tracking
        const targetRotX = -state.pointer.y * 0.6;
        const targetRotY = state.pointer.x * 0.6;
        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;

        // Parallax position tracking (sphere moves towards cursor)
        const targetPosX = state.pointer.x * 2;
        const targetPosY = state.pointer.y * 2;
        groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05;
        groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color={color}
        transparent
        opacity={color === "#000000" ? 0.8 : 0.6}
        sizeAttenuation={true}
        blending={color === "#000000" ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
    </group>
  );
}

export default function SpatialHero3D() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const particleColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-background pointer-events-auto" aria-hidden="true">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ParticleSphere color={particleColor} />
      </Canvas>
    </div>
  );
}
