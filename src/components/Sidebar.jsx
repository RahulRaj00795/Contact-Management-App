import React from 'react'
import './Sidebar.css'
import Logo from "../assets/red-grape-icon-logo-w.svg";
import SearchIcon from "../assets/rename.svg";
import Clock from "../assets/clock.svg";
import Home from "../assets/home.svg";
import Navigator from "../assets/navigator.svg";
import ContactCard from "../assets/card.svg";
import Desktop from "../assets/desk-game.svg";
import Users from "../assets/multi-user.svg";
import PhoneBook from "../assets/phonebook.svg";
import Language from "../assets/rit-arrow.svg";
import Book from "../assets/book-read.svg";
import Build from "../assets/build-2.svg";
import Graph from "../assets/graphh.svg";
import RightArrow from "../assets/rit-a.svg";

const Sidebar = () => {
    return (
        <div className='side'>
            <div className='box1'>
                <img src={Logo} alt="logo" className='logo' />
                <img src={SearchIcon} alt="logo" className='log' />
                <img src={Clock} alt="logo" className='log' />
            </div>
            <div className='box2'>
                <img src={Home} alt="logo" className='log-m' />
                <img src={Navigator} alt="logo" className='log-m' />
                <img src={ContactCard} alt="logo" className='log-m' />
                <img src={Desktop} alt="logo" className='log-m' />
                <img src={Users} alt="logo" className='log-m' />
                <img src={PhoneBook} alt="logo" className='log-m' />
                <img src={Language} alt="logo" className='log-m' />
                <img src={Book} alt="logo" className='log-m' />
                <img src={Build} alt="logo" className='log-m' />
                <img src={Graph} alt="logo" className='log-m' />

            </div>
            <div className='box3'>
                <img src={RightArrow} alt="logo" className='log-e' />
            </div>
        </div>
    )
}

export default Sidebar
