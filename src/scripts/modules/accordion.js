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

            // Initialize with closed state
            gsap.set(body, {
                height: 0,
                opacity: 0,
                overflow: "hidden", // Ensure no overflow
            });

            const toggleAccordion = () => {
                const isOpen = item.classList.contains("active");

                // Close all items
                accordionItems.forEach((i) => {
                    i.classList.remove("active");
                    const bodyContent = i.querySelector(".js-accordion-body");
                    gsap.to(bodyContent, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power3.inOut",
                        onComplete: () => {
                            ScrollTrigger.refresh();
                            lenis.update(); // Ensure Lenis recalculates layout
                        },
                    });
                });

                // Open the clicked item if it was not already open
                if (!isOpen) {
                    item.classList.add("active");
                    const bodyHeight = body.scrollHeight;
                    gsap.to(body, {
                        height: bodyHeight,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power3.inOut",
                        onComplete: () => {
                            // Scroll to the active accordion
                            setTimeout(() => {
                                lenis.scrollTo(item, {
                                    offset: -25,
                                    duration: 1.5,
                                });
                            }, 300);
                        },
                    });
                }
            };

            // Event listener for toggling accordion
            head.addEventListener("click", toggleAccordion);

            // Handle resizing for active items
            const handleResize = () => {
                if (item.classList.contains("active")) {
                    // Temporarily set height to "auto" to calculate scrollHeight correctly
                    gsap.set(body, { height: "auto" });
                    const bodyHeight = body.scrollHeight;

                    // Set back to the actual height for smooth animations
                    gsap.set(body, { height: bodyHeight });

                    // Refresh ScrollTrigger to keep everything synced
                    ScrollTrigger.refresh();
                    lenis.update();
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
