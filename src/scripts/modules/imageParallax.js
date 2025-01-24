import gsap from "gsap";

export default function () {
    const imageWraps = document.querySelectorAll("[data-image-parallax]");

    const heroSection = document.querySelector(".section_header");
    if (!imageWraps.length) return;

    imageWraps.forEach((wrap) => {
        const images = wrap.querySelectorAll("img");
        let heroImage = false;
        images.forEach((img) => {
            if (img.classList.contains("hero_image")) {
                heroImage = true;
                gsap.set(img, {
                    top: "-20%",
                });
            } else {
                heroImage = false;
            }
        });
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrap,
                start: heroImage
                    ? "top +=${heroSection.offsetHeight}px"
                    : "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        tl.to(images, {
            top: "0%",
            ease: "linear",
            overwrite: true,
        });
    });
}
