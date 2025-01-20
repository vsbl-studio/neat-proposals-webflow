export default function () {
    const navMenu = document.querySelector(".nav_menu");

    console.log("navMenu", navMenu);

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

    const mobileNavToggle = document.querySelector(".nav_button");

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            mobileNavToggle.classList.toggle("open");
        });
    }
}
