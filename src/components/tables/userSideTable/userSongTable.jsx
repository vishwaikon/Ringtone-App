// import React, { useState, useEffect } from "react";
// import jsonData from "../../../data/artistallsongs.json";

// import './userSongTable.css'
// import axios from 'axios';

// const UserSongTable = ({ activeISP }) => {
//   const [tableData, setTableData] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [selectedFilter, setSelectedFilter] = useState("All");
 
//   const filters = {
//     All: () => true,
//     Week: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastWeek = new Date();
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return renewalDate >= lastWeek;
//     },
//     Month: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return renewalDate >= lastMonth;
//     },
//     Last3Months: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastThreeMonths = new Date();
//       lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
//       return renewalDate >= lastThreeMonths;
//     },
//     Year: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastYear = new Date();
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return renewalDate >= lastYear;
//     },
//   };
  
//   useEffect(() => {
//     axios.get('http://localhost:5000/songs')
//     .then(res => {
//       const responseData = res.data;
//       const filteredData = responseData.filter((song) => {
//         return (
//           (activeISP === "All" || song[activeISP.toLowerCase()] !== undefined) &&
//           filters[selectedFilter](song)
//         );
//       });
  
//       setTableData(filteredData);
//       setTotalRevenue(calculateTotalRevenue(filteredData));
//     })
//     .catch(err => console.log(err));
//   }, [activeISP, selectedFilter]);
      

//       const calculateTotalRevenue = (song) => {
//         if (activeISP === "All") {
//           const dialogRevenue = parseInt(song?.dialog?.replace(",", "") || 0, 10);
//           const moitelRevenue = parseInt(song?.mobitel?.replace(",", "") || 0, 10);
//           const airtelRevenue = parseInt(song?.airtel?.replace(",", "") || 0, 10);
//           const hutchRevenue = parseInt(song?.hutch?.replace(",", "") || 0, 10);
      
//           return dialogRevenue + moitelRevenue + airtelRevenue + hutchRevenue;
//         } else {
//           return parseInt(song?.[activeISP.toLowerCase()]?.replace(",", "") || 0, 10);
//         }
//       };
      
//       const handleFilterClick = (filter) => {
//         setSelectedFilter(filter);
//       };

//       return (
//         <>
//         <div className="filter-section flex items-center justify-between">
//                 <h1 className="font-bold text-xl">Song Renewal</h1>
//                 <div className="flex gap-5 font-bold">
//                 {Object.keys(filters).map((filter) => (
//                     <p
//                     key={filter}
//                     className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
//                     onClick={() => handleFilterClick(filter)}
//                     >
//                     {filter}
//                     </p>
//                 ))}
//                 </div>
//             </div>
//         <div className="table-section">
//           <table className="table">
//             <thead>
//               <tr>
//                 {/*<th>Artist Name</th>*/}
//                 <th>Song Name</th>
//                 <th>Language</th>
//                 <th>Song Download</th>
//                 <th>Song Renewal</th>
//                 <th>Rev Downloads</th>
//                 <th>Total Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((song, index) => (
//                 <tr key={index} className="bg-[#EEEEEE]">
//                   {/*<td>{song.artistName}</td>*/}
//                   <td>{song.songName}</td>
//                   <td>{song.language}</td>
//                   <td>{song.songDownload}</td>
//                   <td>{song.songRenewal}</td>
//                   <td>{song.revenueByDownloads}</td>
//                   <td>{calculateTotalRevenue(song)} $</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         </>
//       );
//     };


// export default UserSongTable;


import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserSongTable = () => {
  const [songs, setSongs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/songs/artist/${localStorage.getItem('AID')}`);
        setSongs(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs(); // Fetch songs when the component mounts
  }, []);

  const filters = {
    All: () => true,
    Week: (song) => {
      const renewalDate = new Date(song.songRenewal);
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return renewalDate >= lastWeek;
    },
    Month: (song) => {
      const renewalDate = new Date(song.songRenewal);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return renewalDate >= lastMonth;
    },
    Last3Months: (song) => {
      const renewalDate = new Date(song.songRenewal);
      const lastThreeMonths = new Date();
      lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
      return renewalDate >= lastThreeMonths;
    },
    Year: (song) => {
      const renewalDate = new Date(song.songRenewal);
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return renewalDate >= lastYear;
    },
  };

  useEffect(() => {
    if (localStorage.getItem('AID')) {
      axios.get(`http://localhost:5000/songs/artist/${localStorage.getItem('AID')}`)
        .then(res => {
          const responseData = res.data;
          const filteredData = responseData.data.filter((song) => {
            return (
              (selectedFilter === "All" || filters[selectedFilter](song))
            );
          });
          setSongs(filteredData);
        })
        .catch(error => {
          console.error('Error fetching songs:', error);
        });
    }
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <div className="filter-section flex items-center justify-between">
        <h1 className="font-bold text-xl">Song Renewal</h1>
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
        <table className="table">
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Language</th>
              <th>Song Download</th>
              <th>Song Renewal</th>
              <th>Rev Downloads</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.SID} className="bg-[#EEEEEE]">
                <td>{song.songName}</td>
                <td>{song.language}</td>
                <td>{song.artistName}</td>
                <td>{song.renewal}</td>
                <td>{song.revDownloads}</td>
                <td>{song.totalRevenue}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserSongTable;






