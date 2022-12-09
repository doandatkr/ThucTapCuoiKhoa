// import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useState,useRef } from 'react'
import {MdSearch,MdVisibility} from "react-icons/md"
import { WiHumidity } from "react-icons/wi";
import { IoMdCloudy } from "react-icons/io";
import { BiWind } from "react-icons/bi";
import moment from 'moment';

function App() {
    const [search, setSearch] = useState("hanoi")
    const handleChange = (event) => {
        setSearch(event.target.value) 
    }
    const [cityWeather, setCityWeather] = useState({
      country: '',
      nation: '',
      temperature: 0,
      iconid: '',
      weather: '',
      humidity: '',
      clound: '',
      visibility: '',
      speed: '',
      timezone: 0
    })
    
  
        const backgroundList = {
          hot:'https://wallpapercave.com/wp/wp4077312.jpg',
          cold:'https://wallpapercave.com/wp/wp8090902.jpg',
          cool:'https://www.choicehotels.com/cms/images/choice-hotels/explore/hero-explore-winter-travel-looking-glass-falls/hero-explore-winter-travel-looking-glass-falls.jpg',
          warm:'https://wallpapercave.com/wp/wp3085432.jpg',
        }
        const background = useMemo(() => {
          if(cityWeather.temperature<19)return `url(${backgroundList.cold})`
          if (cityWeather.temperature < 25) return `url(${backgroundList.cool})`
          if (cityWeather.temperature < 30) return `url(${backgroundList.warm})`
          return `url(${backgroundList.hot})`
        }, [cityWeather])
      
        const mapData = (data) => {
          setCityWeather({
            country: data.name,
            nation: data.sys.country,
            temperature: data.main.temp.toFixed(0) - 273,
            iconid: data.weather[0].icon,
            weather: data.weather[0].description,
            humidity: data.main.humidity,
            clound:data.clouds.all,
            visibility: data.visibility,
            speed: data.wind.speed,
            timezone: data.timezone / 3600
      })
    }
    /**chỉnh icon */
    const icon  =cityWeather.iconid;
    const IconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    /**sự kiện enter */
    const eventEnter=(e)=>{
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=334bb873c3df71c693c273964379dc9e`)
        .then(res => res.json())
        .then(res => {
          setTimeout(() => {
            mapData(res)  
          }, 500);
        })
    }
    // call api
    useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=334bb873c3df71c693c273964379dc9e`)
    .then(res => res.json())
    .then(res => {
        mapData(res)
    })
    },[])
    // set time 
    const [currentTime, setCurrentTime] = useState(null)
    let currentTimeRef = null

    useEffect(() => {
      setCurrentTime(moment.utc().add(cityWeather.timezone || 0, 'hour').format(' HH:mm:ss'))
      currentTimeRef = moment.utc().add(cityWeather.timezone || 0, 'hour').format(' HH:mm:ss')

      const interval = setInterval(() => {
        currentTimeRef = moment(currentTimeRef, 'HH:mm:ss').add(1, 's').format(' HH:mm:ss')
        setCurrentTime(currentTimeRef)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }, [cityWeather])
  return (
    <div className="App" id='app'>
    <>
        <div className='overlay'>
          <div className='container ' style={{ background: background}}>
              <form className='section section__inputs' onSubmit={eventEnter}>
                    <i className='icon__search'><MdSearch /></i>
                  <input className='search' placeholder='Search' value={search} type='text' onChange={handleChange} />
              </form>
            <div className=' section__time'>
                <h1 className='time'>{currentTime}</h1>  
            </div>
            <div className='section section__temperature'>
              <div className='country'>
                <h2>
                  {cityWeather.country}, {cityWeather.nation}
                </h2>
                <img className='icons' src={IconURL} alt="iconweather"/>
                <h3>{cityWeather.weather}</h3>
              </div>
              <div className='temperature'>
                  <h1>{cityWeather.temperature}º</h1>
              </div>
            </div>
      {/* bottom description */}
      <>
        <div className='section section__description'>
          <div className='card'>
            <div className='description__card-icon'>            
              <p><WiHumidity className='iconw' />Humidity</p> 
              <h2>{cityWeather.humidity}%</h2>
            </div>
          </div>
       
        
          <div className='card'>
            <div className='description__card-icon'>
              <p><IoMdCloudy className='iconw' /> Clound</p>
              <h2>{cityWeather.clound}%</h2>
            </div>
          </div>
      

          <div className='card'>
            <div className='description__card-icon'>             
              <p><MdVisibility className='iconw' /> Visibility</p>
              <h2>{cityWeather.visibility}</h2>
            </div>
          </div>
       
          <div className='card'>
            <div className='description__card-icon'>              
              <p><BiWind className='iconw' /> Speed</p>
              <h2>{cityWeather.speed}m/s</h2>
            </div>
            </div>
        </div>
    </>
       </div>
    </div>
 
    </>
  </div>
  
  );
      }

export default App;
