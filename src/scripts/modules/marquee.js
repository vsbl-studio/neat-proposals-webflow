import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisInstance } from "./smoothScroll";
gsap.registerPlugin(ScrollTrigger);

export default () => {
    const marqueeContent = document.querySelector(".marquee_content");
    if (!marqueeContent) return;

    const marqueeWidth = marqueeContent.offsetWidth + 20;

    let marqueeTween = gsap.to(".marquee_content", {
        x: -marqueeWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
    });

    // Speed adjustment function
    const updateSpeed = (speedFactor) => {
        gsap.to(marqueeTween, {
            timeScale: speedFactor,
            duration: 0, // Smooth transition to new speed
            ease: "linear",
        });
    };

    // ScrollTrigger integration
    ScrollTrigger.create({
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity()); // Get absolute scroll velocity (handles both up and down scrolling)
            const scrollSpeedFactor = Math.max(1, velocity / 150); // Scale speed proportionally to velocity
            updateSpeed(scrollSpeedFactor); // Update marquee speed dynamically
        },
        onLeave: () => {
            updateSpeed(1);
        },
        onEnterBack: () => {
            updateSpeed(1);
        },
    });
};
