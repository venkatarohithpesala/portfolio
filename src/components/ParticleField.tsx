"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import type { Group } from "three";

const POINT_COUNT_HIGH = 220;
const POINT_COUNT_LOW = 120;
const LINK_DISTANCE = 2.6;

function buildField(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 26;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }

    const linePositions: number[] = [];
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
                linePositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
            }
        }
    }

    return { positions, linePositions: new Float32Array(linePositions) };
}

function ConstellationField({ quality }: { quality: "high" | "low" }) {
    const groupRef = useRef<Group>(null);
    const scrollY = useRef(0);

    const count = quality === "high" ? POINT_COUNT_HIGH : POINT_COUNT_LOW;
    const { positions, linePositions } = useMemo(() => buildField(count), [count]);

    useEffect(() => {
        const onScroll = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useFrame((state, delta) => {
        const group = groupRef.current;
        if (!group) return;

        const t = state.clock.getElapsedTime();
        const targetRotY = scrollY.current * 0.00035 + t * 0.02;
        const targetRotX = scrollY.current * 0.00015;

        const ease = 1 - Math.pow(0.001, delta);
        group.rotation.y += (targetRotY - group.rotation.y) * ease;
        group.rotation.x += (targetRotX - group.rotation.x) * ease;
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial color="#60a5fa" size={0.06} sizeAttenuation transparent opacity={0.85} />
            </points>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.12} />
            </lineSegments>
        </group>
    );
}

export default function ParticleField() {
    const [hidden, setHidden] = useState(() => document.visibilityState === "hidden");
    const [quality, setQuality] = useState<"high" | "low">("high");
    const [reducedMotion, setReducedMotion] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    useEffect(() => {
        const onVisibility = () => setHidden(document.visibilityState === "hidden");
        document.addEventListener("visibilitychange", onVisibility);

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", onChange);

        return () => {
            document.removeEventListener("visibilitychange", onVisibility);
            mq.removeEventListener("change", onChange);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                frameloop={hidden ? "never" : reducedMotion ? "demand" : "always"}
            >
                <PerformanceMonitor onDecline={() => setQuality("low")}>
                    <ConstellationField quality={quality} />
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
}
