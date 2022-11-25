import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsCameraVideo, BsFillGrid1X2Fill, BsBell, BsGear, BsReceiptCutoff, BsBoxArrowRight} from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";
import { RiArrowDropDownFill } from "react-icons/ri"
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";


const ServiceSidebar = () => {
    const [signOut, setSignOut] = useState(false);
    function CloseModal() {
        setSignOut(false)
    }
    const dispatch = useDispatch();
    const [showSideBar, setShowSideBar] = useState(true);
    const auth = useSelector((state) => state.auth);
    console.log(auth.user);

    const [productDrop, setProductDrop] = useState(false);

    const activeStyle = {
        backgroundColor: "rgba(234, 245, 255, 1)",
        color: "rgba(63, 121, 173, 1)",
        borderRight: "6px solid rgba(63, 121, 173, 1)"
    };
    useEffect(() => {

        function handleResize() {
            if (window.innerWidth < 900) {
                setShowSideBar(false);
            } else {
                setShowSideBar(true);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);


    }, []);

    function unShow() {
        
        if (window.innerWidth < 900) {
            setShowSideBar(false);
        } else {
            setShowSideBar(true);
        };
        
    }
    const sideBarStyle = {
        cursorStyle: {
            cursor: "pointer"
        }
    }

    return (
        <div>
            <div>
                <FontAwesomeIcon icon={faBarsStaggered} className="text-2xl fixed top-6 z-50 menu-btn lg:hidden" onClick={() => {
                    setShowSideBar(current => !current);
                }} />
            </div>
            {showSideBar && (
                <div className="fixed z-20 bg-white fs-500 top-20 grid items-between w-6/12 lg:sidebar-w shadow min-h-screen pt-2 px-2" onClick={() => setProductDrop(false)}>
                    <div>
                        <NavLink
                            to=""
                            className="w-full flex items-center pl-2 py-2 fw-600"
                            
                            onClick={unShow}
                        >
                            <BsFillGrid1X2Fill className="text-xl" />
                            <p className="pl-3"> Dashboard</p>
                        </NavLink>
                        <div
                            
                            className="w-full items-center pl-2 py-2 fw-600 my-4"
                            onClick={unShow}
                        >
                            <div className="flex" onClick={e => e.stopPropagation()}>
                                <BsReceiptCutoff className="text-xl" />
                                <div className="flex items-center cursor-pointer" onClick={() => {setProductDrop(!productDrop)}}>
                                    <p className="pl-3 pr-5">Projects</p>
                                    <RiArrowDropDownFill className="text-black text-xl"/>
                                </div>
                            </div>
                            {productDrop && (
                                <div className="lg:ml-9 ml-4 fs-400 pt-2">
                                    <NavLink
                                        to="projects"
                                        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                        >
                                        <p className="py-2">My Projects</p>
                                    </NavLink>
                                    <NavLink
                                        to="allprojects"
                                        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                        >
                                        <p className="py-2">Available Projects</p>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <NavLink 
                            to="inbox"
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            onClick={unShow}
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                <MdOutlineEmail className="text-lg" />
                                <p className="pl-3">Inbox</p>
                        </NavLink>
                        <NavLink 
                            to="meetings"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <BsCameraVideo className="text-xl " />
                            <p className="pl-3">Meetings</p>
                        </NavLink>
                        <NavLink 
                            to="notify"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <BsBell className="text-xl" />
                            <p className="pl-3">Notification</p>
                            
                        </NavLink>
                        <NavLink 
                            to="transact"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <VscHistory className="text-xl" />
                            <p className="pl-3">Transactions</p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            to="settings"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <BsGear className="text-xl" />
                            <p className="pl-3">Settings</p>
                        </NavLink>
                        <NavLink>
                            <div
                                style={sideBarStyle.cursorStyle}
                                onClick={ () => setSignOut(true)}
                                className="w-full py-2 fw-600 pl-2 flex my-2  rounded-lg">
                                <BsBoxArrowRight className="text-lg" />
                                <p className="pl-3">Sign Out</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            )}
            {signOut && (
                <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
                    <div className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani px-5" onClick={e => e.stopPropagation()}>
                        <div className="lg:px-6">
                            <div className="flex text-xl fw-600">
                                <p className="pr-4 text-red-600"><HiOutlineLogout/></p>
                                <p>Sign Out ?</p>
                            </div>
                            <p>Are you sure you want to sign out ?</p>
                        </div>
                        <div className="text-end px-4 my-5">
                            <button className="btn py-1 border-pri text-primary" onClick={CloseModal}>No</button>
                            <button className="btn py-1 ml-5 border border-red-600 text-red-600" onClick={() => dispatch(logout())}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ServiceSidebar;