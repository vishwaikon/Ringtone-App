// import React, { useState, useEffect } from "react";
// import jsonData from "../../../data/requestsongs.json";
// import axios from 'axios';

// import './adminSongTable.css'

// const AdminRequestTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   useEffect(() => {
//     axios.get('http://localhost:5000/ringtones')
//     .then(res => setTableData(res.data))
//     .catch(err=> console.log(err));
//     const filteredData = tableData.filter((song) => {
//       return filters[selectedFilter](song);
//     });

//     setTableData(filteredData);
//   }, [selectedFilter]);

//   const filters = {
//     All: () => true,
//     Week: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastWeek = new Date();
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return requestDate >= lastWeek;
//     },
//     Month: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return requestDate >= lastMonth;
//     },
//     Last3Months: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastThreeMonths = new Date();
//       lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
//       return requestDate >= lastThreeMonths;
//     },
//     Year: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastYear = new Date();
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return requestDate >= lastYear;
//     },
//   };

//   const handleFilterClick = (filter) => {
//     setSelectedFilter(filter);
//   };

//   return (
//     <>
//       <div className="filter-section flex items-center justify-between">
//         <h1 className="font-bold text-xl">Song Renewal</h1>
//         <div className="flex gap-5 font-bold">
//           {Object.keys(filters).map((filter) => (
//             <p
//               key={filter}
//               className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
//               onClick={() => handleFilterClick(filter)}
//             >
//               {filter}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="table-section">
//         <table className="table userRequestTable">
//           <thead>
//             <tr>
//               <th>Ringtone ID</th>
//               <th>Song ID</th>
//               <th>Mobitel</th>
//               <th>Dialog</th>
//               <th>Hutch</th>
//               <th>Airtel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((song, index) => (
//               <tr key={index} className="bg-[#EEEEEE]">
//                 <td>{song.RTID}</td>
//                 <td>{song.SID}</td>
//                 <td>{song.Mobitel}</td>
//                 <td>{song.Dialog}</td>
//                 <td>{song.Airtel}</td>
//                 <td>{song.Hutch}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AdminRequestTable;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './adminSongTable.css';

// const AdminRequestTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   useEffect(() => {
//     axios.get('http://localhost:5000/ringtones')
//       .then(res => setTableData(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const filters = {
//     All: () => true,
//     Week: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastWeek = new Date();
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return requestDate >= lastWeek;
//     },
//     Month: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return requestDate >= lastMonth;
//     },
//     Last3Months: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastThreeMonths = new Date();
//       lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
//       return requestDate >= lastThreeMonths;
//     },
//     Year: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastYear = new Date();
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return requestDate >= lastYear;
//     },
//   };

//   const handleFilterClick = (filter) => {
//     setSelectedFilter(filter);
//   };

//   const handleInputChange = (index, fieldName, value) => {
//     const newData = [...tableData];
//     newData[index][fieldName] = value;
//     setTableData(newData);
//   };

//   const handleSave = (RTID) => {
//     const updatedSong = tableData.find(song => song.RTID === RTID);
//     axios.put(`http://localhost:5000/ringtones/${RTID}`, updatedSong)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));
//   };

//   return (
//     <>
//       <div className="filter-section flex items-center justify-between">
//         <h1 className="font-bold text-xl">Song Renewal</h1>
//         <div className="flex gap-5 font-bold">
//           {Object.keys(filters).map((filter) => (
//             <p
//               key={filter}
//               className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
//               onClick={() => handleFilterClick(filter)}
//             >
//               {filter}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="table-section">
//         <table className="table userRequestTable">
//           <thead>
//             <tr>
//               <th>Ringtone ID</th>
//               <th>Song ID</th>
//               <th>Mobitel</th>
//               <th>Dialog</th>
//               <th>Hutch</th>
//               <th>Airtel</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((song, index) => (
//               <tr key={index} className="bg-[#EEEEEE]">
//                 <td>{song.RTID}</td>
//                 <td>{song.SID}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Mobitel}
//                     onChange={(e) => handleInputChange(index, 'Mobitel', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Dialog}
//                     onChange={(e) => handleInputChange(index, 'Dialog', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Hutch}
//                     onChange={(e) => handleInputChange(index, 'Hutch', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Airtel}
//                     onChange={(e) => handleInputChange(index, 'Airtel', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => handleSave(song.RTID)}>Save</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AdminRequestTable;

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './adminSongTable.css';

