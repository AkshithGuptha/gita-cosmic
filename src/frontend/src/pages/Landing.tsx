import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/hooks/useAudio";
import { useDailySloka } from "@/hooks/useGita";
import { getTextForLanguage } from "@/types/gita";
import { Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ──────────────── 3D Scene Components ────────────────

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.08;
      meshRef.current.scale.setScalar(scale);
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.4;
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.3) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.25;
      ringRef2.current.rotation.y = t * 0.15;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = t * 0.2;
      ringRef3.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#f5c842"
          emissive="#f5a000"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>

      {/* Outer halo sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#f5c842"
          emissive="#f5a000"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
          roughness={1}
        />
      </mesh>

      {/* Ring 1 — golden */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#f5c842"
          emissive="#f5a000"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Ring 2 — lavender */}
      <mesh ref={ringRef2} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#d4a0ff"
          emissive="#9b6fff"
          emissiveIntensity={1.2}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Ring 3 — golden outer */}
      <mesh ref={ringRef3} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#f5c842"
          emissive="#f5a000"
          emissiveIntensity={1.0}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      <pointLight color="#f5c842" intensity={4} distance={12} decay={2} />
      <pointLight
        color="#9b6fff"
        intensity={2}
        distance={8}
        decay={2}
        position={[3, 2, 1]}
      />
    </group>
  );
}

function GoldenParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 500;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const arr = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.001;
      arr[i * 3 + 1] +=
        Math.cos(t * 0.2 + i * 0.5) * 0.001 + velocities[i * 3 + 1];
      arr[i * 3 + 2] += Math.sin(t * 0.15 + i * 0.3) * 0.001;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#f5c842"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MouseParallaxCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 1.5 - target.current.x) * 0.04;
    target.current.y += (mouse.current.y * 1.0 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function NebulaClouds() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef1.current) {
      meshRef1.current.rotation.z = t * 0.01;
      meshRef1.current.rotation.y = t * 0.005;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.z = -t * 0.008;
    }
  });

  return (
    <>
      <mesh ref={meshRef1} position={[-4, 2, -5]}>
        <sphereGeometry args={[5, 8, 8]} />
        <meshStandardMaterial
          color="#3b1a6b"
          emissive="#2a0f50"
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={meshRef2} position={[4, -2, -5]}>
        <sphereGeometry args={[4, 8, 8]} />
        <meshStandardMaterial
          color="#1a2a6b"
          emissive="#0f1f50"
          emissiveIntensity={0.4}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050814"]} />
      <ambientLight intensity={0.3} color="#1a0a3a" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f5c842" />
      <Stars
        radius={80}
        depth={60}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <Sparkles
        count={120}
        scale={20}
        size={1.5}
        speed={0.3}
        color="#f5c842"
        opacity={0.6}
      />
      <GoldenParticles />
      <NebulaClouds />
      <CentralOrb />
      <MouseParallaxCamera />
    </>
  );
}

// ──────────────── Floating Sanskrit Text ────────────────

const FLOATING_SANSKRIT = [
  { text: "सत्यम्", x: "8%", delay: 0 },
  { text: "धर्मः", x: "85%", delay: 1.5 },
  { text: "ज्ञानम्", x: "18%", delay: 3 },
  { text: "शान्तिः", x: "72%", delay: 4.5 },
  { text: "मोक्षः", x: "45%", delay: 6 },
];

