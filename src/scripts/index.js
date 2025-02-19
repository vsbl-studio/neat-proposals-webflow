import {
    syncScrollWithGSAP,
    revealFooter,
    smoothScroll,
} from "./modules/smoothScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileNavigation } from "./modules/navigation";
import imageParallax from "./modules/imageParallax";
import imageRotation from "./modules/imageRotation";
import accordion from "./modules/accordion";
import marquee from "./modules/marquee";
import currentYear from "./modules/currentYear";
import buttonHover from "./modules/buttonHover";
import textReveal from "./modules/textReveal";
// import borderAnimation from "./modules/borderAnimation";
document.addEventListener("DOMContentLoaded", function () {
    // Load modules
    // cookieYes();
    smoothScroll();
    textReveal();
    // borderAnimation();
    imageRotation();
    buttonHover();
    imageParallax();
    syncScrollWithGSAP();
    marquee();
    mobileNavigation();
    accordion();
    revealFooter();
    currentYear();
    ScrollTrigger.refresh();
});
