import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type BagPreview3DProps = {
  color: string;
  paused?: boolean;
  onPauseChange?: (paused: boolean) => void;
};

function ConceptBag({ color, paused, reducedMotion }: { color: string; paused: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -0.12, y: -0.35 });

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!paused && !reducedMotion) group.current.position.y = Math.sin(Date.now() * 0.0014) * 0.08;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, rotation.x, 5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, rotation.y, 5, delta);
  });

  return (
    <group
      ref={group}
      scale={1.15}
      onPointerDown={(event) => {
        event.stopPropagation();
        drag.current = { active: true, x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return;
        const dx = event.clientX - drag.current.x;
        const dy = event.clientY - drag.current.y;
        drag.current = { active: true, x: event.clientX, y: event.clientY };
        setRotation((current) => ({ x: current.x + dy * 0.008, y: current.y + dx * 0.012 }));
      }}
      onPointerUp={() => {
        drag.current.active = false;
      }}
      onPointerLeave={() => {
        drag.current.active = false;
      }}
    >
      <RoundedBox args={[2.65, 1.9, 1.1]} radius={0.28} smoothness={5} position={[0, -0.15, 0]} castShadow>
        <meshPhysicalMaterial color={color} roughness={0.48} metalness={0.04} clearcoat={0.22} />
      </RoundedBox>
      <mesh position={[0, 0.87, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.75, 0.09, 16, 48, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <mesh position={[-0.75, 0.76, 0]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <mesh position={[0.75, 0.76, 0]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <mesh position={[-0.82, 0.52, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.36, 0.07, 0.1]} />
        <meshStandardMaterial color="#cda064" metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0.82, 0.52, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.36, 0.07, 0.1]} />
        <meshStandardMaterial color="#cda064" metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.48, 0.57]}>
        <boxGeometry args={[2.15, 0.035, 0.035]} />
        <meshStandardMaterial color="#d7a7a2" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function BagPreview3D({ color, paused = false, onPauseChange }: BagPreview3DProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-[#eaded1]">
      <div className="concept-static-fallback" aria-hidden="true" />
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.3, 5.5], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => undefined}
      >
        <ambientLight intensity={1.8} />
        <directionalLight castShadow position={[3, 5, 4]} intensity={3.4} shadow-mapSize={[1024, 1024]} />
        <Environment>
          <mesh position={[0, 4, -3]}>
            <planeGeometry args={[8, 8]} />
            <meshBasicMaterial color="#fff9f2" />
          </mesh>
        </Environment>
        <ConceptBag color={color} paused={paused} reducedMotion={reducedMotion} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.34} scale={5} blur={2.2} far={3} />
      </Canvas>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
        <span className="border border-foreground/15 bg-background/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur-sm">
          Concept model · drag to rotate
        </span>
        <button
          type="button"
          className="border border-foreground/15 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-sm transition-colors hover:bg-background"
          onClick={() => onPauseChange?.(!paused)}
          aria-label={paused ? "Resume 3D animation" : "Pause 3D animation"}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}