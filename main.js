const locationEl = document.querySelector(".location");
const temperatureEl = document.querySelector(".temperature");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const humidityEl = document.querySelector(".humidity");
const cloudEl = document.querySelector(".cloud");
const windEl = document.querySelector(".wind");
const soilEl = document.querySelector(".soil");

const intervalId = setInterval(getData(), 3600000);
// setTimeout(function() {
//     clearInterval(intervalId);
//   }, 5000);

// let location;
let temperature;
let max_Temp;
let min_Temp;
let humidity;
let cloud;
let wind;
let soil;

async function getData() {
    const resp = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.0647&longitude=120.6687&hourly=relativehumidity_2m,cloudcover,windspeed_10m,winddirection_10m,temperature_80m,soil_temperature_6cm&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore");
    const respData = await resp.json();
    const dailyData = respData.daily_units;
    const hourlyData = respData.hourly_units;
    console.log(respData);
    // Getting the last element in array
    const temperatureData = respData.hourly.temperature_80m;
    temperature = temperatureData[temperatureData.length-1] + hourlyData.temperature_80m;
    console.log(temperature);
    const min_TempData = respData.daily.temperature_2m_min;
    min_Temp = min_TempData[min_TempData.length-1] + dailyData.temperature_2m_min;
    console.log(min_Temp);
    const max_TempData = respData.daily.temperature_2m_max;
    max_Temp = max_TempData[max_TempData.length-1] + dailyData.temperature_2m_max;
    console.log(max_Temp);
    const humidityData = respData.hourly.relativehumidity_2m;
    humidity = humidityData[humidityData.length-1] + hourlyData.relativehumidity_2m;
    console.log(humidity);
    const cloudData = respData.hourly.cloudcover;
    cloud = cloudData[cloudData.length-1] + hourlyData.cloudcover;
    console.log(cloud);
    const windData = respData.hourly.windspeed_10m;
    wind = windData[windData.length-1] + hourlyData.windspeed_10m;
    console.log(wind);
    const soilData = respData.hourly.soil_temperature_6cm;
    soil = soilData[soilData.length-1] + hourlyData.soil_temperature_6cm;
    console.log(soil);

    temperatureEl.innerHTML = temperature + ` <i class="fa-solid fa-temperature-low"></i>`;
    maxTemp.innerHTML = max_Temp + ` Max <i class="fa-solid fa-temperature-arrow-up"></i>`;
    minTemp.innerHTML = min_Temp + ` Min <i class="fa-solid fa-temperature-arrow-down"></i>`;
    humidityEl.innerHTML = humidity;
    cloudEl.innerHTML = cloud;
    windEl.innerHTML = wind;
    soilEl.innerHTML = soil;
}

