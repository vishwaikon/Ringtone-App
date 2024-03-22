import React, { useState } from 'react';
import FilterByISP from '../../../components/filters/filterbyisp/filterbyisp';
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';
import AllSongTable from '../../../components/tables/adminSideTables/adminAllSongsTable';

import './allSongs.css'

const AllSongs = () => {
  const [activeISP, setActiveISP] = useState('All');
  
  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='filter-container flex justify-between'>
        <FilterByISP setActiveISP={setActiveISP} />
        <div className='filter-wrapper flex gap-5'>
          <FilterSearch spanText="" inputPlaceholder="Song title" />
          <FilterSearch spanText="" inputPlaceholder="Artist name" />
        </div>
      </div>
      <div className='table-container flex flex-col gap-5'>
        <AllSongTable activeISP={activeISP} />
      </div>
    </div>
    
  );
};

export default AllSongs;
