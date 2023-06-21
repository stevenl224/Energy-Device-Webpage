import React, { useState } from 'react'
import { RiBattery2ChargeLine, RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css'

const Menu = () => (
    <>
    <p><a href='#deviceinfo'>Device Info</a></p>
    <p><a href='#test'>Test</a></p>
    </>
)

const Navbar = () => {
    const[toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className='tesla__navbar'>
        <div className='tesla__navbar-links'>
            <div className='tesla__navbar-links_logo'>
                <RiBattery2ChargeLine color='white' size={27}/>
            </div>
            <div className='tesla__navbar-links_container'>
                <Menu />
            </div>
        </div>
        <div className='tesla__navbar-menu'>
            {toggleMenu
                ? <RiCloseLine color='white' size={27} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color='white' size={27} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu && (
                <div className='tesla__navbar-menu_container scale-up-center'>
                    <div className='tesla__navbar-menu-container-links'>
                        <Menu />
                    </div>
                </div>
            )}
        </div>
        
    </div>
  )
}

export default Navbar