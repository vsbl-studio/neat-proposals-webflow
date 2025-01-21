import {
    syncScrollWithGSAP,
    revealFooter,
    smoothScroll,
} from "./modules/smoothScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileNavigation } from "./modules/navigation";
import accordion from "./modules/accordion";
import marquee from "./modules/marquee";
import currentYear from "./modules/currentYear";
import buttonHover from "./modules/buttonHover";
import textReveal from "./modules/textReveal";
document.addEventListener("DOMContentLoaded", function () {
    // Load modules
    // cookieYes();
    smoothScroll();
    textReveal();
    buttonHover();
    syncScrollWithGSAP();
    marquee();
    mobileNavigation();
    accordion();
    revealFooter();
    currentYear();
    ScrollTrigger.refresh();
});
