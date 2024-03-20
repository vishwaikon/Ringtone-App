import React, { useState } from 'react';
import StatsWidgets from '../../../components/widgets/statsWidgets';
import FilterByISP from '../../../components/filters/filterbyisp/filterbyisp';
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';
import AdminSongTable from '../../../components/tables/adminSideTables/adminSongTable';

import './adminDashboard.css';

const AdminDashboard = () => {
  const [activeISP, setActiveISP] = useState('All');

  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='filter-container flex justify-between'>
        <FilterByISP setActiveISP={setActiveISP} />
        <div className='filter-search flex gap-5'>
          {/*<FilterSearch spanText="Filter by Songs" inputPlaceholder="Type to filter..." />*/}
        </div>
      </div>
      <div className='table-container flex flex-col gap-5'>
        <AdminSongTable activeISP={activeISP} />
      </div>
    </div>
  );
};

export default AdminDashboard;