// import React, { useState, useEffect } from "react";
// import jsonData from "../../../data/artistallsongs.json";
// import './userSongTable.css'
// import axios from 'axios';

// const UserSongTable = ({ activeISP, loggedInArtistAID }) => {
//   const [tableData, setTableData] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [selectedFilter, setSelectedFilter] = useState("All");
 
//   const filters = {
//     All: () => true,
//     Week: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastWeek = new Date();
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return renewalDate >= lastWeek;
//     },
//     Month: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return renewalDate >= lastMonth;
//     },
//     Last3Months: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastThreeMonths = new Date();
//       lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
//       return renewalDate >= lastThreeMonths;
//     },
//     Year: (song) => {
//       const renewalDate = new Date(song.songRenewal);
//       const lastYear = new Date();
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return renewalDate >= lastYear;
//     },
//   };
  
//   useEffect(() => {
//     // Check if the logged-in artist AID is available
//     if (loggedInArtistAID) {
//       axios.get(`http://localhost:5000/songs/artist/${loggedInArtistAID}`)
//         .then(res => {
//           const responseData = res.data;
//           const filteredData = responseData.filter((song) => {
//             return (
//               (activeISP === "All" || song[activeISP.toLowerCase()] !== undefined) &&
//               filters[selectedFilter](song)
//             );
//           });

//           setTableData(filteredData);
//           setTotalRevenue(calculateTotalRevenue(filteredData));
//         })
//         .catch(err => console.log(err));
//         console.log("error")
//     }
//   }, [activeISP, selectedFilter, loggedInArtistAID]);
      

//       const calculateTotalRevenue = (song) => {
//         if (activeISP === "All") {
//           const dialogRevenue = parseInt(song?.dialog?.replace(",", "") || 0, 10);
//           const moitelRevenue = parseInt(song?.mobitel?.replace(",", "") || 0, 10);
//           const airtelRevenue = parseInt(song?.airtel?.replace(",", "") || 0, 10);
//           const hutchRevenue = parseInt(song?.hutch?.replace(",", "") || 0, 10);
      
//           return dialogRevenue + moitelRevenue + airtelRevenue + hutchRevenue;
//         } else {
//           return parseInt(song?.[activeISP.toLowerCase()]?.replace(",", "") || 0, 10);
//         }
//       };
      
//       const handleFilterClick = (filter) => {
//         setSelectedFilter(filter);
//       };

//       return (
//         <>
//           <div className="filter-section flex items-center justify-between">
//             <h1 className="font-bold text-xl">Song Renewal</h1>
//             <div className="flex gap-5 font-bold">
//               {Object.keys(filters).map((filter) => (
//                 <p
//                   key={filter}
//                   className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
//                   onClick={() => handleFilterClick(filter)}
//                 >
//                   {filter}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <div className="table-section">
//             <table className="table">
//               <thead>
//                 <tr>
//                   {/* <th>Artist Name</th> */}
//                   <th>Song Name</th>
//                   <th>Language</th>
//                   <th>Song Download</th>
//                   <th>Song Renewal</th>
//                   <th>Rev Downloads</th>
//                   <th>Total Revenue</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((song, index) => (
//                   <tr key={index} className="bg-[#EEEEEE]">
//                     {/* <td>{song.artistName}</td> */}
//                     <td>{song.songName}</td>
//                     <td>{song.language}</td>
//                     <td>{song.songDownload}</td>
//                     <td>{song.songRenewal}</td>
//                     <td>{song.revenueByDownloads}</td>
//                     <td>{calculateTotalRevenue(song)} $</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       );
//     };      
// export default UserSongTable;