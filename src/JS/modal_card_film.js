/************************************************************************************************************************************************/
import * as functionsProject from './info_functions';
import * as localStorage from './local_storage';

/************************************************************************************************************************************************/

const modalFilmCard = document.querySelector('.modal-film');
/************************************************************************************************************************************************/
let idFilm = null;

/************************************************************************************************************************************************/
function openModal() {
  functionsProject.showEl(modalFilmCard);
  window.addEventListener('click', widowEvent);
  window.addEventListener('keydown', keyListener);
}
function closeModal() {
  functionsProject.hideEl(modalFilmCard);
  window.removeEventListener('Click', widowEvent);
  window.removeEventListener('keydown', keyListener);
}
function addToWatched() {
  localStorage.addToWatched(idFilm);
  console.log(`dodano film do obejrzanych o id ${idFilm}`);
  //'Dodano Film do Obejrzanych'
}

function addToQueued() {
  localStorage.addToQueue(idFilm);
  console.log(`dodano film do kolejki o id ${idFilm}`);
  //'Dodano Film do  kolejki'
}
function widowEvent(eve) {
  if (eve.target == modalFilmCard) {
    closeModal();
  }
}
function keyListener(eve) {
  if (eve.key === 'Escape') {
    closeModal();
  }
}
/************************************************************************************************************************************************/
export function createModalContent(filmData) {
  const modalContent = `
  <h1 class="modal_film_open">${filmData.title}</h1>
  <div class="modal-film__container">
    <button type="button" class="modal-film__button" data-modal-close>
      X
      <!-- <svg class="modal-film__close-icon">
        <use href="./images/icons.svg#icon-close-black-18dp-2-1"></use>
      </svg> -->
    </button>
    <div class="modal-film__img-frame">
      <img class="modal-film__img" src="https://image.tmdb.org/t/p/w500/${filmData.poster_path}" alt="" />
    </div>
    <div class="modal-film__card">
      <h2 class="modal-film__title">${filmData.title}</h2>
      <div class="modal-film__list">
        <ul>
          <li class="id"></li>
          <li class="modal-film__content-text">Vote / Votes</li>
          <li class="modal-film__content-text">Popularity</li>
          <li class="modal-film__content-text">Original Title</li>
          <li class="modal-film__content-text">Genre</li>
        </ul>
        <ul class="modal-film__content">
          <div class="modal-film__rate">
            <li class="modal-film__rate-content modal-film__wtf">${filmData.vote_average}</li>
            <li class="modal-film__rate-content modal-film__slash">/</li>
            <li class="modal-film__rate-content modal-film__wtf-two">${filmData.vote_count}</li>
          </div>
          <li class="modal-film__rate-content">${filmData.popularity}</li>
          <li class="modal-film__rate-content modal-film__inner-title">${filmData.original_title}</li>
          <li class="modal-film__rate-content">${filmData.genre}</li>
        </ul>
      </div>
      <h3 class="modal-film__about">About</h3>
      <p class="modal-film__desc">${filmData.overview}</p>
      <div class="modal-film__buttons">
        <button class="btn__modal" type="button" id="add__watched-btn">ADD TO WATCHED</button>
        <button class="btn__modal" type="button" id="add__queue-btn">ADD TO QUEUE</button>
      </div>
    </div>
  </div>
    `;

  modalFilmCard.innerHTML = modalContent;
  const addToQueueBtn = document.querySelector('#add__queue-btn');
  const addToWatchedBtn = document.querySelector('#add__watched-btn');
  const exitBtn = document.querySelector('[data-modal-close]');

  addToQueueBtn.addEventListener('click', addToQueued);
  addToWatchedBtn.addEventListener('click', addToWatched);
  exitBtn.addEventListener('click', closeModal);
  idFilm = filmData.id;
  openModal();
}
/************************************************************************************************************************************************/
