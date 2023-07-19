// SLIDER MOBILE ADJUSTMENT - USER AGENT
export function UserAgent() {
  const userAgent = navigator.userAgent;
  const mobileBrowser =
    /Mobi/.test(userAgent) ||
    /Android/.test(userAgent) ||
    /webOS/.test(userAgent) ||
    /iPhone/.test(userAgent) ||
    /iPad/.test(userAgent) ||
    /iPod/.test(userAgent) ||
    /BlackBerry/.test(userAgent) ||
    /Windows Phone/.test(userAgent);

  const sliderArrowLeft = document.querySelectorAll('.slider-arrow-left');
  const sliderArrowRight = document.querySelectorAll('.slider-arrow-right');
  const sliderStripes = document.querySelectorAll('.slider-stripes');

  if (mobileBrowser) {
    sliderArrowLeft.forEach(arr => arr.classList.add('mobile-view'));
    sliderArrowRight.forEach(arr => arr.classList.add('mobile-view'));
    sliderStripes.forEach(str => str.classList.add('mobile-view'));
  } else {
    sliderArrowLeft.forEach(arr => arr.classList.remove('mobile-view'));
    sliderArrowRight.forEach(arr => arr.classList.remove('mobile-view'));
    sliderStripes.forEach(str => str.classList.remove('mobile-view'));
  }
}

// SLIDER FUNCTIONALITY
export function Slider() {
  const slider = document.querySelectorAll('.category-slider');

  slider.forEach(slider => {
    const width = window.innerWidth;
    let slidesCounter;
    let slidesPerPage;
    let currentTranslateX = 0;

    if (width > 1400) slidesPerPage = 6;
    if (width <= 1400) slidesPerPage = 5;
    if (width <= 1200) slidesPerPage = 4;
    if (width <= 1000) slidesPerPage = 3;
    if (width <= 700) slidesPerPage = 2;

    slidesCounter = slidesPerPage;

    const dimmedLeft = slider.children[0];
    const dimmedRight = slider.children[4];
    const arrowLeft = slider.children[1];
    const arrowRight = slider.children[5];
    const sliderContent = slider.children[2];
    const slides = sliderContent.children;
    const sliderStripes = slider.children[3];
    const sliderStripe = sliderStripes.children;
    const slidesLoaded = slides.length;
    const pages = Math.ceil(slidesLoaded / slidesPerPage);
    const maxTranslateX = (pages - 1) * 100;
    const maxSlides = pages * slidesPerPage;

    // Set the slider to beginning
    sliderContent.style.transform = 'translateX(0%)';

    // Remove existing stripes
    while (sliderStripes.firstChild)
      sliderStripes.removeChild(sliderStripes.firstChild);

    const slidesArray = Array.from(slides);

    slidesArray.forEach((slide, index) => {
      if (index + 1 <= slidesPerPage) slide.tabIndex = '0';
      else slide.tabIndex = '-1';
    });

    function updateAccesibility() {
      slidesArray.forEach(slide => {
        slide.classList.remove('enabled');
        if (slide.tabIndex === 0) slide.classList.add('enabled');
      });
    }

    updateAccesibility();

    function createStripes() {
      sliderStripes.insertAdjacentHTML(
        'afterbegin',
        `<span class="slider-stripe"></span>`
      );
    }

    for (let i = 0; i < pages; i++) {
      createStripes();
    }

    sliderStripe[0]?.classList.add('active');

    function moveRight() {
      if (slidesCounter >= slidesLoaded) {
        sliderContent.style.transform = `translateX(0%)`;
        currentTranslateX = 0;
        slidesCounter = slidesPerPage;
        slidesArray.forEach((slide, index) => {
          if (index + 1 <= slidesPerPage) slide.tabIndex = '0';
          else slide.tabIndex = '-1';
        });
      } else {
        sliderContent.style.transform = `translateX(${
          currentTranslateX - 100
        }%)`;
        currentTranslateX = currentTranslateX - 100;
        slidesCounter = slidesCounter + slidesPerPage;
        slidesArray.forEach((slide, index) => {
          if (
            index + 1 > slidesCounter - slidesPerPage &&
            index + 1 <= slidesCounter
          )
            slide.tabIndex = '0';
          else slide.tabIndex = '-1';
        });
      }
      updateSliderStripe();
      updateAccesibility();
    }

    function moveLeft() {
      if (slidesCounter <= slidesPerPage) {
        sliderContent.style.transform = `translateX(${-maxTranslateX}%)`;
        currentTranslateX = -maxTranslateX;
        slidesCounter = maxSlides;
        slidesArray.forEach((slide, index) => {
          if (
            index + 1 <= slidesLoaded &&
            index + 1 > (pages - 1) * slidesPerPage
          )
            slide.tabIndex = '0';
          else slide.tabIndex = '-1';
        });
      } else {
        sliderContent.style.transform = `translateX(${
          currentTranslateX + 100
        }%)`;
        currentTranslateX = currentTranslateX + 100;
        slidesCounter = slidesCounter - slidesPerPage;
        slidesArray.forEach((slide, index) => {
          if (
            index + 1 > slidesCounter - slidesPerPage &&
            index + 1 <= slidesCounter
          )
            slide.tabIndex = '0';
          else slide.tabIndex = '-1';
        });
      }
      updateSliderStripe();
      updateAccesibility();
    }

    function updateSliderStripe() {
      const activePageIndex = Math.ceil(slidesCounter / slidesPerPage) - 1;
      const stripes = Array.from(sliderStripe);
      stripes.forEach((stripe, index) => {
        if (index === activePageIndex) stripe.classList.add('active');
        else stripe.classList.remove('active');
      });
    }

    arrowLeft.addEventListener('click', moveLeft);
    arrowRight.addEventListener('click', moveRight);
    dimmedLeft.addEventListener('keydown', e => {
      if (e.key === 'Enter') moveLeft();
    });
    dimmedRight.addEventListener('keydown', e => {
      if (e.key === 'Enter') moveRight();
    });
  });
}
