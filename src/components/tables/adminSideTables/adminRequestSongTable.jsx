import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminSongTable.css";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";

const AdminRequestTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/ringtones")
      .then((res) => {
        const updatedData = res.data.map((song) => ({
          ...song,
          Mobitel: song.Mobitel || "Pending",
          Dialog: song.Dialog || "Pending",
          Hutch: song.Hutch || "Pending",
          Airtel: song.Airtel || "Pending",
          editModes: {
            Mobitel: false,
            Dialog: false,
            Hutch: false,
            Airtel: false,
          },
        }));
        setTableData(updatedData);
      })
      .catch((err) => console.log(err));
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
  };

  const toggleEditMode = (index, field) => {
    const newData = [...tableData];
    newData[index].editModes[field] = !newData[index].editModes[field];
    setTableData(newData);
  };

  const handleSave = (index) => {
    const newData = [...tableData];
    Object.keys(newData[index].editModes).forEach((field) => {
      newData[index].editModes[field] = false;
    });
    setTableData(newData);

    const updatedSong = tableData[index];
    axios
      .put(
        `http://localhost:5000/ringtones/${updatedSong.RTID}/${updatedSong.SID}`,
        updatedSong
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="filter-section flex items-center justify-between">
        <h1 className="font-bold text-xl">Song Renewal</h1>
        <div className="flex gap-5 font-bold">
          {Object.keys(filters).map((filter) => (
            <p
              key={filter}
              className={`cursor-pointer ${
                selectedFilter === filter ? "text-primary" : ""
              }`}
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
                <td>{song.SID}</td>
                <td className="td-wrapper">
                  <input
                    className="w-[100px] text-center"
                    type="text"
                    value={song.Mobitel}
                    onChange={(e) =>
                      handleInputChange(index, "Mobitel", e.target.value)
                    }
                    readOnly={!song.editModes.Mobitel}
                  />
                  <div className="buttons float-right">
                    {song.editModes.Mobitel ? (
                      <button onClick={() => handleSave(index)}>
                        <MdDoneOutline />
                      </button>
                    ) : (
                      <button onClick={() => toggleEditMode(index, "Mobitel")}>
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </td>
                <td className="td-wrapper">
                  <input
                    className="w-[100px] text-center"
                    type="text"
                    value={song.Dialog}
                    onChange={(e) =>
                      handleInputChange(index, "Dialog", e.target.value)
                    }
                    readOnly={!song.editModes.Dialog}
                  />
                  <div className="buttons float-right">
                    {song.editModes.Dialog ? (
                      <button onClick={() => handleSave(index)}>
                        <MdDoneOutline />
                      </button>
                    ) : (
                      <button onClick={() => toggleEditMode(index, "Dialog")}>
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </td>
                <td className="td-wrapper">
                  <input
                    className="w-[100px] text-center"
                    type="text"
                    value={song.Hutch}
                    onChange={(e) =>
                      handleInputChange(index, "Hutch", e.target.value)
                    }
                    readOnly={!song.editModes.Hutch}
                  />
                  <div className="buttons float-right">
                    {song.editModes.Hutch ? (
                      <button onClick={() => handleSave(index)}>
                        <MdDoneOutline />
                      </button>
                    ) : (
                      <button onClick={() => toggleEditMode(index, "Hutch")}>
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </td>
                <td className="td-wrapper">
                  <input
                    className="w-[100px] text-center"
                    type="text"
                    value={song.Airtel}
                    onChange={(e) =>
                      handleInputChange(index, "Airtel", e.target.value)
                    }
                    readOnly={!song.editModes.Airtel}
                  />
                  <div className="buttons float-right">
                    {song.editModes.Airtel ? (
                      <button onClick={() => handleSave(index)}>
                        <MdDoneOutline />
                      </button>
                    ) : (
                      <button onClick={() => toggleEditMode(index, "Airtel")}>
                        <FaEdit />
                      </button>
                    )}
                  </div>
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
