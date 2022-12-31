import { useState } from 'react';
import MobileMenuButton from '../MobileMenuButton/MobileMenuButton'
import {Link} from 'react-router-dom' 
import logout from '../../api/logout'
import logo from '../../assets/EstateFinder.png'
import './Header.module.css'
import Style from './Header.module.css'
import { UserContext } from '../../App';
import { useContext } from 'react';


export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false)
  const {userData,refetch} = useContext(UserContext)
  const toggle = () => setIsOpen(!isOpen)
  
  const onLogout = async () => {
    await logout();
    refetch();
  }
  return (
    <>
        <header>
            <Link to="/"><img src={logo} alt="EstateFinder" /></Link>
            <MobileMenuButton toggle={toggle}/>
            <nav className={Style.navbarMenu}>
              <Link to={'/'}>Home</Link>
              {userData && <Link to={`/profile/${userData.username}`}>Profile</Link>}
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
              {userData && <p onClick={()=>onLogout()}>Logout</p>}
            </nav>
        </header>

        <nav className={isOpen ? Style.navbar : Style.navbarClosed}>
          <Link to={'/'}>Home</Link>
          {userData && <Link to={`/profile/${userData.id}`}>Profile</Link>}
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          {userData && <Link onClick={()=>onLogout()} to={'/login'}>Logout</Link>}
        </nav>
    </>
  )
}
