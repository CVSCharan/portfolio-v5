"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

function ParticleSphere({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Lower particle count on mobile for performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const count = isMobile ? 1500 : 3000;

  // Generate particles in a spherical distribution
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const r = 3 + (Math.random() * 0.1); // Radius with slight noise

      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Respect prefers-reduced-motion for accessibility
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Subtle constant rotation ONLY, no cursor following
  useFrame((state, delta) => {
    if (pointsRef.current && !prefersReducedMotion.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.06}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={color === "#000000" ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SpatialHero3D() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Adapt particle color to the current theme
  const particleColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

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
