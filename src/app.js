function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    let datenumber = date.getDate();
    let year = date.getFullYear();
    return `${day} ${hours}:${minutes} ${month} ${datenumber}, ${year}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast (response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
    forecast.forEach(function (forecastDay, index) {
        if(index < 5) {
            forecastHTML += `
                <div class="col-2 card card-body">
                <h6>${formatDay(forecastDay.dt)}</h6>
                <h5 class="card-title">
                    <img
                    src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                    />
                </h5>
                <h6 class="card-body">
                <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
                </h6>
                </div>
            `;
        };
    });
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "eae061c95483dd066657bfc7525418ed";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiURL);
    axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
    let temperatureElement = document.querySelector("#temp-unit");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dayTimeElement = document.querySelector("#dateTime");
    let iconElement = document.querySelector("#icon");

    celsius = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsius);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dayTimeElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#cityInput");
    search(cityInputElement.value);
}

function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    axios.get(`${apiUrl}`).then(showTemperature);
  }  

  function showCurrent(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
  }

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-unit");
    celsiusLink.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahTemp = (celsius * 9) /5 + 32;
    temperatureElement.innerHTML = Math.round(fahTemp);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-unit");
    fahrenheit.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celsius);
}

let celsius = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", showCurrent);

let fahrenheit = document.querySelector("#unit-fah");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#unit-cel");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Kyiv");