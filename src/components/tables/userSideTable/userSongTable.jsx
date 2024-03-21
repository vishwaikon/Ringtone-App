import React, { useState, useEffect } from "react";
import axios from 'axios';
import './userSongTable.css';

const UserSongTable = ({ activeISP, updateAllSongsCount, updateTotalRevenue, updateTotalDownloads }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongsWithRevenue = async () => {
      try {
        const storedAID = localStorage.getItem('AID');

        // Fetch songs
        const songsResponse = await axios.get(`http://localhost:5000/songs/artist/${storedAID}`);
        const songsData = songsResponse.data;

        // Fetch revenue
        const revenueResponse = await axios.get(`http://localhost:5000/revenue/`);
        const revenueData = revenueResponse.data;

        // Merge songs with revenue using SID
        const mergedData = [];
        songsData.forEach(song => {
          const songRevenue = revenueData.filter(revenue => revenue.SID === song.SID);
          songRevenue.forEach(revenue => {
            mergedData.push({
              songName: song.songName,
              language: song.language,
              provider: revenue.service_provider || "N/A",
              revenue: revenue.revenue || 0,
              date: revenue.date ? new Date(revenue.date).toLocaleDateString() : "N/A",
              downloads: revenue.downloads || 0
            });
          });
        });

        // Filter songs based on activeISP
        const filteredSongs = activeISP !== 'All' ? mergedData.filter(song => song.provider === activeISP) : mergedData;

        // Set songs state
        setSongs(filteredSongs);

        // Update counts and revenue
        updateAllSongsCount(filteredSongs.length);
        const totalRevenue = filteredSongs.reduce((acc, curr) => acc + curr.revenue, 0);
        updateTotalRevenue(totalRevenue.toLocaleString());
        const totalDownloads = filteredSongs.reduce((acc, curr) => acc + curr.downloads, 0);
        updateTotalDownloads(totalDownloads.toLocaleString());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongsWithRevenue();
  }, [activeISP, updateAllSongsCount, updateTotalRevenue, updateTotalDownloads]);

  return (
    <>
      <div className="filter-section flex items-center justify-between">
        <h1 className="font-bold text-xl">Song Revenue</h1>
      </div>
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
                <td>{song.downloads.toLocaleString()}</td>
                <td>Rs.{song.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserSongTable;
