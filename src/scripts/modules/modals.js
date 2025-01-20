import { bodyEl, overlayEl } from "../utils/globalElements";
import { lenis } from "./smoothScroll";

const anchorsWithHash = document.querySelectorAll('a[href^="#"]');
const modals = document.querySelectorAll(".js-modal");
const closeModalBtns = document.querySelectorAll(".js-close-modal");

if (anchorsWithHash.length) {
    anchorsWithHash.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = anchor.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement && targetElement.classList.contains("js-modal")) {
                closeModals();
                targetElement.classList.add("open");
                toggleOverlayBackground(true);
                lenis.stop();
                bodyEl.classList.add("no-scroll");
            }
        });
    });
}

if (overlayBg) {
    overlayBg.addEventListener("click", closeModals);
}

if (closeModalBtns.length) {
    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            closeModals();
        });
    });
}

function handleModalVisibility() {
    const hash = window.location.hash.substring(1);

    if (modals.length) {
        const targetOverlay = Array.from(modals).find(
            (el) => el.getAttribute("id") === hash
        );

        if (targetOverlay) {
            targetOverlay.classList.add("open");
            toggleOverlayBackground(true);
            lenis.stop();
            bodyEl.classList.add("no-scroll");
        }
    }
}

function toggleOverlayBackground(isOpen) {
    if (overlayBg) {
        overlayBg.classList.toggle("open", isOpen);
        overlayBg.style.pointerEvents = isOpen ? "auto" : "none";
    }
}

function closeModals() {
    modals.forEach((el) => el.classList.remove("open"));
    toggleOverlayBackground(false);
    history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
    );
    lenis.start();
    bodyEl.classList.remove("no-scroll");
}

window.addEventListener("load", handleModalVisibility);
