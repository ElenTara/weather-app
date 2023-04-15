let apiKey = "b39fd544fbfd289a17b0d205d5515953";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Odessa&appid=${apiKey}&units=metric`;
//console.log(apiUrl);
function displayTemperature(response) {
  console.log(response.data);
  let currTemp = document.querySelector("#curr-temp");
  let temperature = Math.round(response.data.main.temp);
  if (temperature > 0) {
    temperature = `+${temperature}`; // можно добавить плюс
  }
  currTemp.innerHTML = temperature;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let currHum = document.querySelector("#curr-hum");
  currHum.innerHTML = response.data.main.humidity;

  let currWind = document.querySelector("#curr-wind");
  currWind.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(displayTemperature);
