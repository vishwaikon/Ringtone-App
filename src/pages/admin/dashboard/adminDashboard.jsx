import React, { useState } from 'react';
import StatsWidgets from '../../../components/widgets/statsWidgets';
import FilterByISP from '../../../components/filters/filterbyisp/filterbyisp';
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';
import AdminSongTable from '../../../components/tables/adminSideTables/adminSongTable';

import './adminDashboard.css';

const AdminDashboard = () => {
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
        <div></div>
        <div className='filter-wrapper flex gap-5'>
          <FilterSearch inputPlaceholder="Artist Name" />
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
        <AdminSongTable activeISP={activeISP} fromDate={fromDate} toDate={toDate} />
      </div>
    </div>
  );
};

export default AdminDashboard;
