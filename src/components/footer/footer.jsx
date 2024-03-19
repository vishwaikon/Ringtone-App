import React from 'react';
import './footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

  return (
    <div className='footer'>
      <p>&#169; 2024 Motion Effect - All Rights Reserved. | <a href="https://ceylonxcorp.com/" rel='noreferrer' target="_blank">Designed &amp; Developed by CeylonX</a></p>
      {/* <div className='social-media'>
        <a href="/"><FaFacebookF /></a>
        <a href="/"><FaInstagram /></a>
        <a href="/"><FaTwitter /></a>
        <a href="/"><FaLinkedinIn /></a>
      </div> */}
    </div>
  );
};

export default Footer;
