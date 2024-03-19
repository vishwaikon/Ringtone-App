
import React, { useState } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline } from "react-icons/io5";
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, songFile: file });
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
      console.log(res);
      alert("Uploaded Song Successfully!")
    } catch (err) {
      console.error(err);
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
                  className="flex flex-col items-center justify-center w-full h-50 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline
                      size={"4em"}
                      color="#7E40CD"
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
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="formcontent text-left">
                <p className="text-[#676767] text-md font-semibold">Details</p>
              </div>

              <div className="">
                <input
                  type="text"
                  name="songName"
                  id="songName"
                  className=" placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.songName}
                  placeholder="Song Name"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="AID"
                  id="AID"
                  className=" placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.AID}
                  placeholder="AID"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="">
                <input
                  type="text"
                  name="language"
                  id="language"
                  className="placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.language}
                  placeholder="Language"
                  onChange={handleChange}
                />
              </div> */}

                <div className="">
                <select
                  name="language"
                  value={formData.language}
                   onChange={handleChange}
                  className="border-primary shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-text-gray"
                >
                  <option value="" className="text-gray-600">Language</option>
                  <option value="Sinhala" className="text-gray-600">Sinhala</option>
                  <option value="English" className="text-gray-600">English</option>
                  <option value="Tamil" className="text-gray-600">Tamil</option>
                  <option value="Hindi" className="text-gray-600">Hindi</option>
                </select>
              </div>


              {/* <div className="">
                <input
                  type="text"
                  name="genreID"
                  id="genreID"
                  className="placeholder-black border-primary placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.genreID}
                  placeholder="Genre ID"
                  onChange={handleChange}
                />
              </div> */}
               <div className="">
                <select
                  name="genreID"
                  value={formData.genreID}
                   onChange={handleChange}
                  className="border-primary shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-text-gray"
                >
                  <option value="" className="text-gray-600">Genre ID</option>
                  <option value="1" className="text-gray-600">1</option>
                  <option value="2" className="text-gray-600">2</option>
                  <option value="3" className="text-gray-600">3</option>
                  <option value="3" className="text-gray-600">4</option>
                </select>
              </div>

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

