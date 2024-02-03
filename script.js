async function get_data() {
    try {
        var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");
        var result = await res.json();
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].name;
            var lat = result[i].latlng[0];
            var lon = result[i].latlng[1];
            var capital_data = result[i].capital;
            await open_data(name, lat, lon, capital_data);
        }
    } catch (error) {
        console.log("Error fetching country data: " + error);
    }
}

async function open_data(name, lat, lon, capital_data) {
    try {
        if (isNaN(lat) || isNaN(lon)) {
            throw new Error("Invalid Lat Long values");
        }
        var open_res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa4973b1fa1ca717811b9566c55321ec`);
        var weather_data = await open_res.json();
        
        var container = document.createElement("div");
        container.className = "container";

        var row = document.createElement("div");
        row.className = "row";

        var col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML +=
            `<div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">Name: ${name}</div>
                <div class="card-body text-primary">
                    <h5 class="card-title">Capital: ${capital_data}</h5>
                    <p class="card-text">Latitude: ${lat}, Longitude: ${lon}</p>
                </div>
            </div>`;
        row.appendChild(col);
        container.appendChild(row);
        document.body.appendChild(container);
    } catch (error) {
        console.log("Error fetching weather data: " + error.message);
    }
}

get_data();
