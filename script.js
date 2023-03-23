const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityName = document.querySelector(".city-name");
const temperatureRate = document.querySelector(".temperature-rate");

search.addEventListener("click", () => {
  const APIKey = "79ae23299fdeba8c712b89f17f7e07e9";
  const city = document.querySelector(".search-box input").value;
  console.log(
    "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=79ae23299fdeba8c712b89f17f7e07e9"
  );
  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        temperatureRate.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      const tempUp = document.querySelector(".temperature-rate .temp-up span");
      const tempDown = document.querySelector(
        ".temperature-rate .temp-down span"
      );
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Fog":
          image.src = "images/fog.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Smoke":
          image.src = "images/smoke.png";
          break;
        default:
          image.src = "";
      }
      cityName.innerHTML = ` The weather in <b>${json.name}</b>, ${json.sys.country} is `;
      // tempRate.innerHTML = `<h4 ><i class="fa-solid fa-temperature-arrow-up"></i>: ${json.main.temp_max}°C   <i class="fa-solid fa-temperature-arrow-down"></i>: ${json.main.temp_min}°C</h4>`;
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      tempUp.innerHTML = `${json.main.temp_max}°C`;
      tempDown.innerHTML = `${json.main.temp_min}°C`;
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      temperatureRate.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      temperatureRate.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
