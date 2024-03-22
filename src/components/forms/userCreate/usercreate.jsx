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
        createdBy:"",
        countryCode: "+94" // Default country code
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCountryCodeChange = (e) => {
        setFormData({ ...formData, countryCode: e.target.value });
    };
    
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepend country code to the phone number
        formData.phone = formData.countryCode + formData.phone;
        axios.post('http://localhost:5000/artists', formData)
        .then(res =>{
            console.log(res);
            alert("Artist profile Create Successfully!");
            onClose();
        })
        .catch(err => {
            console.log(err);
            alert("Artist profile Create Failed!");
        });
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
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="placeholder-black border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center">
                                <select
                                    name="countryCode"
                                    className="border-[#7E40CD] placeholder-gray-600 shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.countryCode}
                                    onChange={handleCountryCodeChange}
                                >
                                    <option value="+94">+94</option>
                                    <option value="+54">+54</option>
                                    <option value="+61">+61</option>
                                    <option value="+32">+32</option>
                                    <option value="+55">+55</option>
                                    <option value="+86">+86</option>
                                    <option value="+45">+45</option>
                                    <option value="+20">+20</option>
                                    <option value="+33">+33</option>
                                    <option value="+49">+49</option>
                                    <option value="+30">+30</option>
                                    <option value="+91">+91</option>
                                    <option value="+62">+62</option>
                                    <option value="+98">+98</option>
                                    <option value="+39">+39</option>
                                    <option value="+81">+81</option>
                                    <option value="+82">+82</option>
                                    <option value="+60">+60</option>
                                    <option value="+52">+52</option>
                                    <option value="+64">+64</option>
                                    <option value="+47">+47</option>
                                    <option value="+63">+63</option>
                                    <option value="+40">+40</option>
                                    <option value="+65">+65</option>
                                    <option value="+27">+27</option>
                                    <option value="+34">+34</option>
                                    <option value="+41">+41</option>
                                    <option value="+66">+66</option>
                                    <option value="+90">+90</option>
                                    <option value="+44">+44</option>
                                </select>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="placeholder-black border-[#7E40CD] shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.phone}
                                    placeholder="Mobile Number"
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
