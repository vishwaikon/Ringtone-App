import React, { useState } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms/form.css";

const Logout = ({ onClose }) => {
    const navigate = useNavigate();
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


  };
  const handleLogout = () => {
    

    axios.post(`http://localhost:5000/user/logout/${localStorage.getItem('AID')}`)
    .then(res => {
     localStorage.clear();
     navigate('/');
     console.log(res);
    })
    .catch(err => console.log(err));
     
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
              <h2 className="text-xl font-bold">Do you want to logout?</h2>

              

            

          

              <div className="flex items-center justify-center gap-4">
                <button
                  type="submit"
                  className="bg-primary text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline  " onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  type="submit"
                  className="bg-primary text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline "
                  onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logout;
