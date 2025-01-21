import gsap from "gsap";

export default function () {
    const imageWraps = document.querySelectorAll("[data-image-parallax]");

    if (!imageWraps.length) return;

    imageWraps.forEach((wrap) => {
        const images = wrap.querySelectorAll("img");

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
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