function FloatingSanskritText() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {FLOATING_SANSKRIT.map((item, i) => (
        <motion.div
          key={item.text}
          className="absolute top-1/4 sanskrit-text text-sm font-semibold"
          style={{ left: item.x, color: "oklch(0.68 0.18 60 / 0.3)" }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.4, 0] }}
          transition={{
            duration: 10 + i * 1.5,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}

// ──────────────── Peacock Feather ────────────────

function PeacockFeather({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 200"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 200 C40 200 38 150 35 120 C32 90 20 75 15 60 C10 45 12 30 20 22 C28 14 40 10 40 10 C40 10 52 14 60 22 C68 30 70 45 65 60 C60 75 48 90 45 120 C42 150 40 200 40 200Z"
        fill="url(#featherGrad)"
        opacity="0.7"
      />
      <ellipse cx="40" cy="35" rx="12" ry="16" fill="#1a6b4a" opacity="0.8" />
      <ellipse cx="40" cy="35" rx="7" ry="10" fill="#0d3d2a" opacity="0.9" />
      <ellipse cx="40" cy="35" rx="3" ry="4" fill="#f5c842" opacity="1" />
      <path
        d="M40 55 L25 75 M40 55 L55 75"
        stroke="#2d8b5c"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M40 65 L20 88 M40 65 L60 88"
        stroke="#2d8b5c"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M40 78 L18 104 M40 78 L62 104"
        stroke="#1e6b45"
        strokeWidth="0.7"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a6b4a" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#2d8b5c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f5c842" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ──────────────── Flute ────────────────

function Flute({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="16"
        width="290"
        height="8"
        rx="4"
        fill="url(#fluteGrad)"
        opacity="0.8"
      />
      {[40, 70, 100, 130, 160, 190, 220].map((cx) => (
        <ellipse
          key={cx}
          cx={cx}
          cy="20"
          rx="5"
          ry="4"
          fill="#0d0a1a"
          opacity="0.8"
        />
      ))}
      <ellipse
        cx="275"
        cy="20"
        rx="8"
        ry="7"
        fill="url(#fluteGrad)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="fluteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b6914" />
          <stop offset="30%" stopColor="#f5c842" />
          <stop offset="70%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ──────────────── Lotus Decor ────────────────

function LotusPetal({ rotate, delay }: { rotate: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-12 h-20 rounded-full origin-bottom"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.68 0.18 60 / 0.3) 0%, oklch(0.68 0.18 60 / 0.05) 100%)",
        transform: `rotate(${rotate}deg)`,
        border: "1px solid oklch(0.68 0.18 60 / 0.2)",
      }}
      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 4,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

function LotusDecor({ className }: { className?: string }) {
  const petalAngles = [0, 40, 80, 120, 160, 200, 240, 280, 320];
  return (
    <div
      className={`relative w-32 h-32 flex items-end justify-center ${className ?? ""}`}
    >
      {petalAngles.map((r, i) => (
        <LotusPetal key={r} rotate={r} delay={i * 0.3} />
      ))}
      <div
        className="absolute bottom-0 w-8 h-8 rounded-full animate-glow-pulse"
        style={{ background: "oklch(0.68 0.18 60 / 0.6)" }}
      />
    </div>
  );
}

// ──────────────── Gold Divider ────────────────

function GoldDivider() {
  return (
    <div
      className="flex items-center gap-4 w-full max-w-2xl mx-auto my-8"
      aria-hidden="true"
    >
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.18 60 / 0.6))",
        }}
      />
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 animate-spin-slow flex-shrink-0"
        fill="none"
        role="img"
        aria-label="chakra"
      >
        <title>chakra</title>
        <circle
          cx="20"
          cy="20"
          r="6"
          fill="oklch(0.68 0.18 60)"
          opacity="0.9"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={20 + 8 * Math.cos(rad)}
              y1={20 + 8 * Math.sin(rad)}
              x2={20 + 14 * Math.cos(rad)}
              y2={20 + 14 * Math.sin(rad)}
              stroke="oklch(0.68 0.18 60)"
              strokeWidth="1.5"
              opacity="0.8"
            />
          );
        })}
      </svg>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.18 60 / 0.6), transparent)",
        }}
      />
    </div>
  );
}

// ──────────────── Daily Sloka Section ────────────────

