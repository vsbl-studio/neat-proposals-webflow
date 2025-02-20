import gsap from "gsap";
import { lenis } from "./smoothScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
    const accordions = document.querySelectorAll(".js-accordion-wrapper");

    accordions.forEach((acc) => {
        const accordionItems = acc.querySelectorAll(".js-accordion-item");

        if (!accordionItems.length) return;

        accordionItems.forEach((item) => {
            const head = item.querySelector(".js-accordion-head");
            const body = item.querySelector(".js-accordion-body");

            // Initialize closed state
            gsap.set(body, {
                height: 0,
                opacity: 0,
                overflow: "hidden",
            });

            const toggleAccordion = () => {
                const isOpen = item.classList.contains("active");

                // Close all items
                accordionItems.forEach((i) => {
                    i.classList.remove("active");
                    gsap.to(i.querySelector(".js-accordion-body"), {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power3.inOut",
                    });
                });

                // If it was NOT open, open it now
                if (!isOpen) {
                    item.classList.add("active");
                    gsap.to(body, {
                        height: body.scrollHeight,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power3.inOut",
                        onComplete: () => {
                            setTimeout(() => {
                                lenis.scrollTo(item, {
                                    offset: -25,
                                    duration: 1.5,
                                });
                            }, 300);
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 1000);
                        },
                    });
                }
            };

            // Event listener for toggling accordion
            head.addEventListener("click", toggleAccordion);

            // Handle resizing for active items
            const handleResize = () => {
                if (item.classList.contains("active")) {
                    gsap.set(body, { height: "auto" });
                    const bodyHeight = body.scrollHeight;
                    gsap.set(body, { height: bodyHeight });
                    ScrollTrigger.refresh();
                }
            };

            // Debounce resize events for performance
            let resizeTimeout;
            window.addEventListener("resize", () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 300);
            });
        });
    });
}
