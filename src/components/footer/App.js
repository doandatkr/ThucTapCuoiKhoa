
import './App.css';
import { useMemo, useRef, useState } from 'react';
import {EyeOutlined,SettingOutlined, TeamOutlined} from '@ant-design/icons'
import  {FaWind} from 'react-icons/fa'
import { useEffect } from 'react';
import { WeatherData } from './mock-data/weather'
import moment from 'moment';


function App() {
  // const [data,setData]=useState({})
  const [name,setName]=useState('hanoi')
  const [time, setTime] = useState(moment())
  const timeRef = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current = moment(timeRef.current).add(1, 'second')
      setTime(timeRef.current)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const backgroundList = {
    hot:'https://topchiase24h.com/wp-content/uploads/2021/04/hinh-nen-mua-he-summer-cho-dien-thoai-48.jpg',
    cold:'https://nhathauxaydung24h.com/wp-content/uploads/2021/04/hinh-anh-mua-dong-lanh-nhin-tu-chan-nui.jpg',
    warm:'https://inkythuatso.com/uploads/thumbnails/800/2022/05/4-hinh-nen-mua-thu-cho-dien-thoai-31-16-31-17.jpg',
  }
  
  const [loading, setLoading] = useState(true)
  const [cityWeather, setCityWeather] = useState({
    country: '',
    nation: '',
    temperature: 0,
    weather: '',
    visibility: '',
    speed: '',
    timezone: 0
  })

  const background = useMemo(() => {
    if (cityWeather.temperature < 25) return `url(${backgroundList.cold})`
    if (cityWeather.temperature < 29) return `url(${backgroundList.warm})`
    return `url(${backgroundList.hot})`
  }, [cityWeather])

  const enter = (e)=>{
    e.preventDefault();
    setLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=db677b200cd5a8c9358a46b3b02e2155`)
    .then((res)=>res.json())
    .then(res=>{
      setTimeout(() => {
        setLoading(false)
        mapData(res)
        
      }, 1000);
     })
  }

  const [listCityWeather, setListCityWeather] = useState([])

  const listCityWeatherRender = listCityWeather.map((el) => {
    const backgroundImage = el.temperature < 25 ? `url(${backgroundList.cold})` : el.temperature < 29 ? `url(${backgroundList.warm})` : `url(${backgroundList.hot})`
    return <div className="App" style={{ background: backgroundImage }} key={el.country}>
    {loading ? <div>Loading...</div> : 
    <>
      <div className='country'>
        <h1>{el.country}, {el.nation}</h1>
        {/* <p>12:33</p> */}
      </div>  

      <div className='temperature'>
          <h1>{el.temperature}°C</h1>
      </div>

      <div className='weatherlike'>
          <h1>{el.weather}</h1>
      </div>

      <div className='icon'>
          <div>
            <EyeOutlined className='eyeicon'/>
            <p>{el.visibility}</p>
          </div>

          <div>
            <FaWind className='windicon'/>
            <p>{el.speed}m/s</p>
          </div>

          <div>
            <SettingOutlined className='settingicon'/>
            <p id='set'>setting</p>
          </div>
      </div>
    </>}
  </div>
  })

  const mapData = (data) => {
    console.log(data)
    setCityWeather({
      country: data.name,
      nation: data.sys.country,
      temperature: data.main.temp.toFixed(0) - 273,
      weather: data.weather[0].description,
      visibility: data.visibility,
      speed: data.wind.speed,
      timezone: data.timezone / 3600
    })
  }
 

useEffect(()=>{
  // setTimeout(() => {
    // const data = WeatherData.find(el => el.country.toLowerCase().includes(name)) || {}
    // setCityWeather(data)
    // setLoading(false)
  // }, 1000)

  setTimeout(() => {
    setListCityWeather(WeatherData)
    setLoading(false)
  }, 3000)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=ha noi&appid=db677b200cd5a8c9358a46b3b02e2155`)
  .then((res)=>res.json())
  .then(res=>{
    setTimeout(() => {
      setLoading(false)
      mapData(res)
      
    }, 1000);
    // if(cityWeather.temperature >=29)
    // {
    // document.getElementById("app").style.backgroundImage=`url(${hot})`
    //   console.log('a')
    // }
    // if(cityWeather.temperature <29 && cityWeather.temperature >=20){
    //   document.getElementById("app").style.backgroundImage=`url(${warm})`
    // }
    // if(cityWeather.temperature <20){
    //   document.getElementById("app").style.backgroundImage=`url(${cold})`
    // }
    // else document.getElementById("app").style.backgroundImage=`url(${cold})`
   })

},[])

useEffect(()=>{
  // if(cityWeather.temperature >=27)
  // {  
  //   document.getElementById("app").style.backgroundImage=`url(${hot})`
  // }
  // if(cityWeather.temperature <29 && cityWeather.temperature >=20){
  //   document.getElementById("app").style.backgroundImage=`url(${warm})`
  // }
  // if(cityWeather.temperature <20){
  //   document.getElementById("app").style.backgroundImage=`url(${cold})`
  // }
  // else document.getElementById("app").style.backgroundImage=`url(${cold})`
},[cityWeather.temperature])

const [currentTime, setCurrentTime] = useState(null)
let currentTimeRef = null

useEffect(() => {
  setCurrentTime(moment.utc().add(cityWeather.timezone || 0, 'hour').format('DD-MM-YYYY HH:mm:ss'))
  currentTimeRef = moment.utc().add(cityWeather.timezone || 0, 'hour').format('DD-MM-YYYY HH:mm:ss')

  const interval = setInterval(() => {
    currentTimeRef = moment(currentTimeRef, 'DD-MM-YYYY HH:mm:ss').add(1, 's').format('DD-MM-YYYY HH:mm:ss')
    setCurrentTime(currentTimeRef)
  }, 1000)

  return () => {
    clearInterval(interval)
  }
}, [cityWeather])

if (loading) return <div>Loading...</div>

// return (
//   <div style={{ display: 'flex', columnGap: '8px'}}>
//     {listCityWeatherRender}
//   </div>
// )

  return (
    <div className="App" id='app' style={{ background: loading ? ''  : background }}>
      {loading ? <div>Loading...</div> : 
      <>
      <h1>{time.format('YYYY-MM-DD HH:mm:ss')}</h1>
        <div>
          <form action="" className='form' onSubmit={enter}>
            <input  type="text" value={name} onChange={(el)=>{setName(el.target.value)}}/>
            <button style={{display:"none"}}></button>
          </form>
        </div> 

        <div className='country'>
          <h1>{cityWeather.country}, {cityWeather.nation}</h1>
          {/* <p>12:33</p> */}
        </div>

        <div className='country'>
          <h1 style={{ fontSize: '16px'}}>Time: {currentTime}</h1>  
        </div>  

        <div className='temperature'>
            <h1>{cityWeather.temperature}°C</h1>
        </div>

        <div className='weatherlike'>
            <h1>{cityWeather.weather}</h1>
        </div>

        <div className='icon'>
            <div>
              <EyeOutlined className='eyeicon'/>
              <p>{cityWeather.visibility}</p>
            </div>

            <div>
              <FaWind className='windicon'/>
              <p>{cityWeather.speed}m/s</p>
            </div>

            <div>
              <SettingOutlined className='settingicon'/>
              <p id='set'>setting</p>
            </div>
        </div>
      </>}
    </div>
  );
}

export default App;