function DailySlokaSection() {
  const { data: sloka, isLoading } = useDailySloka();
  const { language } = useLanguage();

  return (
    <section
      className="relative py-20 px-4"
      style={{
        background:
          "linear-gradient(180deg, #050814 0%, #0a0520 50%, #050814 100%)",
      }}
      data-ocid="daily_sloka.section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.68 0.18 60 / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <GoldDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge
            className="mb-4 px-4 py-1 text-xs tracking-widest uppercase"
            style={{
              background: "oklch(0.68 0.18 60 / 0.15)",
              border: "1px solid oklch(0.68 0.18 60 / 0.4)",
              color: "oklch(0.68 0.18 60)",
            }}
          >
            आज का श्लोक · Today's Verse
          </Badge>
          <h2
            className="font-display text-3xl mb-8 glow-golden"
            style={{ color: "oklch(0.68 0.18 60)" }}
          >
            Daily Wisdom
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="daily_sloka.loading_state">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 rounded animate-shimmer mx-auto"
                style={{ width: `${70 - i * 10}%` }}
              />
            ))}
          </div>
        ) : sloka ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="cosmic-card-golden rounded-2xl p-8 space-y-6 text-left"
            data-ocid="daily_sloka.card"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-body tracking-widest uppercase"
                style={{ color: "oklch(0.68 0.18 60 / 0.7)" }}
              >
                Chapter {Number(sloka.chapterNumber)} · Verse{" "}
                {Number(sloka.slokaNumber)}
              </span>
            </div>
            <p
              className="sanskrit-text text-xl leading-relaxed text-center"
              style={{ color: "oklch(0.92 0.01 260)" }}
              lang="sa"
            >
              {sloka.sanskritText}
            </p>
            <p
              className="text-sm italic text-center"
              style={{ color: "oklch(0.68 0.18 60 / 0.8)" }}
            >
              {sloka.transliteration}
            </p>
            <div
              className="w-16 h-px mx-auto"
              style={{ background: "oklch(0.68 0.18 60 / 0.4)" }}
            />
            <p
              className="text-base text-center leading-relaxed"
              style={{ color: "oklch(0.88 0.01 260)" }}
            >
              {getTextForLanguage(sloka.meanings, language)}
            </p>
          </motion.div>
        ) : (
          <div
            className="cosmic-card rounded-2xl p-8 text-center"
            style={{ color: "oklch(0.55 0.01 260)" }}
            data-ocid="daily_sloka.empty_state"
          >
            <p className="font-display text-lg">
              Connecting to divine wisdom...
            </p>
          </div>
        )}

        <GoldDivider />
        <div className="flex justify-center mt-4">
          <LotusDecor />
        </div>
      </div>
    </section>
  );
}

// ──────────────── Music Toggle ────────────────

function MusicToggle() {
  const { isPlaying, toggle } = useAudio();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: isPlaying
          ? "oklch(0.68 0.18 60 / 0.2)"
          : "oklch(0.17 0.025 260 / 0.9)",
        border: `1px solid oklch(0.68 0.18 60 / ${isPlaying ? "0.7" : "0.4"})`,
        backdropFilter: "blur(12px)",
        boxShadow: isPlaying
          ? "0 0 20px oklch(0.68 0.18 60 / 0.4), 0 0 40px oklch(0.68 0.18 60 / 0.2)"
          : "none",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
      data-ocid="music.toggle"
    >
      <motion.span
        className="text-xl"
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 1.5,
          repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
        }}
      >
        {isPlaying ? "🎵" : "🔇"}
      </motion.span>
    </motion.button>
  );
}

// ──────────────── Cosmic Background Glow ────────────────

const GLOW_PHASES = [
  "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.25 0.08 280 / 0.3) 0%, transparent 70%)",
  "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.22 0.07 240 / 0.3) 0%, transparent 70%)",
  "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.68 0.18 60 / 0.06) 0%, oklch(0.25 0.08 280 / 0.2) 40%, transparent 70%)",
];

function CosmicBackgroundGlow() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: GLOW_PHASES[phase] }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}

// ──────────────── Corner Decorations ────────────────

function CornerDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    >
      <motion.div
        className="absolute left-4 top-1/4 w-16 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <PeacockFeather className="w-full h-auto opacity-60" />
      </motion.div>

      <motion.div
        className="absolute right-4 top-1/3 w-16 hidden lg:block scale-x-[-1]"
        animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
        transition={{
          duration: 9,
          delay: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <PeacockFeather className="w-full h-auto opacity-50" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 hidden md:block"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Flute className="w-full" />
      </motion.div>
    </div>
  );
}

