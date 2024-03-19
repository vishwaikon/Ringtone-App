import React, { useState } from 'react';
import './filterbyisp.css';

const FilterByISP = ({ setActiveISP }) => {
  const [activeButton, setActiveButton] = useState('All');

  const handleButtonClick = (isp) => {
    setActiveButton(isp);
    setActiveISP(isp);
  };

  return (
    <div className="centerbar flex text-center items-center justify-between">
      <div className="ispwrapper ml-6 flex gap-[20px]">
        <button
          className={`isp rounded-xl w-[80px] ${activeButton === 'All' ? 'bg-primary text-white' : ''}`}
          onClick={() => handleButtonClick('All')}
        >
          All
        </button>
        <button
          className={`isp rounded-xl w-[80px] ${activeButton === 'Dialog' ? 'bg-primary text-white' : ''}`}
          onClick={() => handleButtonClick('Dialog')}
        >
          Dialog
        </button>
        <button
          className={`isp rounded-xl w-[80px] ${activeButton === 'Mobitel' ? 'bg-primary text-white' : ''}`}
          onClick={() => handleButtonClick('Mobitel')}
        >
          Mobitel
        </button>
        <button
          className={`isp rounded-xl w-[80px] ${activeButton === 'Airtel' ? 'bg-primary text-white' : ''}`}
          onClick={() => handleButtonClick('Airtel')}
        >
          Airtel
        </button>
        <button
          className={`isp rounded-xl w-[80px] ${activeButton === 'Hutch' ? 'bg-primary text-white' : ''}`}
          onClick={() => handleButtonClick('Hutch')}
        >
          Hutch
        </button>
      </div>
    </div>
  );
};

export default FilterByISP;
