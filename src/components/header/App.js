
import './App.css';
import { useMemo, useState } from 'react';
import {EyeOutlined,SettingOutlined, TeamOutlined} from '@ant-design/icons'
import  {FaWind} from 'react-icons/fa'
import { useEffect } from 'react';
import { WeatherData } from './mock-data/weather'


function App() {
  // const [data,setData]=useState({})
  const [name,setName]=useState('hanoi')

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
    speed: ''
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
/**xuat ra mot list api 
  const [listCityWeather, setListCityWeather] = useState([])

  const listCityWeatherRender = listCityWeather.map((el) => {
    const backgroundImage = el.temperature < 25 ? `url(${backgroundList.cold})` : el.temperature < 29 ? `url(${backgroundList.warm})` : `url(${backgroundList.hot})`
    return <div className="App" style={{ background: backgroundImage }} key={el.country}>
    {loading ? <div>Loading...</div> : 
    <>
      <div className='country'>
        <h1>{el.country}, {el.nation}</h1>
        {/* <p>12:33</p> }
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
  */
  const mapData = (data) => {
    setCityWeather({
      country: data.name,
      nation: data.sys.country,
      temperature: data.main.temp.toFixed(0) - 273,
      weather: data.weather[0].description,
      visibility: data.visibility,
      speed: data.wind.speed
    })
  }
 

useEffect(()=>{
  /**
   * tự tạo api
  // setTimeout(() => {
  //   const data = WeatherData.find(el => el.country.toLowerCase().includes(name)) || {}
  //   setCityWeather(data)
  //   setLoading(false)
  // }, 1000)

 * list api
 * setTimeout(() => {
   setListCityWeather(WeatherData)
   setLoading(false)
   }, 3000)
 */
  // call api
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=ha noi&appid=db677b200cd5a8c9358a46b3b02e2155`)
  .then((res)=>res.json())
  .then(res=>{
    setTimeout(() => {
      setLoading(false)
      mapData(res)
      
    }, 1000);
   })
},[])

useEffect(()=>{
  
},[cityWeather.temperature])

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
