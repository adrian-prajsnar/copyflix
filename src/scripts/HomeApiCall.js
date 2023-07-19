import { Slider } from './HomeSlider.js';
import { SliderPopUp } from './HomeSliderPopUp.js';

// GET MOVIES - API CALL
export function ApiCall() {
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
      const sliderContent = document.querySelector(`#category-${sliderId}`);

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
    await getCategory(
      'trending/movie/day?language=pl-PL',
      'top10-movies',
      true
    );
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
    // When width is changing adjust sliders
    let previousWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth !== previousWidth) Slider();
      previousWidth = window.innerWidth;
    });
    Slider();
    SliderPopUp();
  });
}
