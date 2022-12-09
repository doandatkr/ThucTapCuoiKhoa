import { useState } from 'react'
import styles from './styles.scss'
import {MdSearch} from "react-icons/md"
import {TiWeatherPartlySunny} from "react-icons/ti"

function Header() {
    const [search, setSearch] = useState("")
    const handleChange = (event) => {
        setSearch(event.target.value)

      
    }
    return (
        <header className='header'>
            <div className='logo'>
                <i className='icon__logo'>
                    <TiWeatherPartlySunny />
                </i>
                <span className='logo__name'>Logo name</span>
            </div>
            <form className='search__form'>
                <i className='icon__search'><MdSearch /></i>
                <input className='search' placeholder='Search' value={search} type='text' onChange={handleChange} />
            </form>
            <div className='action'>
                <button>Login</button>
            </div>
        </header>
    )
}
export default Header