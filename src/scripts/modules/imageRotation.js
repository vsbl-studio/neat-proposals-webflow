export default function () {
    const images = document.querySelectorAll('[data-changing-images="image"]');
    if (!images.length) return;

    let currentIndex = 0; // Start with the first image

    images.forEach((image, index) => {
        image.style.zIndex = index === 0 ? 1 : 0; // First image on top
    });

    // Function to change the z-index
    function changeImage() {
        images.forEach((image) => (image.style.zIndex = 0));

        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.zIndex = 1;
    }

    setInterval(changeImage, 1000);
}
