import { useState } from "react";

const [cityWeather, setCityWeather] = useState({
    country: '',
    nation: '',
    temperature: 0,
    weather: '',
    visibility: '',
    speed: ''
  })
function getdata(data){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=334bb873c3df71c693c273964379dc9e`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
    })
}
export default getdata