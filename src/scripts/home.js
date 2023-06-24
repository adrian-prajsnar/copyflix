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
const primaryNavItems = document.querySelector('.primary-nav-items');
const primaryNavLink = document.querySelectorAll('.primary-nav-link');

primaryNavItems.addEventListener('click', e => {
  const click = e.target;
  if (!click.classList.contains('primary-nav-link')) return;

  if (click.classList.contains('current-active')) return;
  else {
    primaryNavLink.forEach(link => link.classList.remove('current-active'));
    click.classList.add('current-active');
  }
});

// PRIMARY NAV - MENU BAR ACTIVATION
const primaryNavContainer = document.querySelector('.primary-nav-container');
let navItemsTimeout;

function closePrimaryNavItems() {
  primaryNavItems.classList.remove('active');
}

primaryNavContainer.addEventListener('mouseenter', () => {
  closeNotifNav();
  closeProfileNav();
  clearTimeout(navItemsTimeout);
  primaryNavItems.classList.add('active');
});

primaryNavContainer.addEventListener('mouseleave', () => {
  navItemsTimeout = setTimeout(() => closePrimaryNavItems(), 300);
});

// SECONDARY NAV - SEARCH ACTIVATION
const searchOpen = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchLabel = document.querySelector('.search-label');
const searchClose = document.querySelector('.search-close');
const searchNav = document.querySelector('#secondary-nav-item-search');

searchOpen.addEventListener('click', () => {
  searchNav.classList.add('search');
  searchContainer.classList.remove('hidden');
  searchOpen.classList.add('hidden');
  searchInput.focus();
  searchInput.classList.add('expanded');
});

