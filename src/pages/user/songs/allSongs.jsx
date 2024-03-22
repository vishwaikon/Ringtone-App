

import React, { useState } from 'react';
import FilterByISP from '../../../components/filters/filterbyisp/filterbyisp';
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';
import AllSongTable from '../../../components/tables/userSideTable/userAllSongTable';

import './allSongs.css'

const AllSongs = () => {
  const [activeISP, setActiveISP] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  
  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='filter-container flex justify-between'>
        <FilterByISP setActiveISP={setActiveISP} />
        <div className='filter-wrapper flex gap-5'>
          <div className='date-filter flex gap-2 items-center'>
            <label>From:</label>
            <input className='bg-[#EEEEEE] rounded-md p-1' type='date' value={fromDate} onChange={handleFromDateChange} />
          </div>
          <div className='date-filter flex gap-2 items-center'>
            <label>To:</label>
            <input type='date' className='bg-[#EEEEEE] rounded-md p-1' value={toDate} onChange={handleToDateChange} />
          </div>
        </div>
      </div>
      <div className='table-container flex flex-col gap-5'>
        <AllSongTable activeISP={activeISP} />
      </div>
    </div>
  );
};

export default AllSongs;