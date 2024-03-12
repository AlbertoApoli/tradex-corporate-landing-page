const slider = document.querySelector(".slider");
const sliderButtons = document.querySelectorAll(".slider__button");
const firstSlide = slider.querySelector(".slider__slide");

const marginRight = parseFloat(window.getComputedStyle(firstSlide).marginRight);

sliderButtons.forEach((btn) => {
  let isThrottled = false;
  btn.addEventListener("click", function () {
    if (!isThrottled) {
      let firstSlideWidth = firstSlide.clientWidth + marginRight;

      if (
        btn.classList.contains("slider__button--left") &&
        slider.scrollLeft === 0
      ) {
        // If scrolling left and at the first slide, scroll to the last slide
        slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
      } else if (
        btn.classList.contains("slider__button--left") &&
        slider.scrollLeft + slider.clientWidth === slider.scrollWidth
      ) {
        // If scrolling left from the last slide, scroll to the second-to-last slide
        slider.scrollLeft -= firstSlideWidth;
      } else if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        // If at the last slide, scroll back to the first slide
        slider.scrollLeft = 0;
      } else {
        // Otherwise, scroll to the next/previous slide
        slider.scrollLeft += btn.classList.contains("slider__button--left")
          ? -firstSlideWidth
          : firstSlideWidth;
      }

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 500);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) {
        targetContainer.classList.toggle("u-flex-display");
      }
    });
  });
});
