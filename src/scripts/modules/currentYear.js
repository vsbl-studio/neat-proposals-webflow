export default function () {
    const currentYear = new Date().getFullYear();
    document.querySelector("[data-year]").innerHTML = currentYear;
}
