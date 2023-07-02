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

function setTabIndexPrimaryNav() {
  window.innerWidth <= 1200
    ? (primaryNavContainer.tabIndex = '0')
    : (primaryNavContainer.tabIndex = '-1');
}
window.addEventListener('resize', setTabIndexPrimaryNav);

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

searchClose.addEventListener('mouseup', e => {
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

// SECONDARY NAV - ADDING PROFILE NAMES
const savedNames = sessionStorage.getItem('profileSelected');
const namesArray = savedNames.split(',');
const currentProfile = namesArray[0];
const otherProfiles = namesArray.splice(1);
const profileLogos = document.querySelectorAll('.profile-logo');
const profileNames = document.querySelectorAll('.profile-name');

function addProfileNames() {
  profileNames.forEach((name, index) => {
    name.textContent = otherProfiles[index];
  });
}

function setUpCurrentProfile() {
  profileLogos[0].src = `src/images/profiles-${currentProfile.toLowerCase()}.png`;
  profileLogos[0].alt = `Awatar użytkownika ${currentProfile}`;
}

function setUpOtherProfiles() {
  profileLogos.forEach((profile, index) => {
    if (index === 0) return;
    else {
      profile.src = `src/images/profiles-${otherProfiles[
        index - 1
      ].toLowerCase()}.png`;
      profile.alt = `Awatar użytkownika ${otherProfiles[index]}`;
    }
  });
}
addProfileNames();
setUpCurrentProfile();
setUpOtherProfiles();

// SECONDARY NAV - LOGOUT
const btnLogout = document.querySelector('.profile-logout-link');
btnLogout.addEventListener('click', () => {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('profileSelected');
});

// SLIDER FUNCTIONALITY
function runSlider() {
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
  window.addEventListener('resize', runSlider);
});

function runSliderPopUp() {
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

        console.log(sliderPaddingNum);
        console.log(distanceFromLeft);

        if (rect.right / sliderPaddingNum > 23)
          sliderPopUp.classList.add('right');

        if (
          distanceFromLeft === sliderPaddingNum ||
          distanceFromLeft - 1 === sliderPaddingNum ||
          distanceFromLeft + 1 === sliderPaddingNum
        )
          sliderPopUp.classList.add('left');

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

// FOOTER SERVICE-CODE
const serviceCode = document.querySelector('.footer-service-code');
const dedicatedServiceCode = '997-666';
serviceCode.addEventListener('click', () => {
  serviceCode.textContent = dedicatedServiceCode;
});
