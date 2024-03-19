import React, { useState } from "react";
import { IoCloudUploadOutline, IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";

import '../form.css'

const Usercreate = ({ onClose }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password:"",
        createdBy:""
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/artists', formData)
        .then(res =>{
           console.log(res);
           alert("Created Artist Profile Successfully!");
        })
        
        
        
        .catch(err => console.log(err))
        console.log(formData);

       
       
      };

      return (
        <div className="form">
          <div className="upload-form-container h-[500px] p-5 flex flex-col items-center rounded-md mx-auto">
            <div className="formwrapper relative w-full">
              <div className="absolute right-0 cursor-pointer text-xl" onClick={onClose}>
                <IoCloseCircleOutline />
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="wrapper flex flex-col gap-2 w-full text-center">
                  <h2 className="text-xl font-bold">Create Artist</h2>
                  
                  <div className="formcontent text-left">
                    <p className="text-[#676767] text-md font-semibold">Details</p>
                  </div>
      
                  <div className="">
                    <input
                      type="text"
                      name="firstName"
                      id="firsttName"
                      className="placeholder-black border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.firstName}
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                  </div>
      
                  <div className="">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className=" placeholder-black border-[#7E40CD] shadow appearance-none border rounded placeholder-gray-600 w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                  </div>

                
      
                  <div className="">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="placeholder-black border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.phone}
                      placeholder="Mobile Number"
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="placeholder-black border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.email}
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="placeholder-black border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.password}
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="createdBy"
                      id="createdBy"
                      className="placeholder-black border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.createdBy}
                      placeholder="CreatedBy"
                      onChange={handleChange}
                    />
                  </div>
      
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-[#7E40CD] text-sm text-white font-medium w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline w-[420px]"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

export default Usercreate;