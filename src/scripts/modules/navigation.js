import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

export const desktopNavigation = () => {
    const navMenu = document.querySelector(".nav_menu");

    if (navMenu) {
        let lastParent = null;

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.target.classList.contains("w--current")
                ) {
                    const currentMenuItem = mutation.target;
                    const parentElement = currentMenuItem.closest(
                        ".nav_menu_link-wrapper"
                    );

                    if (parentElement) {
                        if (lastParent && lastParent !== parentElement) {
                            lastParent.classList.remove("active"); // Reset previous parent
                        }
                        parentElement.classList.add("active");
                        lastParent = parentElement;
                    }
                }
            }

            // Check if no link has the w--current class
            const hasCurrent = navMenu.querySelector(
                ".nav_menu_link.w--current"
            );
            if (!hasCurrent && lastParent) {
                lastParent.classList.remove("active"); // Reset margin-left
                lastParent = null; // Clear reference to the last parent
            }
        });

        observer.observe(navMenu, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
};

export const mobileNavigation = () => {
    gsap.registerPlugin(CustomEase);

    CustomEase.create(
        "custom",
        "M0,0 C0.204,0 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );
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
                    color: "var(--brand--orange)",
                    background: "var(--brand--black)",
                })
                .to(
                    ".menu_background",
                    {
                        top: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        ease: "custom",
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
                ease: "custom",
                duration: 1,
            })
                .to(
                    ".menu_wrap",
                    { opacity: 0, duration: 0.1, ease: "linear" },
                    "<"
                )
                .set(button, { color: "", background: "" }, "<")
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
                console.log("mouseenter");

                animateDropdown(true);
            });

            menu.addEventListener("mouseleave", () => {
                console.log("mouseleave");
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
};
