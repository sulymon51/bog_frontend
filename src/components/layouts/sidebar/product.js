import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsCameraVideo, BsFillGrid1X2Fill, BsBell, BsGear, BsReceiptCutoff, BsBoxArrowRight } from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";
import { RiUserAddLine } from "react-icons/ri"
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";


const ProductSidebar = () => {
    const dispatch = useDispatch();
    const [showSideBar, setShowSideBar] = useState(true);
    const auth = useSelector((state) => state.auth);
    console.log(auth.user);

    const activeStyle = {
        backgroundColor: "#3F79AD",
        borderRadius: "5px",
        color: "white"
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
        }
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
                <div className="fixed z-20 bg-white fs-500 top-20 grid items-between w-6/12 lg:sidebar-w shadow min-h-screen pt-2 px-2">
                    <div>
                        <NavLink
                            to=""
                            className="w-full flex items-center pl-2 py-2 fw-600"
                            
                            onClick={unShow}
                        >
                            <BsFillGrid1X2Fill className="text-xl" />
                            <p className="pl-3"> Dashboard</p>
                        </NavLink>
                        <NavLink
                            to="order"
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            onClick={unShow}
                        >
                            <BsReceiptCutoff className="text-xl" />
                            <p className="pl-3">Products</p>
                        </NavLink>
                        <NavLink 
                            to="orders"
                            onClick={unShow}
                            className={(navData) => navData.isActive ? 'bg-primary text-primary' : 'text-black' }
                            >
                            <div className="w-full flex items-center pl-2 my-4 py-2 fw-600 hover:bg-primary hover:text-white hover:rounded">
                                <RiUserAddLine className="text-lg" />
                                <p className="pl-3">Orders Requests</p>
                            </div>
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
                            to="history"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <VscHistory className="text-xl" />
                            <p className="pl-3">History</p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            to="help"
                            onClick={unShow}
                            className="w-full flex items-center pl-2 py-2 fw-600 my-4"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                            <FontAwesomeIcon icon={faQuestionCircle} className="pr-3 pl-1 text-lg" />
                                Help
                        </NavLink>
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
                                onClick={() => dispatch(logout())}
                                className="w-full py-2 fw-600 pl-2 flex my-2  rounded-lg">
                                <BsBoxArrowRight className="text-xl" />
                                <p className="pl-3">Sign Out</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ProductSidebar;