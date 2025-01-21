import gsap from "gsap";
import { locomotiveScroll } from "./smoothScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
    const accordions = document.querySelectorAll(".js-accordion-wrapper");

    accordions.forEach((acc) => {
        const accordionItems = acc.querySelectorAll(".js-accordion-item");

        accordionItems.forEach((item, index) => {
            const head = item.querySelector(".js-accordion-head");
            const body = item.querySelector(".js-accordion-body");

            if (index > 0) {
                gsap.set(body, {
                    height: 0,
                    opacity: 0,

                    onComplete: () => {
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 300);
                    },
                }); // Ensure body starts hidden
            } else {
                item.classList.add("active");
                gsap.set(body, {
                    height: "auto",
                    opacity: 1,

                    onComplete: () => {
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 300);
                    },
                }); // Ensure first item is open
            }
            head.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");

                // Close all items
                accordionItems.forEach((i) => {
                    i.classList.remove("active");
                    const bodyContent = i.querySelector(".js-accordion-body");
                    gsap.to(bodyContent, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 300);
                        },
                    });
                });

                // Open the clicked item if it was not already open
                if (!isOpen) {
                    item.classList.add("active");
                    const bodyHeight = body.scrollHeight; // Get full height of content
                    gsap.to(body, {
                        height: bodyHeight,
                        opacity: 1,
                        duration: 0.3,
                        onComplete: () => {
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 300);
                        },
                    });
                }
            });
        });
    });
}
