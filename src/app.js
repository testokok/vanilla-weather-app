function formatDate(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let month = date.getMonth();
    let datenumber = date.getDate();
    let year = date.getFullYear();
    return `${day} ${hours}:${minutes}  ${month} ${datenumber}, ${year}`;
}


function showTemperature(response) {
    let temperatureElement = document.querySelector("#temp-unit");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dayTimeElement = document.querySelector("#dateTime");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dayTimeElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
let city = "Montreal";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);