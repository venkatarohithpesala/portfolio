"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, PerformanceMonitor, useTexture } from "@react-three/drei";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import { skills } from "../data/skills";

export type FlatSkill = { name: string; icon: string; category: string };

export const flatSkills: FlatSkill[] = skills
    .flatMap((group) =>
        group.items.map((item) => ({
            name: typeof item === "string" ? item : item.name,
            icon: typeof item === "object" && "icon" in item ? item.icon : "",
            category: group.category,
        }))
    )
    .filter((s) => s.icon);

// Sphere radius must leave enough room in the camera frustum for each icon's
// own visual size (not just its center point) at the poles, or the top/bottom
// icons clip against the canvas edge while rotating into view.
const RADIUS = 3.0;

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
    const points: [number, number, number][] = [];
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = i * offset - 1 + offset / 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const phi = i * increment;
        points.push([Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius]);
    }
    return points;
}

const positions = fibonacciSphere(flatSkills.length, RADIUS);

function SkillNodes({
    matchesRef,
    reducedMotion,
    quality,
    onHover,
}: {
    matchesRef: React.MutableRefObject<boolean[]>;
    reducedMotion: boolean;
    quality: "high" | "low";
    onHover: (name: string | null) => void;
}) {
    const textures = useTexture(flatSkills.map((s) => `/skill-icons/${s.icon}`));
    const { gl } = useThree();
    const groupRef = useRef<Group>(null);
    const iconMatRefs = useRef<(MeshBasicMaterial | null)[]>([]);
    const bgMatRefs = useRef<(MeshBasicMaterial | null)[]>([]);
    const nodeRefs = useRef<(Mesh | null)[]>([]);

    const isDragging = useRef(false);
    const lastPointer = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const el = gl.domElement;
        const onDown = (e: PointerEvent) => {
            isDragging.current = true;
            lastPointer.current = { x: e.clientX, y: e.clientY };
        };
        const onMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastPointer.current.x;
            const dy = e.clientY - lastPointer.current.y;
            lastPointer.current = { x: e.clientX, y: e.clientY };
            velocity.current = { x: dy * 0.005, y: dx * 0.005 };
            const group = groupRef.current;
            if (group) {
                group.rotation.y += dx * 0.005;
                group.rotation.x += dy * 0.005;
            }
        };
        const onUp = () => {
            isDragging.current = false;
        };
        el.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            el.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [gl]);

    useFrame((state, delta) => {
        const group = groupRef.current;
        if (group) {
            if (isDragging.current) {
                // rotation already applied directly during pointermove
            } else {
                velocity.current.x *= 0.9;
                velocity.current.y *= 0.9;
                group.rotation.y += velocity.current.y;
                group.rotation.x += velocity.current.x;

                if (!reducedMotion && quality === "high" && Math.abs(velocity.current.y) < 0.0005) {
                    group.rotation.y += delta * 0.05;
                }
            }
        }

        const ease = 1 - Math.pow(0.001, delta);
        const matches = matchesRef.current;
        for (let i = 0; i < flatSkills.length; i++) {
            const isMatch = matches[i];
            const targetOpacity = isMatch ? 1 : 0.12;
            const targetScale = isMatch ? 1 : 0.75;

            const iconMat = iconMatRefs.current[i];
            if (iconMat) iconMat.opacity += (targetOpacity - iconMat.opacity) * ease;

            const bgMat = bgMatRefs.current[i];
            if (bgMat) bgMat.opacity += (targetOpacity * 0.5 - bgMat.opacity) * ease;

            const node = nodeRefs.current[i];
            if (node) {
                const s = node.scale.x + (targetScale - node.scale.x) * ease;
                node.scale.setScalar(s);
            }
        }
    });

    return (
        <group ref={groupRef}>
            {flatSkills.map((skill, i) => (
                <Billboard key={`${skill.category}-${skill.name}`} position={positions[i]}>
                    <mesh
                        ref={(el) => {
                            nodeRefs.current[i] = el;
                        }}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            onHover(skill.name);
                        }}
                        onPointerOut={() => onHover(null)}
                    >
                        <circleGeometry args={[0.34, 32]} />
                        <meshBasicMaterial
                            ref={(el) => {
                                bgMatRefs.current[i] = el;
                            }}
                            color="#0f172a"
                            transparent
                            opacity={0.5}
                        />
                        <mesh position={[0, 0, 0.01]}>
                            <circleGeometry args={[0.24, 32]} />
                            <meshBasicMaterial
                                ref={(el) => {
                                    iconMatRefs.current[i] = el;
                                }}
                                map={textures[i]}
                                transparent
                                opacity={1}
                            />
                        </mesh>
                    </mesh>
                </Billboard>
            ))}
        </group>
    );
}

export default function SkillCloud({
    searchQuery,
    activeCategory,
}: {
    searchQuery: string;
    activeCategory: string | null;
}) {
    const [hidden, setHidden] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const [quality, setQuality] = useState<"high" | "low">("high");
    const [hoveredName, setHoveredName] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const matchesRef = useRef<boolean[]>(flatSkills.map(() => true));

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setHidden(!entry.isIntersecting), {
            threshold: 0.05,
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        matchesRef.current = flatSkills.map((s) => {
            if (q) return s.name.toLowerCase().includes(q);
            if (activeCategory) return s.category === activeCategory;
            return true;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div>
            <div className="h-9 flex items-center justify-center">
                {hoveredName && (
                    <div className="pointer-events-none bg-black/80 border border-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                        {hoveredName}
                    </div>
                )}
            </div>

            <div ref={containerRef} className="relative w-full h-[380px] sm:h-[460px] md:h-[540px]">
                <Canvas
                    camera={{ position: [0, 0, 11], fov: 42 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    frameloop={hidden ? "never" : "always"}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={1.2} />
                        <PerformanceMonitor onDecline={() => setQuality("low")} />
                        <SkillNodes
                            matchesRef={matchesRef}
                            reducedMotion={reducedMotion}
                            quality={quality}
                            onHover={setHoveredName}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <p className="pointer-events-none text-center mt-4 text-white/25 text-xs uppercase tracking-widest">
                Drag to rotate
            </p>
        </div>
    );
}
