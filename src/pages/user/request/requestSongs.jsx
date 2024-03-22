import React from 'react';
import UserRequestTable from '../../../components/tables/userSideTable/userRequestSongTable'; 
import FilterSearch from '../../../components/filters/filterSearch/filterSearch';

const RequestSongs = () => {
  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='table-container flex flex-col gap-5'>
        <UserRequestTable />
      </div>
    </div>
  );
};

export default RequestSongs;
