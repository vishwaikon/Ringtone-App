import React from 'react';
import AdminRequestTable from '../../../components/tables/adminSideTables/adminRequestSongTable'; 

const RequestSongs = () => {
  return (
    <div className='dashboard-container flex flex-col gap-5'>
      <div className='table-container flex flex-col gap-5'>
        <AdminRequestTable />
      </div>
    </div>
  );
};

export default RequestSongs;
