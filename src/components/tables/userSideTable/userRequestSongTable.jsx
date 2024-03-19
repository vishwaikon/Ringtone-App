// import React, { useState, useEffect } from "react";
// import jsonData from "../../../data/requestsongs.json";
// import axios from 'axios';

// import './userSongTable.css'

// const UserRequestTable = () => {

//   const [data, setData] = useState([])
//   useEffect(() => {
//     axios.get('http://localhost:5000/ringtones/3')
//     .then(res => setData(res.data))
//     .catch(err=> console.log(err));
    
//   },[]);
 
//   return (
//     <div className="table-section">
//           <table className="table">
//             <thead>
//               <tr>
                
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Owner ID</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((song, index) => (
//                 <tr key={index} className="bg-[#EEEEEE]">
//                   <td>{song.RTID}</td>
//                   <td>{song.SID}</td>
//                   <td>{song.Mobitel}</td>
//                   <td>{song.Dialog}</td>
//                   <td>{song.Airtel}</td>
                 
                
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//   )

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './userSongTable.css';

// const UserRequestTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let aid =localStorage.getItem('AID');
//     console.log(aid);
//     axios.get('http://localhost:5000/ringtones/${aid}')
//       // .then(res => {
//       //   setData(res.data);
//       //   setLoading(false);
//       // })
//       .then(res => {
//         if (Array.isArray(res.data)) {
//           setData(res.data);
//         } else if (typeof res.data === 'object') {
//           setData([res.data]); // Convert single object to array
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="table-section">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>RTID</th>
//               <th>SID</th>
//               <th>Mobitel</th>
//               <th>Dialog</th>
//               <th>Airtel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((song, index) => (
//               <tr key={index} className="bg-[#EEEEEE]">
//                 <td>{song.RTID}</td>
//                 <td>{song.SID}</td>
//                 <td>{song.Mobitel}</td>
//                 <td>{song.Dialog}</td>
//                 <td>{song.Airtel}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserRequestTable;


      




import React, { useState, useEffect } from "react";
import axios from 'axios';

import './userSongTable.css'

const UserRequestTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const fetchTableData = async () => {
    try {
      const songsResponse = await axios.get('http://localhost:5000/songs');
      const ringtonesResponse = await axios.get('http://localhost:5000/ringtones');
  
      const songsData = songsResponse.data;
      const ringtonesData = ringtonesResponse.data;
  
      console.log("Songs Data:", songsData);
      console.log("Ringtones Data:", ringtonesData);
  
      const mergedData = [];
  
      songsData.forEach(song => {
        const correspondingRingtones = ringtonesData.filter(ringtone => ringtone.SID === song.SID);
        
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
        <table className="table userRequestTable">
          <thead>
            <tr>
              <th>Artist Name</th>
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
                <td>{song.artistName}</td>
                <td>{song.songName}</td>
                <td>{song.requestDate}</td>
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






  // const [tableData, setTableData] = useState([]);
  // const [selectedFilter, setSelectedFilter] = useState("All");

  // useEffect(() => {
  //   const filteredData = jsonData.filter((song) => {
  //     return filters[selectedFilter](song);
  //   });

  //   setTableData(filteredData);
  // }, [selectedFilter]);

  // const filters = {
  //   All: () => true,
  //   Week: (song) => {
  //     const requestDate = new Date(song.requestDate);
  //     const lastWeek = new Date();
  //     lastWeek.setDate(lastWeek.getDate() - 7);
  //     return requestDate >= lastWeek;
  //   },
  //   Month: (song) => {
  //     const requestDate = new Date(song.requestDate);
  //     const lastMonth = new Date();
  //     lastMonth.setMonth(lastMonth.getMonth() - 1);
  //     return requestDate >= lastMonth;
  //   },
  //   Last3Months: (song) => {
  //     const requestDate = new Date(song.requestDate);
  //     const lastThreeMonths = new Date();
  //     lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
  //     return requestDate >= lastThreeMonths;
  //   },
  //   Year: (song) => {
  //     const requestDate = new Date(song.requestDate);
  //     const lastYear = new Date();
  //     lastYear.setFullYear(lastYear.getFullYear() - 1);
  //     return requestDate >= lastYear;
  //   },
  // };

  // const handleFilterClick = (filter) => {
  //   setSelectedFilter(filter);
  // };

  // return (
  //   <>
  //     <div className="filter-section flex items-center justify-between">
  //       <h1 className="font-bold text-xl">Song Renewal</h1>
  //       <div className="flex gap-5 font-bold">
  //         {Object.keys(filters).map((filter) => (
  //           <p
  //             key={filter}
  //             className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
  //             onClick={() => handleFilterClick(filter)}
  //           >
  //             {filter}
  //           </p>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="table-section">
  //       <table className="table userRequestTable">
  //         <thead>
  //           <tr>
  //             {/*<th>Artist Name</th>*/}
  //             <th>Song Name</th>
  //             <th>Request Date</th>
  //             <th>Mobitel</th>
  //             <th>Dialog</th>
  //             <th>Hutch</th>
  //             <th>Airtel</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.map((song, index) => (
  //             <tr key={index} className="bg-[#EEEEEE]">
  //               {/*<td>{song.artistName}</td>*/}
  //               <td>{song.songName}</td>
  //               <td>{song.requestDate}</td>
  //               <td>{song.requestStates.mobitel.status}</td>
  //               <td>{song.requestStates.dialog.status}</td>
  //               <td>{song.requestStates.hutch.status}</td>
  //               <td>{song.requestStates.airtel.status}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );
// };

// export default UserRequestTable;
