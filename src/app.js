function showTemperature(response) {
    let temperatureElement = document.querySelector("#temp-unit");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
let city = "Montreal";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);