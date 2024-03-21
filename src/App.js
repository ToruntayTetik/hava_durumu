import React,{useState,useEffect} from 'react'
import './App.css';
import {usePosition} from 'use-position';
import axios from 'axios'


function App() {
  const {latitude,longitude}=usePosition()
  const [weather,setWeather]=useState();
  console.log("weater",weather)
// console.log(latitude)
// console.log(longitude)

  const getWeatherData=async (lat,lon)=>{
    const key= process.env.REACT_APP_WEATHER_DATA;
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
      // console.log("data",data)
      setWeather(data);
    }
    catch{
      alert("Veri Çekilemedi.")
    }
  }

  useEffect(()=>{

    latitude && longitude && getWeatherData(latitude,longitude)


  },latitude,longitude)
  
   if(!weather) return <div className="a">loading...</div>
  return (
    <div className="App">
      <h2>Hava Durumu</h2>
      <h3>Enlem Koordinat:{latitude}</h3>
      <h3>Boylam Koordinat:{longitude}</h3>
      <h3>Koordinat Bölgesi:{weather.name}</h3>
      <h3>Hava Sıcaklığı:{Math.floor(weather.main.temp - 273)}</h3>
      <h3>Durumu:{weather.weather[0].main}</h3>
      <h3>Özelliği:{weather.weather[0].description}</h3>
    </div>
  );
}

export default App;
