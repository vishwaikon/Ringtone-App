import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./ArtistList.css"

const ArtistList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/artists')
    .then(res => setData(res.data))
    .catch(err=> console.log(err));
    
  },[]);
 
  return (
    <div className="table-section">
          <table className="table">
            <thead>
              <tr>
                
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date</th>
                <th>Phone</th>
                <th>Email</th>
                
                
              </tr>
            </thead>
            <tbody>
              {data.map((artist, index) => (
                <tr key={index} className="bg-[#EEEEEE]">
                  <td>{artist.firstName}</td>
                  <td>{artist.lastName}</td>
                  <td>{artist.createdDate}</td>
                  <td>{artist.phone}</td>
                  <td>{artist.email}</td>
                
                 
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default ArtistList
