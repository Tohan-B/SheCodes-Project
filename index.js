function getDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayWeek = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayWeek];

  return `${day} ${hours}:${minutes}`;
}

function showInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h3 = document.querySelector("h3");
  if (searchInput.value) {
    h3.innerHTML = `${searchInput.value}`;
  } else {
    h3.innerHTML = null;
    alert("Please type a city");
  }
}

function displayWeather(response) {
  let temperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidity = response.data.main.humidity;
  let humidityResponse = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidityResponse}`;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// Feature #1
let dateElement = document.querySelector("#date-display");
let currentTime = new Date();
dateElement.innerHTML = getDate(currentTime);

// Feature#2
let form = document.querySelector("#search-form");
form.addEventListener("submit", showInput);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
