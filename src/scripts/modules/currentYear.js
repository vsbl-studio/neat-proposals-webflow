export default function () {
    const yearWrapper = document.querySelector("[data-year]");

    if (yearWrapper) {
        const currentYear = new Date().getFullYear();

        yearWrapper.innerHTML = currentYear;
    }
}
