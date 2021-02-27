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
  let value = document.getElementById("countryInput").value;
  let slug = "";
  let countryName = "";
  if(value === "")
    value = "united states of america";
  fetch("https://api.covid19api.com/countries")
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      for(const country of json) {
        if(country.Country.toLowerCase() === value.toLowerCase()) {
          slug = country.Slug;
          countryName = country.Country;
          break;
        }
      }
      if(slug === "") {
        document.getElementById("countryResults").innerHTML = "Could not find country specified." +
          " You may want to try to check your spelling or make sure you entered a real country :-)";
        return;
      }
      fetch("https://api.covid19api.com/summary")
        .then(function(response) {
          return response.json();
      }).then(function(json) {
        let content = "";
        for(const country of json.Countries) {
          if(country.Country === countryName) {
            content += "<h1>" + countryName + "</h1>";
            content += "<p>Updated on: " + new Date(country.Date).toLocaleString() + "</p>";
            content += "<p>New Confirmed Cases: " + country.NewConfirmed.toLocaleString() + "</p>";
            content += "<p>Total Confirmed Cases: " + country.TotalConfirmed.toLocaleString() + "</p>";
            content += "<p>New Deaths: " + country.NewDeaths.toLocaleString() + "</p>";
            content += "<p>Total Deaths: " + country.TotalDeaths.toLocaleString() + "</p>";
          }
        }
        document.getElementById("countryResults").innerHTML = content;
      })
    });
});
