import {
    locomotiveScroll,
    syncScrollWithGSAP,
    revealFooter,
} from "./modules/smoothScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileNavigation, desktopNavigation } from "./modules/navigation";
import accordion from "./modules/accordion";
import currentYear from "./modules/currentYear";
import { isMobile } from "./utils/isMobile";
import gsap from "gsap";
import textReveal from "./modules/textReveal";
document.addEventListener("DOMContentLoaded", function () {
    // Load modules
    // cookieYes();
    textReveal();
    syncScrollWithGSAP();

    mobileNavigation();
    desktopNavigation();

    accordion();
    revealFooter();
    currentYear();

    const buttonHovers = document.querySelectorAll(".nav_menu_link-wrapper");
    function setupButtonHoverEffects() {
        if (buttonHovers.length && !isMobile.any()) {
            buttonHovers.forEach((btn) => {
                const textWrapper = btn.querySelector("a");

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
                        const lines = wrapperDiv.querySelectorAll("a");

                        gsap.to(lines[0], {
                            y: -textWrapper.clientHeight,
                            x: "",
                            duration: 0.5,
                            ease: "power2.out",
                        });

                        gsap.to(lines[1], {
                            y: -textWrapper.clientHeight,
                            x: "",
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    });

                    btn.addEventListener("mouseleave", function () {
                        const lines = wrapperDiv.querySelectorAll("a");

                        gsap.to(lines[0], {
                            y: 0,
                            x: "",
                            duration: 0.5,
                            ease: "power2.out",
                        });

                        gsap.to(lines[1], {
                            y: 0,
                            x: "",
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    });

                    const targetForm = document.querySelector(
                        ".form_message-success.contact-us_success"
                    );

                    if (targetForm) {
                        // Triggered when the form is submitted successfully
                        const observer = new MutationObserver(
                            (mutationsList) => {
                                for (const mutation of mutationsList) {
                                    console.log(mutation);
                                    if (mutation.type === "attributes") {
                                        console.log("Class attribute changed");
                                        // Check if the 'w-form-done' class is present
                                        if (
                                            targetForm.classList.contains(
                                                "w-form-done"
                                            )
                                        ) {
                                            setTimeout(() => {
                                                updateDimensions();
                                            }, 100);
                                        }
                                    }
                                }
                            }
                        );

                        // Observer configuration
                        const config = {
                            attributes: true,
                            childList: false,
                            subtree: false,
                        };

                        // Start observing the target element
                        observer.observe(targetForm, config);
                    }

                    // Recalculate dimensions on resize
                    window.addEventListener("resize", updateDimensions);
                }
            });
        }
    }

    setupButtonHoverEffects();

    setTimeout(() => {
        locomotiveScroll.resize();
        ScrollTrigger.refresh();
    }, 5000);
});
