import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IoMdDownload } from "react-icons/io";

import './adminSongTable.css';

const AllSongTable = ({ activeISP, songTitleFilter, artistNameFilter }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongsWithRevenue = async () => {
      try {
        // Fetch combined data from the new endpoint
        const response = await axios.get(`http://localhost:5000/revenue/total_revenueByServiceProvider`);
        const data = response.data;

        // Filter songs based on activeISP
        let filteredSongs = data;
        if (activeISP !== 'All') {
          filteredSongs = data.filter(song => song.service_provider === activeISP);
        }

        // Filter songs by song title
        if (songTitleFilter) {
          filteredSongs = filteredSongs.filter(song => song.songName.toLowerCase().includes(songTitleFilter.toLowerCase()));
        }

        // Filter songs by artist name
        if (artistNameFilter) {
          filteredSongs = filteredSongs.filter(song => song.artistName.toLowerCase().includes(artistNameFilter.toLowerCase()));
        }

        // Set songs state
        setSongs(filteredSongs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongsWithRevenue();
  }, [activeISP, songTitleFilter, artistNameFilter]);

  const handleDownload = () => {
    const mp3FilePath = '/songs/adeesh.mp3';
  
    const anchor = document.createElement('a');
    anchor.href = mp3FilePath;
    anchor.download = 'Ringtoon.mp3';
  
    anchor.click();
  };

  return (
    <>
      <div className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>Song Title</th>
              <th>Artist Name</th>
              <th>Language</th>
              <th>Provider</th>
              <th>Downloads</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {songs.slice().reverse().map((song, index) => (
              <tr key={index}>
                <td>{song.songName}</td>
                <td>{song.artistName}</td>
                <td>{song.language}</td>
                <td>{song.service_provider}</td>
                <td>{song.total_downloads}</td>
                <td>Rs.{song.total_revenue}</td>
                <td><button className="hover:text-green-500" onClick={handleDownload}><IoMdDownload /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllSongTable;
