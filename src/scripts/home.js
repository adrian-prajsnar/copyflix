// STICKY NAVIGATION
const header = document.querySelector('.header');

function sitckyNav() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 68) header.classList.add('sticky');
  else header.classList.remove('sticky');
}

window.document.addEventListener('DOMContentLoaded', sitckyNav);
window.document.addEventListener('scroll', sitckyNav);

// SLIDER FUNCTIONALITY
const slider = document.querySelectorAll('.category-slider');

slider.forEach(slider => {
  const btnLeft = slider.firstElementChild;
  const btnRight = slider.lastElementChild;
  const sliderContent = slider.children[1];
  const slides = sliderContent.children;
  const sliderStripes = slider.children[2];
  const sliderStripe = sliderStripes.children;
  const maxSlides = slides.length;
  const pages = Math.ceil(maxSlides / 6);
  const maxWidth = (pages - 1) * 100;
  let curWidth = 0;
  let curSlides = 6;

  function createDots() {
    sliderStripes.insertAdjacentHTML(
      'afterbegin',
      `<span class="slider-stripe"></span>`
    );
  }

  for (let i = 0; i < pages; i++) {
    createDots();
  }

  sliderStripe[0].classList.add('active');

  function moveRight() {
    if (curSlides >= maxSlides) {
      sliderContent.style.transform = `translateX(0%)`;
      curWidth = 0;
      curSlides = 6;
    } else {
      sliderContent.style.transform = `translateX(${curWidth - 100}%)`;
      curWidth = curWidth - 100;
      curSlides = curSlides + 6;
    }
    updateSliderDot();
  }

  function moveLeft() {
    if (curSlides <= 6) {
      console.log(-maxWidth);
      sliderContent.style.transform = `translateX(${-maxWidth}%)`;
      curWidth = -maxWidth;
      curSlides = maxSlides;
    } else {
      sliderContent.style.transform = `translateX(${curWidth + 100}%)`;
      curWidth = curWidth + 100;
      curSlides = curSlides - 6;
    }
    updateSliderDot();
  }

  function updateSliderDot() {
    const activePageIndex = Math.ceil(curSlides / 6) - 1;
    const dots = Array.from(sliderStripe);
    dots.forEach((dot, index) => {
      if (index === activePageIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);
});

//
//
//
//
//
// working slider

/*

const slider = document.querySelectorAll('.category-slider');

slider.forEach(slider => {
  const btnLeft = slider.firstElementChild;
  const btnRight = slider.lastElementChild;
  const sliderContent = slider.children[1];
  const slides = sliderContent.children;

  let curWidth = 0;
  let curSlides = 6;
  let maxSlides = slides.length;

  function moveRight() {
    if (curSlides >= maxSlides) moveLeft();
    else {
      sliderContent.style.transform = `translateX(${curWidth - 100}%)`;
      curWidth = curWidth - 100;
      curSlides = curSlides + 6;
    }
  }

  function moveLeft() {
    if (curSlides <= 6) moveRight();
    else {
      sliderContent.style.transform = `translateX(${curWidth + 100}%)`;
      curWidth = curWidth + 100;
      curSlides = curSlides - 6;
    }
  }

  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);
});

*/
