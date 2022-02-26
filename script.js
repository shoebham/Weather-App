const API_KEY="4ab5cf99f985b594a4276b30c7b3b95e"
var weather={};



document.querySelector("#location-input").addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        var text = document.querySelector('#location-input').value;
        console.log(text);
        search();
    }
})
async function search(){
    const location_input = document.querySelector("#location-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location_input}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url,{mode:'cors'});
    const data = await response.json();
    weather.temperature = data.main.temp;
    weather.humidity=data.main.humidity;
    weather.pressure=data.main.pressure;
    weather.location=data.name
    weather.sunrise=data.sys.sunrise;
    weather.sunset=data.sys.sunset;
    weather.timezone=data.timezone;
    weather.description=data.weather[0].description;
    weather.icon=data.weather[0].icon;
    console.log(data);
    console.log(weather);
    displayWeather();
}

function displayWeather(){
    const temperature = document.querySelector("#temperature");
    const humidity = document.querySelector("#humidity");
    const pressure = document.querySelector("#pressure");
    const location = document.querySelector("#location");
    const sunrise = document.querySelector("#sunrise");
    const sunset = document.querySelector("#sunset");
    const description = document.querySelector("#description");
    const icon = document.querySelector("#icon");
    temperature.textContent=weather.temperature;
    humidity.textContent=weather.humidity;
    pressure.textContent=weather.pressure;
    location.textContent=weather.location;
    sunrise.textContent=timeConverter(weather.sunrise);
    sunset.textContent=timeConverter(weather.sunset);
    description.textContent=weather.description;
    displayIcon(weather.icon);
    const weatherInfo = document.querySelector(".temperature-info");
    weatherInfo.style.marginBottom="15%";
}

function displayIcon(iconCode){
    const icon = document.querySelector("#icon-img");
    const iconLink =`http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.src=iconLink;

}
function timeConverter(time){
    return new Date(time*1000);
}