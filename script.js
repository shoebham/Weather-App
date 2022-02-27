var weather={};
const WEATHER_API_KEY="4ab5cf99f985b594a4276b30c7b3b95e";
const GIF_API_KEY="L2AncndI0uU2YX5TFCrENzUaUJUkOD7j";

async function searchGif(text){
    const response=await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIF_API_KEY}&s=${text}`,{mode:'cors'})
    const json= await response.json()
    document.querySelector("body").style.backgroundImage=`url(${json.data.images.original.url})`;
    
}
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
        location_input="Antarctica";
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location_input}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url,{mode:'cors'});
    console.log(response);
    if(response.status!=200){
        displayError(response.status,response.statusText);
        return;
    }

    const data = await response.json()
    const celsius = document.querySelector("#celsius");
    celsius.classList.add("active");
    const fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.classList.remove("active");
    weather.temperature = data.main.temp;
    weather.location=data.name
    weather.description=data.weather[0].description;
    weather.icon=data.weather[0].icon;
    const tempChange=document.querySelectorAll(".temp-change");
    tempChange.forEach(element => {
        element.addEventListener("click",changeTemp);
    });

    displayWeather();
}

function changeTemp(e){
    console.log(e);
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
}

function displayWeather(){
    const temperature = document.querySelector("#temperature");
    const location = document.querySelector("#location");
    const description = document.querySelector("#description");
    const icon = document.querySelector("#icon");
    temperature.textContent+=`<span class="material-icons-outlined">
    thermostat</span>`;
    temperature.textContent=Math.round(weather.temperature)+"°C";
    location.textContent=weather.location;
    description.textContent=weather.description;
    searchGif(weather.location);
}

function displayIcon(iconCode){
    const icon = document.querySelector("#icon-img");
    const iconLink =`http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.src=iconLink;

}


function setup(){
    const mode = document.querySelector("#mode");
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

function displayError(errorCode,errorText){
    document.querySelector("#location").textContent="Error";
    document.querySelector("#temperature").textContent=errorCode;
    document.querySelector("#description").textContent=errorText;
    const tempChange=document.querySelectorAll(".temp-change");
    tempChange.forEach(element => {
        element.removeEventListener("click",changeTemp,false);
    });
    searchGif(errorText)
}
setup();
search();
