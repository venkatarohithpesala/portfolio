"use client";
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function HeroLottie() {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        fetch('/hero-lottie.json')
            .then((res) => res.json())
            .then(setAnimationData);
    }, []);

    return (
        <div className="w-32 h-32">
            {animationData && <Lottie animationData={animationData} loop={true} />}
        </div>
    );
}
