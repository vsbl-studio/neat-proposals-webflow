import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const locomotiveScroll = new LocomotiveScroll({
    el: document.body, // Ensure your scroll container is specified
    smooth: true,
    lerp: 1, // Smoothing factor
    multiplier: 0.1,
});

export const syncScrollWithGSAP = () => {
    const lenisInstance = locomotiveScroll.lenisInstance;

    lenisInstance.on("scroll", function () {
        locomotiveScroll.resize();
        ScrollTrigger.refresh();
        ScrollTrigger.update();
    });

    const resizeObserver = new ResizeObserver(() => {
        locomotiveScroll.resize();
        ScrollTrigger.refresh();
        ScrollTrigger.update();
    });

    resizeObserver.observe(document.body); // Start observing body size changes
};

// Footer Reveal Animation
export const revealFooter = () => {
    gsap.set(".section_footer", { yPercent: 50 });

    const uncover = gsap.timeline({ paused: true });
    uncover.to(".section_footer", { yPercent: 0, ease: "none" });

    const footerHeight = document.querySelector(".section_footer").offsetHeight;

    ScrollTrigger.create({
        trigger: ".main-wrapper",
        start: "bottom bottom",
        end: `+=${footerHeight}`,
        animation: uncover,
        scrub: true,
        markers: true,
    });
};
