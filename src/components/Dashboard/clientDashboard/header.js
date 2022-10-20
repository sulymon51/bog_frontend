import { faBarsStaggered, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
    
    Avatar,
  } from "@material-tailwind/react";
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/actions/authAction';

export default function Header() {
    
    // const [profileDown, setProfileDown] = useState(false)
    const [notifyDown, setNotifyDown] = useState(false)
    
    // function ShowProfile() {
    //     setProfileDown(current => !current)
    //     setNotifyDown(false)
    // }
    function ShowNotify() {
        setNotifyDown(current => !current)
        // setProfileDown(false)
    }

    return (
        <div className="fixed w-full z-50 bg-gray-100">
            <div className="flex lg:head-grid">
                <div className="bg-white py-3  text-center">
                    <img src={require('./images/logo.png')} alt="boglogo" className="w-24 lg:w-32 md:ml-6" />
                </div>
                <div className="shadow bg-white py-4 px-5 flex lg:justify-between justify-end  items-center">
                    
                    <div className=" hidden lg:flex">
                        <FontAwesomeIcon icon={faBarsStaggered} size="2x" className="text-2xl lg:ml-4"  />
                        <p className="ml-5 fw-700 hidden lg:block">Dasboard</p>
                    </div>
                    <div className="flex items-center">
                        <div class="mr-6 relative mx-auto text-gray-600">
                            <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search"/>
                            <button type="submit" class="absolute bg-primary right-0 top-0 py-2 px-4 rounded-r-lg">
                            <FontAwesomeIcon icon={faSearch} className="text-white"  />
                            </button>
                        </div>
                        <div className="relative mx-3">
                            <div onClick={ShowNotify} className="bg-gray-100 px-2 rounded-sm py-1">
                            <FontAwesomeIcon icon={faBell} className="lg:text-xl  text-primary" />
                            <p className="absolute -top-2 left-3/4 border circle px-1 text-white text-xs bg-primary">6</p>
                            </div>
                            {notifyDown && (
                                <div className="absolute bg-white rounded shadow pb-5 w-72 text-start fs-400 -left-64 top-12">
                                    <p className="mb-3 text-white bg-primary py-2 pl-3 text-lg fw-600">Notifications</p>
                                    <p className="my-3 flex">
                                        <img src={require("./images/profile.png")} className="mx-3 w-9" alt="Notify"/>
                                        <div>
                                            <p>New Product is added to Store</p>
                                            <p className="text-gray-500 text-xs">just now</p>
                                        </div>
                                    </p>
                                    <p className="my-5 flex">
                                        <img src={require("./images/profile.png")} className="mx-3 w-9" alt="Notify"/>
                                        <div>
                                            <p>Top deals available</p>
                                            <p className="text-gray-500 text-xs">just now</p>
                                        </div>
                                    </p>
                                    <p className="my-5 flex">
                                        <img src={require("./images/profile.png")} alt="Notify" className="mx-3 w-9"/>
                                        <div>
                                            <p>New Plumber alert</p>
                                            <p className="text-gray-500 text-xs">just now</p>
                                        </div>
                                    </p>
                                    <p className="my-5 flex">
                                        <img src={require("./images/profile.png")} alt="Notify" className="mx-3 w-9"/>
                                        <div>
                                            <p>A new dealer for sharp sand</p>
                                            <p className="text-gray-500 text-xs">just now</p>
                                        </div>
                                    </p>
                                    <p className="my-5 flex">
                                        <img src={require("./images/profile.png")} alt="Notify" className="mx-3 w-9"/>
                                        <div>
                                            <p>House wiring designs available</p>
                                            <p className="text-gray-500 text-xs">just now</p>
                                        </div>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="ml-5">
                        <Avatar src={require('./images/profile.png')} alt="profilelogo" />
                        {/* <Menu>
                                <MenuHandler>
                                    hello
                                    <Avatar src={require('./images/profile.png')} alt="profilelogo" />
                                
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>
                                    menu item 1
                                </MenuItem>
                                <MenuItem>
                                    menu item 2
                                </MenuItem>
                                <MenuItem>
                                    menu item 3
                                </MenuItem>
                                <MenuItem>
                                    menu item 4
                                </MenuItem>
                            </MenuList>
                        </Menu> */}
                        </div>
                        {/* <div className="px-4 pl-6 relative">
                            <img src={require('./images/profile.png')} alt="profilelogo" className="lg:w-12 w-12" onClick={ShowProfile}/>
                            {profileDown && (
                                <div className="absolute bg-white rounded shadow w-40 px-4 py-5 text-end fs-400 -left-3/4 top-16">
                                    <p className="mb-3">New Services</p>
                                    <p className="my-3">Chats</p>
                                    <p className="my-3">Profile</p>
                                    <hr />
                                    <p className="my-3">Settings</p>
                                    <p className="my-3">Sign Out</p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        
        )
}