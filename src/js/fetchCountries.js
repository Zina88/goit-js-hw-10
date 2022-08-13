import { Notify } from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,flags,languages,population';

export default class FetchCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(`${BASE_URL}${this.searchQuery}${FILTER}`)
      .then(response => {
        if (!response.ok) {
          Notify.failure('Oops, there is no country with that name');
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        // console.log(data);
        return data;
      });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
