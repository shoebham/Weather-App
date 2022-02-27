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
    let location_input = document.querySelector("#location-input").value
    if(location_input=="") {
        location_input="Ukraine";
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location_input}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url,{mode:'cors'});
    const data = await response.json();
    const celsius = document.querySelector("#celsius");
    const fahrenheit = document.querySelector("#fahrenheit");
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

    const tempChange=document.querySelectorAll(".temp-change");
    tempChange.forEach(element => {
        element.addEventListener("click",(e)=>{
            if(e.target.id=="celsius"){
                celsius.classList.add("active");
                fahrenheit.classList.remove("active");
                document.querySelector("#temperature").innerHTML=Math.round(weather.temperature)+"°C";
            }
            else{
                fahrenheit.classList.add("active");
                celsius.classList.remove("active");
                document.querySelector("#temperature").innerHTML=Math.round((weather.temperature*9/5)+32)+"°F";
            }
        })
    });

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
    temperature.textContent+=`<span class="material-icons-outlined">
    thermostat</span>`;
    temperature.textContent=Math.round(weather.temperature)+"°C";
    // // humidity.textContent=weather.humidity;
    // // pressure.textContent=weather.pressure;
    location.textContent=weather.location;
    // sunrise.textContent=timeFormatter(timeConverter(weather.sunrise));
    // sunset.textContent=timeFormatter(timeConverter(weather.sunset));
    description.textContent=weather.description;
    displayIcon(weather.icon);
    const weatherInfo = document.querySelector(".temperature-info");
    // weatherInfo.style.marginBottom="15%";
}

function displayIcon(iconCode){
    const icon = document.querySelector("#icon-img");
    const iconLink =`http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.src=iconLink;

}
function timeConverter(time){
    return new Date(time*1000);
}

function timeFormatter(time){
    // Sun Feb 27 2022 06:53:12 GMT+0530 (India Standard Time)
    const timeString=time.toString();
    const timeArray=timeString.split(" ");
    const currentTime=timeArray[4];
    return currentTime;
}


function setup(){
    const mode = document.querySelector("#mode");
    const celsius = document.querySelector("#celsius");
    celsius.classList.add("active");
    const css = document.querySelector("#css");
    const body = document.querySelector("body");
    mode.addEventListener("click",(e)=>{
        body.classList.toggle("dark");
        if(mode.textContent=="dark_mode"){
            mode.textContent="light_mode";
            // body.classList.remove("dark")

        }
        else
        {
            mode.textContent="dark_mode";
            // body.classList.add("dark");
        }
    });

    const currentTime = parseInt(new Date().toString().split(" ")[4].split(":")[0]);
    if(currentTime>18&&currentTime<6)
        body.classList.add("dark");
    else
        body.classList.remove("dark");

}
setup();
search();