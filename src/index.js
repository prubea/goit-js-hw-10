import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
//const
const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

// Listening for input
const DEBOUNCE_DELAY = 300;
searchBox.addEventListener("input", debounce(searching, DEBOUNCE_DELAY));

// Functions
// 
function searching() {
  fetchCountries(searchBox.value.trim())
    .then(countries => renderCountriesInfo(countries))
    .catch(error => {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      console.log(error);

      if (searchBox.value !== "") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      };
    }
    );
};

//
function renderCountriesInfo(countries) {
  if (countries.length > 10) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  }
  else if (countries.length > 1 && countries.length <= 10) {
    countryInfo.innerHTML = "";
    const markup = countries
      .map((country) => {
        return `<li class="country-list">
      <img class="country-list__flag" src="${country.flags.svg}" width="30" alt="The flag of ${country.name.common}">
      <span country-list__text> ${country.name.common}</span>
      </li>`;
      })
      .join("");

    countryList.innerHTML = markup;
  }
  else if (countries.length === 1) {
    countryList.innerHTML = "";
    const countryInfoMarkup = countries.map((country) => {
      return `<img class="country-info__flag" src="${country.flags.svg}" width="50" alt="The flag of ${country.name.common}">
       <span class="country-info__name">${country.name.common}</span>
      <p class="country-info__item"><span class="country-info__label">Capital:</span> ${country.capital}</p>
      <p class="country-info__item"><span class="country-info__label">Population:</span> ${country.population}</p>
      <p class="country-info__item"><span class="country-info__label">Languages:</span> ${Object.values(country.languages).join(", ")}</p>`;
    });
    countryInfo.innerHTML = countryInfoMarkup;
  }
  else {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
  };
};