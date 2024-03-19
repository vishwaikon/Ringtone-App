import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import "../sidebar.css";
import { MdOutlineDashboard, MdOutlinePendingActions, MdOutlineUploadFile } from "react-icons/md";
import { FaItunesNote, FaList } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { TbUsersPlus } from "react-icons/tb";
import { CiSearch, CiBoxList } from "react-icons/ci";
import Csvupload from '../../forms/csvUpload/csvupload';
import Usercreate from '../../forms/userCreate/usercreate';

const AdminSidebar = () => {
    const location = useLocation();
    const [isCsvUploadOpen, setIsCsvUploadOpen] = useState(false);
    const [isUserCreateOpen, setIsUserCreateOpen] = useState(false);

    const toggleCsvUpload = () => {
        setIsCsvUploadOpen(!isCsvUploadOpen);
    };

    const toggleUserCreate = () => {
      setIsUserCreateOpen(!isUserCreateOpen);
  };

  return (
    <div className="sidebar flex flex-col items-center h-[100vh]">
        <div className="logo flex items-center justify-center text-primary font-bold text-3xl w-[300px]">
            Motion Effects
        </div>
      <ul className='flex flex-col gap-5'>
        <div div className="hidden searchbar cursor-pointer overflow-hidden p-1 flex bg-[#EEEEEE] search rounded-3xl ">
            <CiSearch className='icon' size={"2em"} color="#7E40CD" />
            <input
                type="text"
                className="search-bar bg-[#EEEEEE] text-center text-lg text-[#00000070] outline-none"
                placeholder="Search"
            />
        </div>
        <li>
          <Link to="/admin-dashboard" className={` ${location.pathname === '/admin-dashboard' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
            <MdOutlineDashboard size={"1.5em"} />
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/all-songs" className={` ${location.pathname === '/all-songs' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
            <FaItunesNote size={"1.5em"} />
            <p>All songs</p>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/request-songs" className={` ${location.pathname === '/request-songs' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
            <MdOutlinePendingActions size={"1.5em"} />
            <p>Request songs</p>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/artist-list" className={` ${location.pathname === '/artist-list' ? 'active' : ''} flex items-center rounded-xl p-2 gap-5`}>
            <FaList size={"1.5em"} />
            <p>Artist List</p>
          </Link>
        </li>
        <li>
          <p className='border-primary border font-medium text-primary cursor-pointer hover:bg-primary hover:text-white flex items-center rounded-xl p-2 gap-5' onClick={toggleCsvUpload}>
            <MdOutlineUploadFile size={"1.5em"} />
            <p>Upload CSV</p>
          </p>
        </li>
        <li>
          <p className='border-primary border font-medium text-primary cursor-pointer hover:bg-primary hover:text-white flex items-center rounded-xl p-2 gap-5' onClick={toggleUserCreate}>
            <TbUsersPlus size={"1.5em"} />
            <p>Create Artist</p>
          </p>
        </li>
        {isCsvUploadOpen && <Csvupload onClose={toggleCsvUpload} />}
        {isUserCreateOpen && <Usercreate onClose={toggleUserCreate} />}
      </ul>
    </div>
  );
};

export default AdminSidebar;