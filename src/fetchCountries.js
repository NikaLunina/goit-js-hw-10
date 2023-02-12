export { fetchCountries };
const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// const p = fetch("https://restcountries.com/v3.1/name/Ukraine").then(response => {

// return response.json()
// })
// .then(country =>  {
//   console.log(country)
// }).catch(error => console.log(error))
