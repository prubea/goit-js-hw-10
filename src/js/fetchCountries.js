function fetchCountries(name) {
  const filter = "name,capital,population,flags,languages"
  const fetchQuery =
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=${filter}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  return fetchQuery;
}

export { fetchCountries };

// https://restcountries.com/v3.1/name/{name}

// https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages,currencies