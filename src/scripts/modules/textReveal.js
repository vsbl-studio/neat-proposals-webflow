import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

export default function () {
    gsap.registerPlugin(CustomEase);

    CustomEase.create(
        "custom-3",
        "M0,0 C0.204,0 0.231,0.447 0.323,0.618 0.368,0.702 0.51,0.878 0.606,0.918 0.668,0.943 0.801,1 1,1 "
    );

    const revealTitles = document.querySelectorAll(".js-reveal-title");
    if (revealTitles.length) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "lines" }); // Split text into lines

            const linesTl = gsap.timeline({});

            // Animate each line
            splitText.lines.forEach((line, index) => {
                // Wrap each line in a hidden wrapper
                const lineWrapper = document.createElement("div");
                lineWrapper.style.display = "block";
                lineWrapper.style.overflow = "hidden";

                // Insert the wrapper and move the line inside it
                line.parentNode.insertBefore(lineWrapper, line);
                line.classList.add("split-line");

                lineWrapper.appendChild(line);

                linesTl.to(
                    line,
                    {
                        y: 0,
                        stagger: 0.14,
                        duration: 0.6,
                        ease: "custom-3",
                    },
                    index * 0.12 // Delay each line animation by 0.12s
                );
            });

            title.style.opacity = 1;
        });
    }

    const revealParagraphs = document.querySelectorAll(".js-reveal-paragraph");

    if (revealParagraphs.length) {
        revealParagraphs.forEach((par) => {
            gsap.from(par, {
                y: 50,
                opacity: 0,
                duration: 0.75,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: par,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });
    }
}
