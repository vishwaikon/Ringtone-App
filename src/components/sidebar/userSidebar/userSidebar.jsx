import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "../sidebar.css";
import { MdOutlineDashboard, MdOutlinePendingActions } from "react-icons/md";
import { FaItunesNote } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

const UserSidebar = () => {
    const location = useLocation();
    return (
        <div className="sidebar flex flex-col items-center h-[100vh]">
            <div className="logo flex items-center justify-center text-primary font-bold text-3xl w-[300px]">
                Motion Effects
            </div>
            <ul className='flex flex-col gap-5'>
            
                <li>
                    <Link to="/user-dashboard" className={` ${location.pathname === '/user-dashboard' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
                        <MdOutlineDashboard size={"1.5em"} />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to="/user-dashboard/all-songs" className={` ${location.pathname === '/user-dashboard/all-songs' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
                        <FaItunesNote size={"1.5em"} />
                        <p>All songs</p>
                    </Link>
                </li>
                <li>
                    <Link to="/user-dashboard/request-songs" className={` ${location.pathname === '/user-dashboard/request-songs' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
                        <MdOutlinePendingActions size={"1.5em"} />
                        <p>Request songs</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default UserSidebar;
