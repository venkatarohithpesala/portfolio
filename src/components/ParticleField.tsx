"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

const POINT_COUNT_HIGH = 220;
const POINT_COUNT_LOW = 120;
const LINK_DISTANCE = 2.6;
const SPARK_COUNT = 14;

type Segment = { ax: number; ay: number; az: number; bx: number; by: number; bz: number };

function buildField(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 26;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }

    const linePositions: number[] = [];
    const segments: Segment[] = [];
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
                segments.push({
                    ax: positions[i * 3], ay: positions[i * 3 + 1], az: positions[i * 3 + 2],
                    bx: positions[j * 3], by: positions[j * 3 + 1], bz: positions[j * 3 + 2],
                });
            }
        }
    }

    return { positions, linePositions: new Float32Array(linePositions), segments };
}

type SparkState = { segIdx: number; t: number; speed: number };

function randomSpark(segCount: number): SparkState {
    return {
        segIdx: Math.floor(Math.random() * segCount),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.25,
    };
}

function SparkPulses({ segments, reducedMotion }: { segments: Segment[]; reducedMotion: boolean }) {
    const attrRef = useRef<THREE.BufferAttribute>(null);
    const sparkCount = Math.min(SPARK_COUNT, segments.length);
    const stateRef = useRef<SparkState[]>([]);

    useEffect(() => {
        stateRef.current = Array.from({ length: sparkCount }, () => randomSpark(segments.length));
    }, [segments, sparkCount]);

    useFrame((_, delta) => {
        if (reducedMotion || sparkCount === 0) return;
        const attr = attrRef.current;
        if (!attr) return;

        const positions = attr.array as Float32Array;
        for (let i = 0; i < sparkCount; i++) {
            const s = stateRef.current[i];
            if (!s) continue;
            s.t += s.speed * delta;
            if (s.t >= 1) {
                Object.assign(s, randomSpark(segments.length));
                s.t = 0;
            }
            const seg = segments[s.segIdx];
            positions[i * 3] = seg.ax + (seg.bx - seg.ax) * s.t;
            positions[i * 3 + 1] = seg.ay + (seg.by - seg.ay) * s.t;
            positions[i * 3 + 2] = seg.az + (seg.bz - seg.az) * s.t;
        }
        attr.needsUpdate = true;
    });

    if (sparkCount === 0) return null;

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute ref={attrRef} attach="attributes-position" args={[new Float32Array(sparkCount * 3), 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#93c5fd"
                size={0.11}
                sizeAttenuation
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function ConstellationField({ quality, reducedMotion }: { quality: "high" | "low"; reducedMotion: boolean }) {
    const groupRef = useRef<Group>(null);
    const scrollY = useRef(0);

    const count = quality === "high" ? POINT_COUNT_HIGH : POINT_COUNT_LOW;
    const { positions, linePositions, segments } = useMemo(() => buildField(count), [count]);

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
            <SparkPulses segments={segments} reducedMotion={reducedMotion} />
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
                style={{ pointerEvents: "none" }}
            >
                <PerformanceMonitor onDecline={() => setQuality("low")}>
                    <ConstellationField quality={quality} reducedMotion={reducedMotion} />
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
}
