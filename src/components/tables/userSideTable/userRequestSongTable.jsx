import React, { useState, useEffect } from "react";
import axios from 'axios';

import './userSongTable.css'

const UserRequestTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userAID, setUserAID] = useState("");

  const fetchTableData = async () => {
    try {
      // Fetch user's AID from localStorage
      const storedAID = localStorage.getItem('AID');
      setUserAID(storedAID);

      // Fetch songs associated with the user's AID
      const songsResponse = await axios.get(`http://localhost:5000/songs/artist/${storedAID}`);
      const ringtonesResponse = await axios.get('http://localhost:5000/ringtones');

      const songsData = songsResponse.data;
      const ringtonesData = ringtonesResponse.data;

      console.log("Songs Data:", songsData);
      console.log("Ringtones Data:", ringtonesData);

      const mergedData = [];

      songsData.forEach(song => {
        const correspondingRingtones = ringtonesData.filter(ringtone => ringtone.SID === song.SID);
        console.log("correspondingRingtones Data:", correspondingRingtones);
        
        correspondingRingtones.forEach(ringtone => {
          const rowData = {
            ...song,
            dialog: ringtone.Dialog !== null ? 'published' : 'pending',
            hutch: ringtone.Hutch !== null ? 'published' : 'pending',
            airtel: ringtone.Airtel !== null ? 'published' : 'pending',
            mobitel: ringtone.Mobitel !== null ? 'published' : 'pending'
          };
          mergedData.push(rowData);
        });

        if (correspondingRingtones.length === 0) {
          const defaultRow = {
            ...song,
            dialog: 'pending',
            hutch: 'pending',
            airtel: 'pending',
            mobitel: 'pending'
          };
          mergedData.push(defaultRow);
        }
      });

      setTableData(mergedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchTableData();
  }, []);

  const filters = {
    All: () => true,
    Week: (song) => {
      const requestDate = new Date(song.requestDate);
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return requestDate >= lastWeek;
    },
    Month: (song) => {
      const requestDate = new Date(song.requestDate);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return requestDate >= lastMonth;
    },
    Last3Months: (song) => {
      const requestDate = new Date(song.requestDate);
      const lastThreeMonths = new Date();
      lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
      return requestDate >= lastThreeMonths;
    },
    Year: (song) => {
      const requestDate = new Date(song.requestDate);
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return requestDate >= lastYear;
    },
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <div className="filter-section flex items-center justify-between">
        <h1 className="font-bold text-xl">Song Requests</h1>
        <div className="flex gap-5 font-bold">
          {Object.keys(filters).map((filter) => (
            <p
              key={filter}
              className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </p>
          ))}
        </div>
      </div>
      <div className="table-section">
        <table className="table userRequestTable">
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Request Date</th>
              <th>Mobitel</th>
              <th>Dialog</th>
              <th>Hutch</th>
              <th>Airtel</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((song, index) => (
              <tr key={index}>
                <td>{song.songName}</td>
                <td>{song.createdDate? new Date(song.createdDate).toLocaleDateString() : "N/A"}</td>
                <td>{song.mobitel}</td>
                <td>{song.dialog}</td>
                <td>{song.hutch}</td>
                <td>{song.airtel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserRequestTable;
