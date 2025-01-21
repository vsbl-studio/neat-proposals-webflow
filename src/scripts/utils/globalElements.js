import gsap from "gsap";

import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const bodyEl = document.querySelector("body");
export const overlayEl = document.querySelector(".overlay-bg");

export const customEase = CustomEase.create(
    "custom",
    "M0,0 C0.204,0 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);
