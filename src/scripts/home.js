// STICKY NAVIGATION
const header = document.querySelector('.header');

function sitckyNav() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 68) header.classList.add('sticky');
  else header.classList.remove('sticky');
}

window.document.addEventListener('DOMContentLoaded', sitckyNav);
window.document.addEventListener('scroll', sitckyNav);

// PRIMARY NAV - CURRENT ACTIVE LINK
const primaryNav = document.querySelector('.primary-nav-items');
const primaryNavLink = document.querySelectorAll('.primary-nav-link');

primaryNav.addEventListener('click', e => {
  const click = e.target;
  if (click.classList.contains('primary-nav-item')) return;
  else {
    primaryNavLink.forEach(link => link.classList.remove('current-active'));
    click.classList.add('current-active');
  }
});

// SECONDARY NAV - SEARCH ACTIVATION
const searchOpen = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchLabel = document.querySelector('.search-label');
const searchClose = document.querySelector('.search-close');

searchOpen.addEventListener('click', () => {
  searchContainer.classList.remove('hidden');
  searchOpen.classList.add('hidden');
  searchInput.focus();
  searchInput.classList.add('expanded');
});

searchInput.addEventListener('focusout', () => {
  if (searchInput.classList.contains('has-value')) return;
  else {
    searchContainer.classList.add('hidden');
    searchOpen.classList.remove('hidden');
    searchInput.value = '';
    searchLabel.classList.remove('hidden');
    searchClose.classList.add('hidden');
    searchInput.classList.remove('expanded');
    searchInput.classList.remove('has-value');
  }
});

searchInput.addEventListener('input', e => {
  const text = e.target.value;
  text
    ? searchLabel.classList.add('hidden')
    : searchLabel.classList.remove('hidden');
  text
    ? searchClose.classList.remove('hidden')
    : searchClose.classList.add('hidden');
  text
    ? searchInput.classList.add('has-value')
    : searchInput.classList.remove('has-value');
});

searchClose.addEventListener('mousedown', e => {
  e.preventDefault();
  searchInput.value = '';
  searchInput.focus();
  searchLabel.classList.remove('hidden');
  searchClose.classList.add('hidden');
  searchInput.classList.remove('has-value');
});

// SECONDARY NAV - NOTIFICATIONS ACTIVATION
const notifNav = document.querySelectorAll('.secondary-nav-item')[2];
const notifContainer = document.querySelector('.notifications-container');
const notifArrowUp = document.querySelector('.profile-arrow-up-notification');
let notifTimeout;

notifNav.addEventListener('mouseover', () => {
  profileDropDown.classList.remove('active');
  profileArrowUp.classList.remove('active');
  profileArrowDown.style.transform = 'rotate(0deg)';
  clearTimeout(notifTimeout);
  notifContainer.classList.add('active');
  notifArrowUp.classList.add('active');
});

notifNav.addEventListener('mouseout', () => {
  notifTimeout = setTimeout(() => {
    notifContainer.classList.remove('active');
    notifArrowUp.classList.remove('active');
  }, 300);
});

// SECONDARY NAV - PROFILE ACTIVATION
const profileNav = document.querySelectorAll('.secondary-nav-item')[3];
const profileArrowDown = document.querySelector('.profile-arrow-down');
const profileArrowUp = document.querySelector('.profile-arrow-up');
const profileDropDown = document.querySelector('.profile-drop-down');
let profileTimeout;

profileNav.addEventListener('mouseover', () => {
  notifContainer.classList.remove('active');
  notifArrowUp.classList.remove('active');
  clearTimeout(profileTimeout);
  profileDropDown.classList.add('active');
  profileArrowUp.classList.add('active');
  profileArrowDown.style.transform = 'rotate(180deg)';
});

profileNav.addEventListener('mouseout', () => {
  profileTimeout = setTimeout(() => {
    profileDropDown.classList.remove('active');
    profileArrowUp.classList.remove('active');
    profileArrowDown.style.transform = 'rotate(0deg)';
  }, 300);
});

// SLIDER FUNCTIONALITY
function runSlider() {
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
}

// SESSION/LOCAL STORAGE
if (!sessionStorage.getItem('isLoggedIn')) window.location.href = 'login.html';

// GET MOVIES - API CALL
const API_KEY = '0dd7b24bac1f9ee9f5384ca0ffa09559';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGQ3YjI0YmFjMWY5ZWU5ZjUzODRjYTBmZmEwOTU1OSIsInN1YiI6IjY0N2ViODQ2MGUyOWEyMmJlMDhlNmE1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkNOlkR2oX0Q4gww4JtRv1SRNX4S1GNR8e_xmSP9dkI',
  },
};

async function logMoviesData2() {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=pl-PL&page=1',
      options
    );
    const data = await response.json();
    const dataArray = data.results;
    const first10 = dataArray.slice(0, 10);
    const last10 = dataArray.slice(10);

    const sliderContent = document.querySelector('#top10-poland');
    const sliderContent2 = document.querySelector('#top10-world');

    first10.forEach((data, index) => {
      const img = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
      const title = data.title;
      const img2 = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

      const sliderEl2 = `
            <div class="slider-item-ranking">
              <span class="slider-number">${index + 1}</span>
              <img src="${img2}" alt="Miniaturka filmu" class="slider-img" />
            </div>
`;

      sliderContent2.insertAdjacentHTML('beforeend', sliderEl2);
    });

    last10.forEach((data, index) => {
      const img = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
      const title = data.title;
      const img2 = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

      const sliderEl = `
              <div class="slider-item">
                <img
                  src="${img}"
                  alt=""
                  class="slider-item-img"
                />
                <p class="slider-item-name">${title}</p>
              </div>
`;

      const sliderEl2 = `
            <div class="slider-item-ranking">
              <span class="slider-number">${index + 1}</span>
              <img src="${img2}" alt="Miniaturka filmu" class="slider-img" />
            </div>
`;

      sliderContent.insertAdjacentHTML('beforeend', sliderEl2);

      // sliderContent.forEach(slider => {
      //   slider.insertAdjacentHTML('afterbegin', sliderEl);
      // });
    });

    runSlider();
  } catch (err) {
    console.error(err);
  }
}
logMoviesData2();

/////////////////////
/////////////////////
/////////////////////
