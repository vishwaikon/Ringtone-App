
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { LuDownloadCloud } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import { FaItunesNote } from "react-icons/fa";

import './statsWidgets.css'
import Songupload from "../forms/songUpload/songupload";

const StatsWidgets = () => {
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);

  function handleUploadClick() {
    setIsUploadFormOpen(true);
  }

  function handleCloseUploadForm() {
    setIsUploadFormOpen(false);
  }

  return (
    <div className="stats-card-container">
      {isUploadFormOpen && <Songupload onClose={handleCloseUploadForm} />}
      <div className="stats-card px-10 py-5 cursor-pointer  bg-primary text-white flex flex-row items-center gap-5"  onClick={handleUploadClick}>
        <FiUploadCloud size={"2em"}/>
        <div className="card-items">
          <h1 className="text-2xl font-medium">Upload</h1>
          <p className="text-sm">new media</p>
        </div>
      </div>
      <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
        <FaItunesNote size={"2em"}/>
        <div className="card-items">
          <h1 className="text-2xl font-medium">140,542</h1>
          <p className="sub-title text-sm">Revenue Songs</p>
        </div>
      </div>
      <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
        <BsMusicNoteList size={"2em"}/>
        <div className="card-items">
          <h1 className="text-2xl font-medium">140,542</h1>
          <p className="sub-title text-sm">All Songs</p>
        </div>
      </div>
      <div className="stats-card px-10 py-5  bg-white text-primary flex flex-row items-center gap-5">
        <LuDownloadCloud size={"2em"}/>
        <div className="card-items">
          <h1 className="text-2xl font-medium">140,542</h1>
          <p className="sub-title text-sm">Download</p>
        </div>
      </div>
    </div>
  );
};

export default StatsWidgets;