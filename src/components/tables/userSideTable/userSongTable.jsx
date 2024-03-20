import React, { useState, useEffect } from "react";
import axios from 'axios';
import './userSongTable.css';

const UserSongTable = ({ activeISP, updateAllSongsCount, updateTotalRevenue, updateTotalDownloads }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongsWithRevenue = async () => {
      try {
        const storedAID = localStorage.getItem('AID');

        const songsResponse = await axios.get(`http://localhost:5000/songs/artist/${storedAID}`);
        let songsData = songsResponse.data;

        const ringtoneResponse = await axios.get(`http://localhost:5000/ringtones/`);
        const ringtonesData = ringtoneResponse.data;

        const revenueResponse = await axios.get(`http://localhost:5000/revenue/`);
        const revenueData = revenueResponse.data;

        const songsWithRevenue = songsData.map(song => {
          const ringtone = ringtonesData.find(ringtone => ringtone.SID === song.SID);
          if (ringtone) {
            const revenue = revenueData.find(revenue => revenue.RTID === ringtone.RTID);
            return {
              songName: song.songName,
              language: song.language,
              provider: revenue.service_provider || "N/A",
              revenue: revenue.revenue || 0,
              date: revenue.date ? new Date(revenue.date).toLocaleDateString() : "N/A",
              downloads: revenue.downloads || 0
            };
          } else {
            return {
              songName: song.songName,
              language: song.language,
              provider: "N/A",
              revenue: 0,
              date: "N/A",
              downloads: 0
            };
          }
        });

        const filteredSongs = activeISP !== 'All' ? songsWithRevenue.filter(song => song.provider === activeISP) : songsWithRevenue;

        setSongs(filteredSongs);

        updateAllSongsCount(songsData.length);

        const totalRevenue = filteredSongs.reduce((acc, curr) => acc + curr.revenue, 0);
        updateTotalRevenue(totalRevenue);

        const totalDownloads = filteredSongs.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
        updateTotalDownloads(totalDownloads);
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
            {songs.map((song, index) => (
              <tr key={index}>
                <td>{song.songName}</td>
                <td>{song.language}</td>
                <td>{song.provider}</td>
                <td>{song.date}</td>
                <td>{song.downloads}</td>
                <td>Rs.{song.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserSongTable;
