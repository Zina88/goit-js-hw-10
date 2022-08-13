import './css/styles.css';
import CounriesAPIService from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const counriesAPIService = new CounriesAPIService();
const refs = {
  searchForm: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener(
  'input',
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);

function onSearchCountry(e) {
  // e.preventDefault();
  clearCountryInfo();
  clearCountryList();
  counriesAPIService.query = e.target.value.trim();

  if (counriesAPIService.query !== '') {
    counriesAPIService.fetchCountries().then(data => {
      createMarkup(data);
    });
  }
}

function createMarkup(data) {
  clearCountryInfo();
  clearCountryList();
  if (data.length >= 2 && data.length < 10) {
    createList(data);
    return;
  }
  if (data.length === 1) {
    createCard(data);
    return;
  }
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function createList(data) {
  const markup = data
    .map(item => {
      return `
      <li class="country-list__item">
      <img class="country-list__img" src="${item.flags.svg}" alt="${item.name.official}">

      <h2 class="country-list__title">${item.name.official}</h2>
        </li>
      `;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function createCard(data) {
  const markup = data
    .map(item => {
      return `
      <div class="card-body">

        <div class="card-name">
            <img class="card-info__img" src="${item.flags.svg}" 
            alt="${item.name.official}">
          <h2 class="card-info__title">${item.name.official}</h2>
        </div>

          <p class="card-info__capital">Capital: ${item.capital}</p>
          <p class="card-info__population">Population: ${item.population}</p>
          <p class="card-info__languages">Languages: ${Object.values(
            item.languages
          )}</p>
      </div>
      `;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