// const AdminRequestTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   useEffect(() => {
//     axios.get('http://localhost:5000/ringtones')
//       .then(res => setTableData(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const filters = {
//     All: () => true,
//     Week: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastWeek = new Date();
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return requestDate >= lastWeek;
//     },
//     Month: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return requestDate >= lastMonth;
//     },
//     Last3Months: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastThreeMonths = new Date();
//       lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
//       return requestDate >= lastThreeMonths;
//     },
//     Year: (song) => {
//       const requestDate = new Date(song.requestDate);
//       const lastYear = new Date();
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return requestDate >= lastYear;
//     },
//   };

//   const handleFilterClick = (filter) => {
//     setSelectedFilter(filter);
//   };

//   const handleInputChange = (index, fieldName, value) => {
  
//     const newData = [...tableData];
//     newData[index][fieldName] = value;
//     setTableData(newData);

//     // Update database with the new value
//     const updatedSong = newData[index];
//     axios.put(`http://localhost:5000/ringtones/${updatedSong.RTID}`, updatedSong)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));
//   };

//   return (
//     <>
//       <div className="filter-section flex items-center justify-between">
//         <h1 className="font-bold text-xl">Song Renewal</h1>
//         <div className="flex gap-5 font-bold">
//           {Object.keys(filters).map((filter) => (
//             <p
//               key={filter}
//               className={`cursor-pointer ${selectedFilter === filter ? 'text-primary' : ''}`}
//               onClick={() => handleFilterClick(filter)}
//             >
//               {filter}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="table-section">
//         <table className="table userRequestTable">
//           <thead>
//             <tr>
//               <th>Ringtone ID</th>
//               <th>Song ID</th>
//               <th>Mobitel</th>
//               <th>Dialog</th>
//               <th>Hutch</th>
//               <th>Airtel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((song, index) => (
//               <tr key={index} className="bg-[#EEEEEE]">
//                 <td>{song.RTID}</td>
//                 <td>{song.SID}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Mobitel}
//                     onChange={(e) => handleInputChange(index, 'Mobitel', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Dialog}
//                     onChange={(e) => handleInputChange(index, 'Dialog', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Hutch}
//                     onChange={(e) => handleInputChange(index, 'Hutch', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={song.Airtel}
//                     onChange={(e) => handleInputChange(index, 'Airtel', e.target.value)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AdminRequestTable;


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './adminSongTable.css';

const AdminRequestTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    axios.get('http://localhost:5000/ringtones')
      .then(res => {
        const updatedData = res.data.map(song => ({
          ...song,
          Mobitel: song.Mobitel || 'Pending',
          Dialog: song.Dialog || 'Pending',
          Hutch: song.Hutch || 'Pending',
          Airtel: song.Airtel || 'Pending',
        }));
        setTableData(updatedData);
      })
      .catch(err => console.log(err));
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

  const handleInputChange = (index, fieldName, value) => {
    
    const newData = [...tableData];
    newData[index][fieldName] = value;
    setTableData(newData);

    // Update database with the new value
    const updatedSong = newData[index];
    axios.put(`http://localhost:5000/ringtones/${updatedSong.RTID}`, updatedSong)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
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
              <th>Ringtone ID</th>
              <th>Song ID</th>
              <th>Mobitel</th>
              <th>Dialog</th>
              <th>Hutch</th>
              <th>Airtel</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((song, index) => (
              <tr key={index} className="bg-[#EEEEEE]">
                <td>{song.RTID}</td>
                <td>
                  {song.SID}</td>
                <td>
                  <input
                    type="text"
                    value={song.Mobitel}
                    onChange={(e) => handleInputChange(index, 'Mobitel', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={song.Dialog}
                    onChange={(e) => handleInputChange(index, 'Dialog', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={song.Hutch}
                    onChange={(e) => handleInputChange(index, 'Hutch', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={song.Airtel}
                    onChange={(e) => handleInputChange(index, 'Airtel', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminRequestTable;
