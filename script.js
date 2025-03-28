let form = document.querySelector("form");

let getUserLocation = (finalcity = null) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let weatherWrapper = document.querySelector(".InsideDetails");

                let currentlocApi = async () => {
                    let weatherDetails = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
                    let finalDetails = await weatherDetails.json();
                    return finalDetails;
                };

                let finalDetails = await currentlocApi();
                if (!finalcity) finalcity = finalDetails.address.city;

                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${finalcity}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`);
                let Data = await response.json();
                let { name, main, weather, wind } = Data;

                // let inputField = document.querySelector("input[name='CityName']");
                // inputField.value = inputField.value + `${name}`;

                let weatherItems = `
                        <div class="weather-Details">
                            <div class="circle">
                                <figure>
                                    <img src="http://openweathermap.org/img/w/${weather[0].icon}.png" alt="weather">
                                </figure>
                                <div class="temprature">
                                    <h2>${main.temp} <sup>°</sup></h2>
                                    <span class="cityName">${name}</span>
                                </div>
                                <div class="MoreAboutWeater">
                                    <p>Wind now<span>${wind.speed}</span></p>
                                    <p>Humidity <span>${main.humidity}</span></p>
                                </div>
                            </div>
                        </div>`;

                weatherWrapper.innerHTML = weatherItems;
            },

            (error) => {
                console.error("Error fetching location:", error.message);
                form = document.querySelector("form");

                form.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    let CityName = event.target.CityName.value;

                    let weatherWrapper = document.querySelector(".InsideDetails");

                    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`);
                    let Data = await response.json();
                    let { name, main, weather, wind } = Data;

                    let weatherItems = `
                    <div class="weather-Details">
                        <div class="circle">
                            <figure>
                                <img src="http://openweathermap.org/img/w/${weather[0].icon}.png" alt="weather">
                            </figure>
                            <div class="temprature">
                                <h2>${main.temp} <sup>°</sup></h2>
                                <span class="cityName">${name}</span>
                            </div>
                            <div class="MoreAboutWeater">
                                <p>Wind now<span>${wind.speed}</span></p>
                                <p>Humidity <span>${main.humidity}</span></p>
                            </div>
                        </div>
                    </div>`;

                    weatherWrapper.innerHTML = weatherItems;
                });
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

getUserLocation();

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let finalcity = event.target.CityName.value;
    getUserLocation(finalcity);
})