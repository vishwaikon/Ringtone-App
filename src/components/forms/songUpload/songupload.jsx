import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline, IoCloudDoneOutline } from "react-icons/io5";
import axios from "axios";
import "../form.css";

const Songupload = ({ onClose }) => {
  const [formData, setFormData] = useState({
    songName: "",
    AID: "",
    language: "",
    genreID: "",
    artistName: "",
    songFile: null,
    isUploaded: false,
    fileSelected: false,
  });

  useEffect(() => {
    // Fetch AID from localStorage
    const userAID = localStorage.getItem('AID');
    if (userAID) {
      setFormData(prevState => ({ ...prevState, AID: userAID }));
      
      // Fetch artist details based on AID
      axios.get(`http://localhost:5000/users/${userAID}`)
        .then(response => {
          const artistName = response.data.artistName;
          setFormData(prevState => ({ ...prevState, artistName: artistName }));
        })
        .catch(error => {
          console.error('Error fetching artist details:', error);
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, songFile: file, fileSelected: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("songName", formData.songName);
    formDataToSend.append("AID", formData.AID);
    formDataToSend.append("language", formData.language);
    formDataToSend.append("genreID", formData.genreID);
    formDataToSend.append("artistName", formData.artistName);
    formDataToSend.append("songFile", formData.songFile);
  
    try {
      const res = await axios.post("http://localhost:5000/songs", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Extract SID from the response
      const SID = res.data.SID;
  
      // Create a new ringtone with SID and other columns set to null
      await axios.post("http://localhost:5000/ringtones", {
        SID: SID,
        Mobitel: "pending",
        Dialog: "pending",
        Hutch: "pending",
        Airtel: "pending"
      });
  
      console.log(res);
      setFormData({ ...formData, isUploaded: true });
      alert("Uploaded Song Successfully!");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Uploaded Song Failed!");
    }
  };

  return (
    <div className="form">
      <div className="upload-form-container h-[500px] p-5 flex flex-col items-center rounded-md mx-auto">
        <div className="formwrapper relative w-full">
          <div
            className="absolute right-0 cursor-pointer text-xl"
            onClick={onClose}
          >
            <IoCloseCircleOutline />
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="wrapper flex flex-col gap-2 w-full text-center">
              <h2 className="text-xl font-bold">Upload</h2>

              <div className="upload-form-dropbox flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-50 border-2 border-primary border-dashed rounded-lg cursor-pointer ${
                    formData.fileSelected
                      ? "bg-blue-200 dark:bg-green-700 h-[200px]"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {formData.fileSelected ? (
                    <div className="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
                      <IoCloudDoneOutline
                        size={"4em"}
                        color={formData.fileSelected ? "#ffff" : "#7E40CD"}
                        style={{ strokeWidth: 2 }}
                      />
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        File Selected
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
                      <IoCloudUploadOutline
                        size={"4em"}
                        color={formData.fileSelected ? "#3B82F6" : "#7E40CD"}
                        style={{ strokeWidth: 2 }}
                      />
                      <p className="text-sm text-black flex gap-1 font-bold dark:text-gray-400">
                        Drag & Drop files or
                        <span className="font-sm text-primary">Browse</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Supported Formats : MP3
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Song Name */}
              <div className="">
                <input
                  type="text"
                  name="songName"
                  id="songName"
                  className="placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.songName}
                  placeholder="Song Name"
                  onChange={handleChange}
                />
              </div>

              {/* Language */}
              <div className="">
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="border-primary shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-text-gray"
                >
                  <option value="">Language</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

              {/* Genre ID */}
              <div className="">
                <select
                  name="genreID"
                  value={formData.genreID}
                  onChange={handleChange}
                  className="border-primary shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-text-gray"
                >
                  <option value="">Genre</option>
                  <option value="1">Rock</option>
                  <option value="2">Rap</option>
                  <option value="3">Lofi</option>
                  <option value="3">Jass</option>
                </select>
              </div>

              {/* Artist Name */}
              <div className="">
                <input
                  type="text"
                  name="artistName"
                  id="artistName"
                  className="placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.artistName}
                  placeholder="Artist Name"
                  onChange={handleChange}
                />
              </div>

              {/* Upload Button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="border-primary text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline bg-primary w-[420px]"
                >
                  Upload Files
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Songupload;