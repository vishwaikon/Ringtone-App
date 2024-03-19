
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

function Uploadform() {
  const [formData, setFormData] = useState({
    songName: "",
    artistName: "",
    language: "",
    selectedOption: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData);
  };

  return (
    <div className="container h-[500px] flex items-center justify-center rounded-md mx-auto">
      <div className="formwrapper w-[500px] border-2 px-[50px] py-[50px] rounded-md ">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="wrapper text-center">
            <h2 className="text-3xl font-bold mb-8">Upload</h2>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#7E40CD] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IoCloudUploadOutline
                    size={"6em"}
                    color="#483EA8"
                    style={{ strokeWidth: 2 }}
                  />
                  <p className="mb-2 text-large text-black font-bold dark:text-gray-400">
                    Drag & Drop files or{" "}
                    <span className="font-semibold text-[#7E40CD]">Browse</span>{" "}
                  </p>
                  <p className="text-large text-gray-500 dark:text-gray-400">
                    Supported Formats : MP4
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

            <div className="formcontent text-left mt-8">
              <p className="text-[#676767] text-xl font-semibold">Details</p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="songName"
                id="songName"
                className=" placeholder-black border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.songName}
                placeholder="Song Name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="artistName"
                id="artistName"
                className="placeholder-black border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.artistName}
                placeholder="Artist Name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="language"
                id="language"
                className="placeholder-black border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={formData.language}
                placeholder="Language"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <select
                name="selectedOption"
                value={formData.selectedOption}
                onChange={handleChange}
                className="border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Distributor</option>
                <option value="Option 1">Distibutor 1</option>
                <option value="Option 2">Distributor 2</option>
                <option value="Option 3">Distributor 3</option>
              </select>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#7E40CD] text-2xl text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[420px]"
              >
                Upload Files
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Uploadform;
