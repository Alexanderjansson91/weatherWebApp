//My API key and URL
const api = {
  key: "a6da713e87b7884950660593bc2eed8d",
  url: "https://api.openweathermap.org/data/2.5/"
}

//SearchBox
const searchbox = document.querySelector('.form-control');

//Button how confirm user input
function displayWeatherButton() {
  document.getElementById("btn btn-light").innerHTML = getResults(searchbox.value);
}

//Get result from the API
function getResults(query) {
  let response = fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);

  if (response.ok) {
    return response.json();
  }
  else {
    throw new Error("Could not fetch data.");
  }
}

//display the API result from user input
function displayResults(weather) {
  let Town = document.querySelector('.location .city');
  Town.innerText = `${weather.name}, ${weather.sys.country}`;

  let dateFunction = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(dateFunction);

  let temperature = document.querySelector('.current .temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  var iconCode = weather.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  $(".icon").html("<img class = 'newIcon' src=" + iconUrl + ">");

  let highAndLow = document.querySelector('.hi-low');
  highAndLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

//Data for Date
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

