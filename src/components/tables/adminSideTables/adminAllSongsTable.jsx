import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IoMdDownload } from "react-icons/io";

import './adminSongTable.css';

const AllSongTable = ({ activeISP, updateAllSongsCount, updateTotalRevenue, updateTotalDownloads }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongsWithRevenue = async () => {
      try {

        // Fetch songs
        const songsResponse = await axios.get(`http://localhost:5000/songs/`);
        const songsData = songsResponse.data;

        // Fetch revenue
        const revenueResponse = await axios.get(`http://localhost:5000/revenue/`);
        const revenueData = revenueResponse.data;

        // Merge songs with revenue using SID
        const mergedData = [];
        songsData.forEach(song => {
          // Find revenue data for the current song
          const songRevenue = revenueData.filter(revenue => revenue.SID === song.SID);
          if (songRevenue.length === 0) {
            // If no revenue data found, populate with placeholders
            mergedData.push({
              songName: song.songName,
              language: song.language,
              provider: "N/A",
              revenue: "N/A",
              date: "N/A",
              downloads: "N/A"
            });
          } else {
            // Otherwise, merge song with revenue data
            songRevenue.forEach(revenue => {
              mergedData.push({
                songName: song.songName,
                language: song.language,
                provider: revenue.service_provider || "N/A",
                revenue: revenue.revenue || "N/A",
                date: revenue.date ? new Date(revenue.date).toLocaleDateString() : "N/A",
                downloads: revenue.downloads || "N/A"
              });
            });
          }
        });

        // Filter songs based on activeISP
        const filteredSongs = activeISP !== 'All' ? mergedData.filter(song => song.provider === activeISP) : mergedData;

        // Set songs state
        setSongs(filteredSongs);

        // Update counts and revenue
        updateAllSongsCount(filteredSongs.length);
        const totalRevenue = filteredSongs.reduce((acc, curr) => acc + curr.revenue, 0);
        updateTotalRevenue(totalRevenue);
        const totalDownloads = filteredSongs.reduce((acc, curr) => acc + curr.downloads, 0);
        updateTotalDownloads(totalDownloads);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongsWithRevenue();
  }, [activeISP, updateAllSongsCount, updateTotalRevenue, updateTotalDownloads]);

  const handleDownload = () => {
    const mp3FilePath = '../../../Backend/src/Songs/Adeesha Tharud/adeesh.mp3';
  
    const anchor = document.createElement('a');
    anchor.href = mp3FilePath;
    anchor.download = 'test.mp3';
  
    anchor.click();
  };

  return (
    <>
      <div className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Language</th>
              <th>Provider</th>
              <th>Date</th>
              <th>Downloads</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {songs.slice().reverse().map((song, index) => (
              <tr key={index}>
                <td>{song.songName}</td>
                <td>{song.language}</td>
                <td>{song.provider}</td>
                <td>{song.date}</td>
                <td>{song.downloads}</td>
                <td>Rs.{song.revenue}</td>
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
