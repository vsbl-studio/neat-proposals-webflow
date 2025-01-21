import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { customEase } from "../utils/globalElements";
export const mobileNavigation = () => {
    const menu = document.querySelector('[data-menu-animation="menu"]');
    if (!menu) return;

    const mobileBtnText = menu.querySelector(
        '[data-menu-animation="mobile-btn-text"]'
    );
    const button = menu.querySelector('[data-menu-animation="button"]');
    const menuLinks = menu.querySelectorAll("[data-menu-link]");

    let menuOpen = false;
    let tl = gsap.timeline({ paused: true }); // Persistent timeline

    function animateDropdown(expand) {
        // Clear the timeline and define new animation based on the state
        tl.clear();

        if (expand) {
            menuOpen = true;
            mobileBtnText.textContent = "close";
            button.classList.add("is-open");
            // Expand animation
            tl.set(".menu_dropdown", {
                pointerEvents: "auto",
            })
                .set(".menu_dropdown", { display: "block" }) // Ensure dropdown is visible
                .set(button, {
                    color: "white",
                    background: "black",
                })
                .to(
                    ".nav_wrapper-mobile .navbar_menu-trigger.is-open + div .menu_wrap .nav_menu.w-nav-menu",
                    {
                        display: "block",
                    }
                )
                .to(
                    ".menu_background",
                    {
                        top: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        ease: customEase,
                        duration: 1,
                    },
                    "<"
                )

                .fromTo(
                    ".menu_wrap",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: "linear" },
                    "<+0.4"
                );
        } else {
            menuOpen = false;
            mobileBtnText.textContent = "menu";
            button.classList.remove("is-open");
            // Contract animation
            tl.set(".menu_dropdown", {
                pointerEvents: "none",
            });
            tl.to(".menu_background", {
                top: "0.5rem",
                right: "0.5rem",
                width: 0,
                height: 0,
                ease: customEase,
                duration: 1,
            })
                .to(
                    ".menu_wrap",
                    { opacity: 0, duration: 0.1, ease: "linear" },
                    "<"
                )
                .set(button, { color: "", background: "" }, "<")
                .to(
                    ".nav_wrapper-mobile .navbar_menu-trigger.is-open + div .menu_wrap .nav_menu.w-nav-menu",
                    {
                        display: "none",
                    }
                )
                .set(".menu_dropdown", {
                    display: "none",
                }); // Hide dropdown
        }

        // Play the timeline
        tl.play();
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            animateDropdown(false);
        });
    });

    // Use gsap.matchMedia() for responsive behaviors
    const mm = gsap.matchMedia();

    mm.add(
        {
            // Define a desktop media query
            isDesktop: "(min-width: 992px)",
        },
        () => {
            // Desktop-specific event listeners
            menu.addEventListener("mouseenter", () => {
                animateDropdown(true);
            });

            menu.addEventListener("mouseleave", () => {
                animateDropdown(false);
            });

            // Cleanup function for when the media query no longer matches
            return () => {
                menu.removeEventListener("mouseenter", animateDropdown);
                menu.removeEventListener("mouseleave", animateDropdown);
            };
        }
    );

    button.addEventListener("click", () => {
        if (!menuOpen) {
            animateDropdown(true);
        } else {
            animateDropdown(false);
        }
    });

    // Click listener to close the dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && menuOpen) {
            animateDropdown(false); // Close dropdown
        }
    });

    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector(".nav_component");
    if (!navbar) return;

    let headTl = gsap.timeline({
        scrollTrigger: {
            trigger: "footer",
            start: `top 35%`,
            toggleActions: "play none none reverse",
            // toggleClass: { targets: navbar, className: "is-footer" },
        },
    });

    headTl.to(navbar, {
        opacity: 0,
        duration: 0.2,
        ease: "linear",
    });

    // gsap.to(".nav_component", {
    //     scrollTrigger: {
    //         trigger: ".nav_component",
    //         start: "top top", // Pin the nav when it reaches the top of the viewport
    //         endTrigger: ".main-wrapper", // Stop pinning when the footer starts
    //         end: "bottom bottom", // End pinning when the footer's top aligns with the bottom of the viewport
    //         pin: true, // Pin the element
    //         pinSpacing: false, // Optional: Prevent adding extra space after the pinned element
    //     },
    // });
};