searchInput.addEventListener('focusout', () => {
  if (searchInput.classList.contains('has-value')) return;
  else {
    searchNav.classList.remove('search');
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
const notifNav = document.querySelector('#secondary-nav-item-notifications');
const notifContainer = document.querySelector('.notifications-container');
const notifArrowUp = document.querySelector('.profile-arrow-up-notification');
let notifTimeout;

function closeNotifNav() {
  notifContainer.classList.remove('active');
  notifArrowUp.classList.remove('active');
}

notifNav.addEventListener('mouseenter', () => {
  closeProfileNav();
  closePrimaryNavItems();
  clearTimeout(notifTimeout);
  notifContainer.classList.add('active');
  notifArrowUp.classList.add('active');
});

notifNav.addEventListener('mouseleave', () => {
  notifTimeout = setTimeout(() => closeNotifNav(), 300);
});

// SECONDARY NAV - PROFILE ACTIVATION
const profileNav = document.querySelector('#secondary-nav-item-profile');
const profileArrowDown = document.querySelector('.profile-arrow-down');
const profileArrowUp = document.querySelector('.profile-arrow-up');
const profileDropDown = document.querySelector('.profile-drop-down');
let profileTimeout;

function closeProfileNav() {
  profileDropDown.classList.remove('active');
  profileArrowUp.classList.remove('active');
  profileArrowDown.style.transform = 'rotate(0deg)';
}

profileNav.addEventListener('mouseenter', () => {
  closeNotifNav();
  closePrimaryNavItems();
  clearTimeout(profileTimeout);
  profileDropDown.classList.add('active');
  profileArrowUp.classList.add('active');
  profileArrowDown.style.transform = 'rotate(180deg)';
});

profileNav.addEventListener('mouseleave', () => {
  profileTimeout = setTimeout(() => closeProfileNav(), 300);
});

// SLIDER FUNCTIONALITY
function runSlider() {
  const slider = document.querySelectorAll('.category-slider');

  slider.forEach(slider => {
    const btnLeft = slider.children[1];
    const btnRight = slider.children[4];
    const sliderContent = slider.children[2];
    const slides = sliderContent.children;
    const sliderStripes = slider.children[3];
    const sliderStripe = sliderStripes.children;
    const maxSlides = slides.length;
    const pages = Math.ceil(maxSlides / 6);
    const maxWidth = (pages - 1) * 100;
    let curWidth = 0;
    let curSlides = 6;

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
      const stripes = Array.from(sliderStripe);
      stripes.forEach((stripe, index) => {
        if (index === activePageIndex) stripe.classList.add('active');
        else stripe.classList.remove('active');
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

async function getCategory(apiLink, sliderId, top10 = false) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${apiLink}`,
      options
    );
    const data = await response.json();
    let dataArray;
    top10
      ? (dataArray = data.results.slice(0, 10))
      : (dataArray = data.results);
    const sliderContent = document.querySelector(`#${sliderId}`);

    if (top10) dataArray.slice(0, 10);

    dataArray.forEach((data, index) => {
      const img = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
      const img2 = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      const title = data.title || data.name;
      const releaseDate = data.release_date || data.first_air_date;
      const voteAverage = data.vote_average.toFixed(1);
      const voteCount = data.vote_count;
      let sliderEl;

      if (top10) {
        sliderEl = `
            <div class="slider-item-ranking">
              <div class="slider-pop-up hidden-2">
                  <img
                    src="${img}"
                    alt="Miniaturka - ${title}"
                    class="slider-pop-up-img"
                  />
                  <div class="slider-pop-up-icons">
                    <div class="slider-pop-up-icons-left">
                      <button class="slider-pop-up-icon play">
                        <ion-icon name="play"></ion-icon>
                      </button>
                      <button class="slider-pop-up-icon add">
                        <ion-icon name="add-outline"></ion-icon>
                      </button>
                      <button class="slider-pop-up-icon like">
                        <ion-icon name="thumbs-up-outline"></ion-icon>
                      </button>
                    </div>
                    <div class="slider-pop-up-icons-right">
                      <button class="slider-pop-up-icon more">
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                  <div class="slider-pop-up-title">
                    <span>${title}</span>
                  </div>
                  <ul class="slider-pop-up-ratings">
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="play-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${releaseDate}</span>
                    </li>
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="star-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${voteAverage}</span>
                    </li>
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="person-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${voteCount}</span>
                    </li>
                  </ul>
              </div>
              <div class="slider-number-container">
                <div class="${
                  index + 1 === 4
                    ? 'slider-number fixed-stroke'
                    : 'slider-number'
                }${index + 1 === 10 ? ' fixed-size' : ''}">${index + 1}</div>
              </div>
              <img src="${img2}" alt="Miniaturka - ${title}" class="slider-img" />
            </div>
`;
      } else {
        sliderEl = `
              <div class="slider-item">
                <div class="slider-pop-up hidden-2">
                  <img
                    src="${img}"
                    alt="Miniaturka - ${title}"
                    class="slider-pop-up-img"
                  />
                  <div class="slider-pop-up-icons">
                    <div class="slider-pop-up-icons-left">
                      <button class="slider-pop-up-icon play">
                        <ion-icon name="play"></ion-icon>
                      </button>
                      <button class="slider-pop-up-icon add">
                        <ion-icon name="add-outline"></ion-icon>
                      </button>
                      <button class="slider-pop-up-icon like">
                        <ion-icon name="thumbs-up-outline"></ion-icon>
                      </button>
                    </div>
                    <div class="slider-pop-up-icons-right">
                      <button class="slider-pop-up-icon more">
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                  <div class="slider-pop-up-title">
                    <span>${title}</span>
                  </div>
                  <ul class="slider-pop-up-ratings">
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="play-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${releaseDate}</span>
                    </li>
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="star-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${voteAverage}</span>
                    </li>
                    <li class="slider-pop-up-rating">
                      <ion-icon
                        class="slider-pop-up-rating-icon"
                        name="person-outline"
                      ></ion-icon>
                      <span class="slider-pop-up-rating-text">${voteCount}</span>
                    </li>
                  </ul>
                </div>
                <img
                  src="${img}"
                  alt="Miniaturka - ${title}"
                  class="slider-item-img"
                />
                <div class="slider-item-name"><span>${title}</span></div>
              </div>
      `;
      }
      sliderContent.insertAdjacentHTML('beforeend', sliderEl);
    });
  } catch (err) {
    console.error(err);
  }
}

async function getSlidersData() {
  await getCategory('trending/movie/day?language=pl-PL', 'top10-movies', true);
  await getCategory('trending/tv/day?language=pl-PL', 'top10-series', true);
  await getCategory('movie/upcoming?language=pl-PL&page=1', 'upcoming');
  await getCategory(
    'account/19864519/favorite/tv?language=pl-PL&page=1&sort_by=created_at.asc',
    'favourites'
  );
  await getCategory(
    'tv/top_rated?language=pl-PL&page=1',
    'highest-rated-series'
  );
  await getCategory('tv/popular?language=pl-PL&page=1', 'popular');
  await getCategory(
    'movie/now_playing?language=pl-PL&page=1',
    'new-on-netflix'
  );
  await getCategory('tv/top_rated?language=pl-PL&page=2', 'series');
  await getCategory('movie/popular?language=pl-PL&page=1', 'movies');
}

getSlidersData().then(() => {
  runSlider();
  runSliderPopUp();
});

function runSliderPopUp() {
  const sliderArrowLeft = document.querySelectorAll('.slider-arrow-left');
  const sliderArrowRight = document.querySelectorAll('.slider-arrow-right');
  const sliderStripes = document.querySelectorAll('.slider-stripes');
  const sliderItem = document.querySelectorAll('.slider-item');
  const sliderItemRank = document.querySelectorAll('.slider-item-ranking');
  const sliderItems = [...sliderItem, ...sliderItemRank];
  const width = Math.round(window.innerWidth / 4.5);
  const height = Math.round(window.innerWidth / 4.1);
  const categorySlider = document.querySelector('.category-slider');
  const sliderPadding = window.getComputedStyle(categorySlider).paddingRight;
  let sliderPaddingNum = +sliderPadding.slice(0, -2);

  window.addEventListener('resize', () => {
    const sliderPadding = window.getComputedStyle(categorySlider).paddingRight;
    sliderPaddingNum = +sliderPadding.slice(0, -2);
  });

  sliderItems.forEach(slider => {
    const currentCategory = slider.parentElement.parentElement.parentElement;
    const sliderPopUp = slider.firstElementChild;
    sliderPopUp.style.width = `${width}px`;
    sliderPopUp.style.height = `${height}px`;

    window.addEventListener('resize', () => {
      const width = Math.round(window.innerWidth / 4.5);
      const height = Math.round(window.innerWidth / 4.1);
      sliderPopUp.style.width = `${width}px`;
      sliderPopUp.style.height = `${height}px`;
    });

    let sliderTimeout;

    slider.addEventListener('mouseenter', () => {
      sliderTimeout = setTimeout(() => {
        currentCategory.classList.add('enabled');

        const rect = sliderPopUp.getBoundingClientRect();
        if (window.innerWidth - rect.right < sliderPaddingNum) {
          sliderPopUp.style.left = '25%';
          sliderPopUp.style.transform = 'translate(-50%, -50%)';
        }
        if (rect.left < sliderPaddingNum) {
          sliderPopUp.style.left = '0';
          sliderPopUp.style.transform = 'translate(0, -50%)';
        }

        sliderPopUp.classList.remove('hidden-2');
        sliderArrowLeft.forEach(arr => arr.classList.add('hidden-2'));
        sliderArrowRight.forEach(arr => arr.classList.add('hidden-2'));
        sliderStripes.forEach(str => str.classList.add('hidden-2'));
      }, 500);
    });

    slider.addEventListener('mouseleave', () => {
      currentCategory.classList.remove('enabled');
      sliderPopUp.classList.add('hidden-2');
      sliderArrowLeft.forEach(arr => arr.classList.remove('hidden-2'));
      sliderArrowRight.forEach(arr => arr.classList.remove('hidden-2'));
      sliderStripes.forEach(str => str.classList.remove('hidden-2'));
      clearTimeout(sliderTimeout);
    });
  });
}
