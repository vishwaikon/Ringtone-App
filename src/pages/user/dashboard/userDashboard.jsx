import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { LuDownloadCloud } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import { FaItunesNote } from "react-icons/fa";

import Songupload from "../../../components/forms/songUpload/songupload";
import FilterByISP from '../../../components/filters/filterbyisp/filterbyisp';
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';
import UserSongTable from '../../../components/tables/userSideTable/userSongTable';

import './userDashboard.css';

const UserDashboard = () => {
  const [activeISP, setActiveISP] = useState('All');
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [allSongsCount, setAllSongsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {
    // Function to update all songs count
    const updateAllSongsCount = (count) => {
      setAllSongsCount(count);
    };

    // Function to update total revenue
    const updateTotalRevenue = (revenue) => {
      setTotalRevenue(revenue);
    };

    // Function to update total downloads
    const updateTotalDownloads = (downloads) => {
      setTotalDownloads(downloads);
    };

  }, []);

  function handleUploadClick() {
    setIsUploadFormOpen(true);
  }

  function handleCloseUploadForm() {
    setIsUploadFormOpen(false);
  }

  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='stact-container'>
        <div className="stats-card-container">
          {isUploadFormOpen && <Songupload onClose={handleCloseUploadForm} />}
          <div className="stats-card px-10 py-5 cursor-pointer  bg-primary text-white flex flex-row items-center gap-5" onClick={handleUploadClick}>
            <FiUploadCloud size={"2em"}/>
            <div className="card-items">
              <h1 className="text-2xl font-medium">Upload</h1>
              <p className="text-sm">new media</p>
            </div>
          </div>
          <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
            <FaItunesNote size={"2em"}/>
            <div className="card-items">
              <h1 className="text-2xl font-medium">{totalRevenue}</h1>
              <p className="sub-title text-sm">Revenue</p>
            </div>
          </div>
          <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
            <BsMusicNoteList size={"2em"}/>
            <div className="card-items">
              <h1 className="text-2xl font-medium">{allSongsCount}</h1>
              <p className="sub-title text-sm">Songs</p>
            </div>
          </div>
          <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
            <LuDownloadCloud size={"2em"}/>
            <div className="card-items">
              <h1 className="text-2xl font-medium">{totalDownloads}</h1>
              <p className="sub-title text-sm">Downloads</p>
            </div>
          </div>
        </div>
      </div>
      <div className='filter-container flex justify-between'>
        <FilterByISP setActiveISP={setActiveISP} />
        <div className='filter-search flex gap-5'>
          {/*<FilterSearch spanText="Filter by Songs" inputPlaceholder="Type to filter..." />*/}
        </div>
      </div>
      <div className='table-container flex flex-col gap-5'>
        <UserSongTable activeISP={activeISP} updateAllSongsCount={setAllSongsCount} updateTotalRevenue={setTotalRevenue} updateTotalDownloads={setTotalDownloads} />
      </div>
    </div>
  );
};

export default UserDashboard;
