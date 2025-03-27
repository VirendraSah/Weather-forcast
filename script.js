let form=document.querySelector("form")

form.addEventListener("submit",async (event)=>{
    let CityName=event.target.CityName.value
    event.preventDefault()

    let weatherWrapper = document.querySelector(".InsideDetails")
    let weatherDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`)
    let finalDetails= await weatherDetails.json()
    let {name,main,wind,weather}=finalDetails;
    let weatherItems=`
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
            </div>`
    weatherWrapper.innerHTML=(weatherItems)


})

