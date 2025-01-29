import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
    lerp: 0.1,
});
export const smoothScroll = () => {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]:not(a[href="#"])'
    );

    if (!anchorLinks.length) return;

    anchorLinks.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();

            // Find the closest <a> element in case of nested clicks
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute("href");
            const target = document.querySelector(href);

            if (target) {
                // Use Lenis scrollTo method for smooth scrolling
                lenis.scrollTo(target, {
                    duration: 1.25, // Duration of the scroll (in seconds)
                    easing: (t) =>
                        t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2,
                });
            }
        });
    });
};

export const syncScrollWithGSAP = () => {
    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.body); // Start observing body size changes
};

// Footer Reveal Animation
export const revealFooter = () => {
    const footer = document.querySelector("footer");

    const footerContent = footer.querySelector(
        '[data-footer-parallax="content"]'
    );

    // const footerHeight = footerContent.getBoundingClientRect().height;
    // footer.style.height = footerHeight + "px";

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.01,
        },
    });

    tl.from(
        footerContent,
        {
            yPercent: -50,
            ease: "linear",
        },

        "<"
    );
};
