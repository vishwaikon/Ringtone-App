import React from 'react';
import './filterSearch.css';

const FilterSearch = ({ spanText = '', inputPlaceholder = 'Search...', onChange }) => {
  return (
    <div className="searchbox flex flex-col">
      <span>{spanText}</span>
      <input
        type="text"
        placeholder={inputPlaceholder}
        className="bg-[#EEEEEE] rounded-3xl outline-none p-2"
        onChange={onChange} // Properly handle the onChange event
      />
    </div>
  );
};

export default FilterSearch;
