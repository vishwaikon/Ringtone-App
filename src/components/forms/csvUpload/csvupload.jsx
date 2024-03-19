import React, { useState } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";

import "../form.css";

const Csvupload = ({ onClose }) => {
  const [formData, setFormData] = useState({
    csvFile: null,
  });

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, csvFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("csvFile", formData.csvFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-csv",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      alert("Uploaded CSV File Successfully!")
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
                      Supported Formats : CSV
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

              {/* <div className="formcontent text-left">
                <p className="text-[#676767] text-md font-semibold">Details</p>
              </div> */}

              {/* <div className="mb-4">
                <select
                  name="selectedOption"
                  value={formData.selectedOption}
                  // onChange={handleChange}
                  className="border-primary shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Distributor</option>
                  <option value="Option 1">Dialog</option>
                  <option value="Option 2">Hutch</option>
                  <option value="Option 3">Mobitel</option>
                  <option value="Option 3">Airtel</option>
                </select>
              </div> */}

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-primary text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline "
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

export default Csvupload;
