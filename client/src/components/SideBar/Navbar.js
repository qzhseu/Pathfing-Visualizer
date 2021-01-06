import React,{useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink, Link}  from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './styles.css';
import { IconContext } from 'react-icons';

import LogoutButton from '../Button/index';

function Navbar(props) {
    const {history ,app}=props;
    // Create a piece of state, and initialize it to `false`,`sidebar` will hold the current value of the state,
    // and `setSidebar` will let us change it
    const [sidebar, setSidebar] = useState(false);
    const showSiderbar = () => setSidebar(!sidebar);
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
          <div className="navbarAdmin">
              <Link to="#" className="menu-bars">
                  <FaIcons.FaBars onClick={showSiderbar}/>
              </Link>
              <LogoutButton history={history} app={app}/>
          </div>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='navmenu__Items'  onClick={showSiderbar}>
                  <li className='navbar-toggle'>
                      <Link to="#" className="menu-bars">
                          <AiIcons.AiOutlineClose/>
                      </Link>
                  </li>
                  {SidebarData.map((item, index)=>{
                      return(
                          <li key={index} className={item.cName}>
                              <NavLink to={item.path}>
                                  {item.icon}
                                  <span class="sidebarSpan">{item.title}</span>
                              </NavLink>
                          </li>
                      )
                  })}
              </ul>
          </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar
