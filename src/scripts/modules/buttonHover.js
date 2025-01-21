import gsap from "gsap";
import { isMobile } from "../utils/isMobile";
import { customEase } from "../utils/globalElements";

export default () => {
    const buttonHovers = document.querySelectorAll("[data-mask-button]");
    if (buttonHovers.length) {
        buttonHovers.forEach((btn) => {
            const textWrapper = btn.querySelector("[data-mask-text]");

            if (textWrapper) {
                const wrapperDiv = document.createElement("div");

                btn.appendChild(wrapperDiv);

                // Clone the original text to make a second copy
                const clonedBtn = textWrapper.cloneNode(true);

                // Append the original and cloned text to the wrapper div
                wrapperDiv.appendChild(textWrapper);
                wrapperDiv.appendChild(clonedBtn);

                const updateDimensions = () => {
                    const height = textWrapper.clientHeight;
                    const width = textWrapper.clientWidth;

                    wrapperDiv.style.overflow = "hidden";
                    wrapperDiv.style.height = height + "px";
                    wrapperDiv.style.width = width + "px";

                    clonedBtn.style.transform = `translateY(${textWrapper.clientHeight}px)`;
                    wrapperDiv.style.minWidth = "fit-content";
                    textWrapper.style.whiteSpace = "nowrap";
                    clonedBtn.style.whiteSpace = "nowrap";
                };

                // Update dimensions on page load
                updateDimensions();

                // Add hover animations
                btn.addEventListener("mouseenter", function () {
                    const lines =
                        wrapperDiv.querySelectorAll("[data-mask-text]");

                    gsap.to(lines[0], {
                        y: -textWrapper.clientHeight,
                        x: "",
                        duration: 0.5,
                        ease: customEase,
                    });

                    gsap.to(lines[1], {
                        y: -textWrapper.clientHeight,
                        x: "",
                        duration: 0.5,
                        ease: customEase,
                    });
                });

                btn.addEventListener("mouseleave", function () {
                    const lines =
                        wrapperDiv.querySelectorAll("[data-mask-text]");

                    gsap.to(lines[0], {
                        y: 0,
                        x: "",
                        duration: 0.5,
                        ease: customEase,
                    });

                    gsap.to(lines[1], {
                        y: 0,
                        x: "",
                        duration: 0.5,
                        ease: customEase,
                    });
                });

                // Recalculate dimensions on resize
                window.addEventListener("resize", updateDimensions);

                const navMobileWrapper = document.querySelector(
                    ".nav_wrapper-mobile"
                );

                if (navMobileWrapper) {
                    navMobileWrapper.addEventListener(
                        "mouseenter",
                        function () {
                            setTimeout(() => {
                                updateDimensions();
                            }, 100);
                        }
                    );
                }

                const navbarMenuTrigger = document.querySelector(
                    ".navbar_menu-trigger"
                );

                if (navbarMenuTrigger) {
                    console.log("clikc");
                    navbarMenuTrigger.addEventListener("click", function () {
                        setTimeout(() => {
                            updateDimensions();
                        }, 100);
                    });
                }
            }
        });
    }
};