// ──────────────── Hero Overlay ────────────────

const SUBTITLE_LINES = [
  {
    text: "The Song Divine",
    className: "font-display text-2xl md:text-3xl italic",
    style: { color: "oklch(0.88 0.01 260)" },
    lang: undefined as string | undefined,
  },
  {
    text: "जीवन का अमृत ज्ञान",
    className: "sanskrit-text text-lg md:text-xl",
    style: { color: "oklch(0.68 0.18 60 / 0.85)" },
    lang: "hi",
  },
];

function HeroOverlay({
  onExplore,
  onSearch,
}: { onExplore: () => void; onSearch: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-2"
      >
        <span
          className="font-display text-5xl md:text-6xl glow-golden animate-glow-pulse"
          style={{ color: "oklch(0.68 0.18 60)" }}
        >
          ॐ
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl text-center mb-4 divine-gradient-text leading-tight"
        lang="sa"
      >
        भगवद्गीता
      </motion.h1>

      <div className="flex flex-col items-center gap-2 mb-8">
        {SUBTITLE_LINES.map((line, i) => (
          <motion.p
            key={line.text}
            className={`${line.className} text-center`}
            style={line.style}
            lang={line.lang}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + i * 0.35 }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
      >
        <Button
          type="button"
          onClick={onExplore}
          className="px-8 py-3 text-base font-semibold rounded-full transition-smooth"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.18 60) 0%, oklch(0.62 0.15 50) 100%)",
            color: "oklch(0.13 0.02 60)",
            boxShadow:
              "0 0 20px oklch(0.68 0.18 60 / 0.5), 0 4px 15px oklch(0.68 0.18 60 / 0.3)",
            border: "none",
          }}
          data-ocid="hero.explore_button"
        >
          ✦ Explore Bhagavad Gita
        </Button>

        <Button
          type="button"
          onClick={onSearch}
          variant="outline"
          className="px-8 py-3 text-base font-semibold rounded-full transition-smooth"
          style={{
            background: "oklch(0.13 0.02 260 / 0.5)",
            border: "1px solid oklch(0.68 0.18 60 / 0.5)",
            color: "oklch(0.88 0.01 260)",
            backdropFilter: "blur(10px)",
          }}
          data-ocid="hero.search_button"
        >
          🔍 Search Slokas
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.55 0.01 260)" }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
          style={{ borderColor: "oklch(0.68 0.18 60 / 0.4)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "oklch(0.68 0.18 60 / 0.6)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ──────────────── Landing Page ────────────────

export default function Landing() {
  const navigate = useNavigate();

  const onExplore = useCallback(() => {
    navigate({ to: "/chapters" });
  }, [navigate]);

  const onSearch = useCallback(() => {
    navigate({ to: "/search" });
  }, [navigate]);

  return (
    <main className="min-h-screen" data-ocid="landing.page">
      {/* ── Hero Section ── */}
      <section
        className="relative w-full h-screen overflow-hidden"
        data-ocid="landing.hero.section"
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <Scene />
          </Canvas>
        </div>

        {/* Hero image layer */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/krishna-vishwaroopam-hero.dim_1920x1080.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        <CosmicBackgroundGlow />
        <FloatingSanskritText />
        <CornerDecorations />
        <HeroOverlay onExplore={onExplore} onSearch={onSearch} />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
          style={{ background: "linear-gradient(transparent, #050814)" }}
          aria-hidden="true"
        />
      </section>

      {/* ── Daily Sloka Section ── */}
      <DailySlokaSection />

      {/* ── Footer ── */}
      <footer
        className="py-8 px-4 text-center border-t"
        style={{
          background: "oklch(0.10 0.02 260)",
          borderColor: "oklch(0.68 0.18 60 / 0.15)",
        }}
        data-ocid="landing.footer"
      >
        <p className="text-xs" style={{ color: "oklch(0.45 0.01 260)" }}>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-smooth"
            style={{ color: "oklch(0.68 0.18 60 / 0.6)" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>

      <MusicToggle />
    </main>
  );
}
