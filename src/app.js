let apiKey = "b39fd544fbfd289a17b0d205d5515953";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Odessa&appid=${apiKey}&units=metric`;
//console.log(apiUrl);
function displayTemperature(response) {
  console.log(response.data);
}
axios.get(apiUrl).then(displayTemperature);
