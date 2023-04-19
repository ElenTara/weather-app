function formatDate(timestamp) {
  let now = new Date(timestamp);
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  return `Last updated:&nbsp; ${day} &nbsp;|&nbsp; ${month} ${date} &nbsp;|&nbsp; ${hours}:${minutes}`;
  // Отображает время последнего обновления погоды на сайте!!
}

function displayTemperature(response) {
  //console.log(response.data);
  let currTemp = document.querySelector("#curr-temp");

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
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

  let dateElement = document.querySelector("#date"); // вставляем дату, вызываем функцию
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconToday = document.querySelector("#icon-now");
  // вместо innerHTML - меняем атрибуты элемента img с иконкой текущей погоды
  iconToday.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconToday.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b39fd544fbfd289a17b0d205d5515953";
  //let city = "Odessa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#curr-temp"); // температура сейчас
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#curr-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = Math.round(celsiusTemperature);
  if (temperature > 0) {
    temperature = `+${temperature}`; // можно добавить плюс
  }
  temperatureElement.innerHTML = temperature;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Odessa"); // покажет по умолчанию, при загрузке страницы

// + добавить функцию для кнопки Current !!!
