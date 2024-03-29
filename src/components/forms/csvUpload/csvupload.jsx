import React, { useState } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline, IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axios from "axios";
import "../form.css";

const Csvupload = ({ onClose }) => {
  const [formData, setFormData] = useState({
    csvFile: null,
    isUploaded: false,
    fileSelected: false,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, csvFile: file, fileSelected: true });
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
      setFormData({ ...formData, isUploaded: true });
      alert("Uploaded CSV File Successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Uploaded CSV File Failed!");
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
                      {formData.isUploaded ? (
                        <IoCheckmarkDoneCircleOutline
                          size={"4em"}
                          color="#34D399"
                          style={{ strokeWidth: 2 }}
                        />
                      ) : (
                        <IoCloudUploadOutline
                          size={"4em"}
                          color={formData.fileSelected ? "#ffff" : "#7E40CD"}
                          style={{ strokeWidth: 2 }}
                        />
                      )}
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        {formData.isUploaded ? "File Uploaded" : "File Selected"}
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
                        Supported Formats : CSV
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

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-primary text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
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
