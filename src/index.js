import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(e) {
  e.preventDefault();

  const input = e.target;
  const inputValue = input.value.trim();
  clearList();
  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        return (countryList.innerHTML = data.reduce(
          (markup, country) => createMarkupList(country) + markup,
          ''
        ));
      } else if (data.length === 1) {
        // clearList();
        return (countryInfo.innerHTML = data.reduce(
          (markup, country) => createMarkupCountry(country) + markup,
          ''
        ));
      }
    }).catch(errorCountry)
    
}

// function updateList(markup){
//   return  countryList.innerHTML = markup
//   return  countryInfo.innerHTML = markup
// }

function clearList() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function createMarkupList({ name, flags }) {
  return `<li >
<img src="${flags.svg}" alt="${name.official}" width="40" />
<p class="country-list__descr">${name.official}</p>
</li>`;
}

function createMarkupCountry({ name, capital, population, languages, flags }) {
  return `<li>
    <img src="${flags.svg}" alt=" ${name.official}" width="30" hight="20">
       <b>${name.official}</b></p>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages)} </p>
              </li>`;
}

function errorCountry() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
