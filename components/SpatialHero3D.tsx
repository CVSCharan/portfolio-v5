"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

function LiquidParticles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Adjust particle count for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const count = isMobile ? 1200 : 2500;
  
  // Use useThree to get the viewport dimensions for scattering and mouse mapping
  const { viewport } = useThree();

  // Initialize particle state
  const { positions, basePositions, velocities, types, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const typeArr = new Uint8Array(count); // 0 = scatter, 1 = gravity core
    const rand = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scatter particles across the entire viewport width and height
      // Add depth (z) for 3D effect
      const x = (Math.random() - 0.5) * (viewport.width * 1.5);
      const y = (Math.random() - 0.5) * (viewport.height * 1.5);
      const z = (Math.random() - 0.5) * 8; // Depth range

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      // 50% are gravity particles (type 1), 50% are scatter (type 0)
      typeArr[i] = i % 2 === 0 ? 1 : 0;
      
      // Random offset for organic motion
      rand[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, basePositions: base, velocities: vel, types: typeArr, randoms: rand };
  }, [count, viewport.width, viewport.height]);

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // The physics loop
  useFrame((state) => {
    if (!pointsRef.current || prefersReducedMotion.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Map normalized pointer (-1 to 1) to 3D world coordinates
    const mouseX = state.pointer.x * (state.viewport.width / 2);
    const mouseY = state.pointer.y * (state.viewport.height / 2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      let targetX, targetY, targetZ;
      
      if (types[i] === 1) {
        // GRAVITY PARTICLES: Flow towards the cursor
        // Instead of forming a single dot, we use their base positions scaled down to form a liquid blob around the cursor
        targetX = mouseX + basePositions[i3] * 0.15;
        targetY = mouseY + basePositions[i3 + 1] * 0.15;
        // The core swirls slowly on Z based on time and random offset
        targetZ = Math.sin(time + randoms[i]) * 2; 

        // Calculate force vector towards target
        const dx = targetX - positions[i3];
        const dy = targetY - positions[i3 + 1];
        const dz = targetZ - positions[i3 + 2];
        
        // Spring physics (acceleration)
        velocities[i3] += dx * 0.04; 
        velocities[i3 + 1] += dy * 0.04;
        velocities[i3 + 2] += dz * 0.04;
        
        // Liquid damping/friction (heavy friction so it feels viscous and trails the mouse)
        velocities[i3] *= 0.82;
        velocities[i3 + 1] *= 0.82;
        velocities[i3 + 2] *= 0.82;
        
      } else {
        // SCATTER PARTICLES: Drift organically around their base positions
        // They float using sine waves based on time and random phases
        targetX = basePositions[i3] + Math.sin(time * 0.5 + randoms[i]) * 0.8;
        targetY = basePositions[i3 + 1] + Math.cos(time * 0.4 + randoms[i]) * 0.8;
        targetZ = basePositions[i3 + 2] + Math.sin(time * 0.6 + randoms[i]) * 0.8;
        
        // Slight mouse repulsion for scatter particles (adds to interactivity)
        const distToMouse = Math.sqrt(Math.pow(positions[i3] - mouseX, 2) + Math.pow(positions[i3 + 1] - mouseY, 2));
        if (distToMouse < 3) {
          const repelStrength = (3 - distToMouse) * 0.02;
          velocities[i3] -= (mouseX - positions[i3]) * repelStrength;
          velocities[i3 + 1] -= (mouseY - positions[i3 + 1]) * repelStrength;
        }

        const dx = targetX - positions[i3];
        const dy = targetY - positions[i3 + 1];
        const dz = targetZ - positions[i3 + 2];
        
        // Gentle spring force back to base target
        velocities[i3] += dx * 0.01;
        velocities[i3 + 1] += dy * 0.01;
        velocities[i3 + 2] += dz * 0.01;
        
        // Lower damping for a looser, floating feel
        velocities[i3] *= 0.92;
        velocities[i3 + 1] *= 0.92;
        velocities[i3 + 2] *= 0.92;
      }
      
      // Apply velocity to position
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
    }
    
    // Notify Three.js that the buffer has been modified
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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

  const particleColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-background pointer-events-auto" aria-hidden="true">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true }}
        eventSource={typeof window !== "undefined" ? document.body : undefined}
      >
        <LiquidParticles color={particleColor} />
      </Canvas>
    </div>
  );
}
