export function SliderPopUp() {
  const sliderArrowLeft = document.querySelectorAll('.slider-arrow-left');
  const sliderArrowRight = document.querySelectorAll('.slider-arrow-right');
  const sliderStripes = document.querySelectorAll('.slider-stripes');
  const sliderItem = document.querySelectorAll('.slider-item');
  const sliderItemRank = document.querySelectorAll('.slider-item-ranking');
  const sliderItems = [...sliderItem, ...sliderItemRank];
  const categorySlider = document.querySelector('.category-slider');
  const sliderPadding = window.getComputedStyle(categorySlider).paddingRight;
  let sliderPaddingNum = Math.round(sliderPadding.slice(0, -2));
  let popUpWidth;

  const width = window.innerWidth;
  if (width > 1400) popUpWidth = Math.round(window.innerWidth / 4.5);
  if (width <= 1400) popUpWidth = Math.round(window.innerWidth / 3.9);
  if (width <= 1200) popUpWidth = Math.round(window.innerWidth / 3.3);
  if (width <= 1000) popUpWidth = Math.round(window.innerWidth / 2.3);
  if (width <= 700) popUpWidth = Math.round(window.innerWidth / 1.8);
  if (width <= 550) popUpWidth = Math.round(window.innerWidth / 1.6);
  if (width <= 420) popUpWidth = Math.round(window.innerWidth / 1.4);

  window.addEventListener('resize', () => {
    const sliderPadding = window.getComputedStyle(categorySlider).paddingRight;
    sliderPaddingNum = Math.round(sliderPadding.slice(0, -2));
  });

  sliderItems.forEach(slider => {
    const currentCategory = slider.parentElement.parentElement.parentElement;
    const sliderPopUp = slider.firstElementChild;
    sliderPopUp.style.width = `${popUpWidth}px`;

    window.addEventListener('resize', () => {
      let popUpWidth;
      const width = window.innerWidth;
      if (width > 1400) popUpWidth = Math.round(window.innerWidth / 4.5);
      if (width <= 1400) popUpWidth = Math.round(window.innerWidth / 3.9);
      if (width <= 1200) popUpWidth = Math.round(window.innerWidth / 3.3);
      if (width <= 1000) popUpWidth = Math.round(window.innerWidth / 2.3);
      if (width <= 700) popUpWidth = Math.round(window.innerWidth / 1.8);
      if (width <= 550) popUpWidth = Math.round(window.innerWidth / 1.6);
      if (width <= 420) popUpWidth = Math.round(window.innerWidth / 1.4);

      sliderPopUp.style.width = `${popUpWidth}px`;
    });

    let sliderTimeout;

    function openPopUp() {
      sliderTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const rect = slider.getBoundingClientRect();
        const distanceFromLeft = Math.round(rect.left);

        // Pop-up attached to left
        if (rect.right / sliderPaddingNum > 22)
          sliderPopUp.classList.add('right');

        // Pop-up attached to right
        if (
          distanceFromLeft === sliderPaddingNum ||
          distanceFromLeft - 1 === sliderPaddingNum ||
          distanceFromLeft + 1 === sliderPaddingNum
        )
          sliderPopUp.classList.add('left');

        // Pop-up attached to top
        if (
          width <= 1000 &&
          currentCategory.classList.contains('category-view-absolute')
        )
          sliderPopUp.classList.add('top');

        currentCategory.classList.add('enabled');
        sliderPopUp.classList.remove('hidden-2');
        sliderArrowLeft.forEach(arr => arr.classList.add('hidden-2'));
        sliderArrowRight.forEach(arr => arr.classList.add('hidden-2'));
        sliderStripes.forEach(str => str.classList.add('hidden-2'));
      }, 500);
    }

    function closePopUp() {
      setTimeout(() => {
        sliderPopUp.classList.remove('right');
        sliderPopUp.classList.remove('left');
        sliderPopUp.classList.remove('top');
        currentCategory.classList.remove('enabled');
      }, 200);
      sliderPopUp.classList.add('hidden-2');
      sliderArrowLeft.forEach(arr => arr.classList.remove('hidden-2'));
      sliderArrowRight.forEach(arr => arr.classList.remove('hidden-2'));
      sliderStripes.forEach(str => str.classList.remove('hidden-2'));
      clearTimeout(sliderTimeout);
    }

    slider.addEventListener('mouseenter', openPopUp);
    slider.addEventListener('mouseleave', closePopUp);
  });
}
