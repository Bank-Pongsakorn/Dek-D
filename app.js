const slider = document.querySelector('.slider');
const slides = Array.from(slider.children)
const nextImage = document.querySelector('.slideBtn.right');
const prevImage = document.querySelector('.slideBtn.left');
const slideIndicator = document.querySelector('.sliderNav')
const indicators = Array.from(slideIndicator.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// console.log(slideWidth);

// arrange slide ให้ต่อกัน
const setSlidePosition = ((slides, index) => {
    slides.style.left = slideWidth * index + 'px';
})
slides.forEach(setSlidePosition)

const moveToSlide = (slider, currentSlide, targetSlide) => {
    slider.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// Update Indicator
const UpdateIndc = (currentInd, targetIn) => {
    currentInd.classList.remove('current-slide');
    targetIn.classList.add('current-slide')
}

// Show & Hide ArrowNav
const showHideArrow = (slides, prevImage, nextImage, targetIndex) => {
    if (targetIndex === 0) {
        prevImage.classList.add('hidden');
        nextImage.classList.remove('hidden');
    } else if (targetIndex === slides.length - 1) {
        prevImage.classList.remove('hidden');
        nextImage.classList.add('hidden');
    } else {
        prevImage.classList.remove('hidden');
        nextImage.classList.remove('hidden');
    }
}

// Previous Slide button part
prevImage.addEventListener('click', event => {
    const currentSlide = slider.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentInd = slideIndicator.querySelector('.current-slide')
    const prevInd = currentInd.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(slider, currentSlide, prevSlide);
    UpdateIndc(currentInd, prevInd);
    showHideArrow(slides, prevImage, nextImage, prevIndex)
})

// Next Slide button part
nextImage.addEventListener('click', event => {
    const currentSlide = slider.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentInd = slideIndicator.querySelector('.current-slide')
    const nextInd = currentInd.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(slider, currentSlide, nextSlide);
    UpdateIndc(currentInd, nextInd);
    showHideArrow(slides, prevImage, nextImage, nextIndex)
})

// Slides Indicator part
slideIndicator.addEventListener('click', event => {
    // กำหนดจุดที่ถูกคลิก
    const targetIn = event.target.closest('button');
    const currentSlide = slider.querySelector('.current-slide');
    const currentInd = slideIndicator.querySelector('.current-slide');
    const targetIndex = indicators.findIndex(ind => ind === targetIn)
    // console.log(targetIndex);
    const targetSlide = slides[targetIndex];
    moveToSlide(slider, currentSlide, targetSlide);
    UpdateIndc(currentInd, targetIn);
    showHideArrow(slides, prevImage, nextImage, targetIndex);
})


