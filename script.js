function populateData() {
  fetch("https://api.covid19api.com/world/total")
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    document.getElementById("total-confirmed").innerHTML = json.TotalConfirmed.toLocaleString();
    document.getElementById("total-deaths").innerHTML = json.TotalDeaths.toLocaleString();
    document.getElementById("total-recovered").innerHTML = json.TotalRecovered.toLocaleString();
  })
};

document.getElementById("countrySubmit")
  .addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("countryInput").value;
  let slug = "";
  if(value === "")
    return;
  fetch("https://api.covid19api.com/countries")
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      for(const country of json) {
        if(country.Country.toLowerCase() === value.toLowerCase()) {
          slug = country.Slug;
          break;
        }
      }
      document.getElementById("countryResults").innerHTML = slug;
    });
  //const url = "";
});

/* // Using this code as a template.
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" +
  "&APPID=86cd53b5ae3c51bd65f151bbd6144dc1";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h1>Weather in ' + json.name + "</h1>";
      for (let i=0; i < json.weather.length; i++) {
	        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	       if (i !== json.weather.length - 1)
	        results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" +
    "&APPID=86cd53b5ae3c51bd65f151bbd6144dc1";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
         forecast += "<div id='forecastResults'>"
	       forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do, h:mm a') + "</h2>";
	       forecast += "<p>Current Temperature: " + json.list[i].main.temp + " °F</p>";
         forecast += "<p>Current Weather: " + json.list[i].weather[0].main + "</p>";
	       forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
         forecast += "<p>Low: " + json.list[i].main.temp_min + " °F</p>";
         forecast += "<p>High: " + json.list[i].main.temp_max + " °F</p>";
         forecast += "<p>Humidity: " + json.list[i].main.humidity + "%</p>";
         forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " mph</p>";
         forecast += "</div>"
      }
      document.getElementById("forecastGrid").innerHTML = forecast;
    });
});*/
