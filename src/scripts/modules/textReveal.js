import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { customEase } from "../utils/globalElements";
export default function () {
    const revealTitles = document.querySelectorAll(".js-reveal-title");
    if (revealTitles.length) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "lines" }); // Split text into lines

            const linesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            // Animate each line
            splitText.lines.forEach((line, index) => {
                // Wrap each line in a hidden wrapper
                const lineWrapper = document.createElement("div");
                lineWrapper.style.display = "block";
                lineWrapper.style.overflow = "hidden";

                // Insert the wrapper and move the line inside it
                line.parentNode.insertBefore(lineWrapper, line);
                lineWrapper.appendChild(line);

                linesTl.from(
                    line,
                    {
                        y: "100%",
                        duration: 2,
                        ease: customEase,
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
