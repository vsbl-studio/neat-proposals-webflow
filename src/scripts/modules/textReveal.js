import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
export default function () {
    const revealTitles = document.querySelectorAll(".js-reveal-title");
    if (revealTitles.length) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "words" });
            let wrapperheight = 0;
            splitText.words.forEach((line) => {
                const lineWrapper = document.createElement("div");
                lineWrapper.style.display = "inline-block";
                lineWrapper.style.overflow = "hidden";
                line.parentNode.insertBefore(lineWrapper, line);
                lineWrapper.appendChild(line);
                console.log(lineWrapper.offsetHeight);
                wrapperheight = lineWrapper.offsetHeight;
            });
            title.style.opacity = 1;
            gsap.from(splitText.words, {
                y: wrapperheight,
                duration: 0.75,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
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
