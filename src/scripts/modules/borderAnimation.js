import gsap from "gsap";
import { customEase } from "../utils/globalElements";

export default function () {
    const horizontalDividers = document.querySelectorAll(".horizontal-divider");

    if (horizontalDividers.length) {
        horizontalDividers.forEach((divider) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: divider,
                    start: "top 90%",
                    // markers: true,
                },
            });

            tl.to(divider, {
                scaleX: 1,
                duration: 1.8,
                ease: customEase,
                // markers: true,
            });
        });
    }
}
