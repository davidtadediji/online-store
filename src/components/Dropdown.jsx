import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-left px-3 border border-gray-300 rounded-xl bg-white focus:outline-none"
        onClick={toggleDropdown}
      >
         {selectedOption ? selectedOption : options[0].label}
      </button>
      {isOpen && (
        <div className="absolute z-10 px-2 mt-2 bg-white border border-gray-300 rounded-sm shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
