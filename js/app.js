window.addEventListener("load", (e) => {
  const api = {
    key: "88a7390b05a1e0faf2e00d4afc1d8d4e",
    baseurl: "https://api.openweathermap.org/data/2.5/",
  };
  const searchBox = document.querySelector(".search-box");
  
  searchBox.addEventListener("keypress", (e) => {
    console.log(e.keyCode);
    if (e.keyCode == 13) {
      getResults(searchBox.value);
      console.log(searchBox.value);
      searchBox.value = "";
    }
  });
  function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => weather.json())
      .then(displayResults);
  }

  function displayResults(weather) {
    console.log(weather.sys);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  }

  function dateBuilder(s) {
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
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  setInterval(() => {
    const time = document.querySelector(".display #time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if (hours > 12) {
      day_night = "PM";
      hours = hours - 12;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
  });
});
