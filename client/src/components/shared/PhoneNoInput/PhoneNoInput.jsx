// src/PhoneInput.js

import React, { useState } from 'react';

const PhoneInput = ({ countries }) => {
  const [selectedFlag, setSelectedFlag] = useState('nl');
  const [selectedPrefix, setSelectedPrefix] = useState('+31');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectCountry = (prefix, flag) => {
    setSelectedPrefix(`+${prefix}`);
    setSelectedFlag(flag);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={`pn-select ${isDropdownOpen ? 'pn-select--open' : ''}`} style={{ '--prefix-length': selectedPrefix.length }}>
      {/* Selected prefix */}
      <button
        className="pn-selected-prefix"
        aria-label="Select phonenumber prefix"
        id="js_trigger-dropdown"
        tabIndex="1"
        onClick={toggleDropdown}
      >
        <img
          className="pn-selected-prefix__flag"
          id="js_selected-flag"
          src={`https://flagpedia.net/data/flags/icon/36x27/${selectedFlag}.png`}
          alt={`Selected Flag: ${selectedFlag}`}
        />
        <svg
          className="pn-selected-prefix__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#081626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Phone number input */}
      <div className="pn-input">
        <label className="pn-input__label">Phonenumber*</label>
        <div className="pn-input__container">
          <input
            className="pn-input__prefix"
            value={selectedPrefix}
            type="text"
            name="phonenumber-prefix"
            id="js_number-prefix"
            tabIndex="-1"
          />
          <input
            className="pn-input__phonenumber"
            id="js_input-phonenumber"
            type="tel"
            name="phonenumber"
            pattern="\d*"
            value=""
            placeholder=" "
            autoComplete="nope"
            required
            max="10"
            tabIndex="0"
          />
          <small className="pn-input__error">
            This is not a valid phone number
          </small>
        </div>
      </div>

      {/* Dropdown */}
      <div className="pn-dropdown" id="js_dropdown">
        <div className="pn-search">
          <svg
            className="pn-search__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#103155"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            placeholder="Search for countries"
            className="pn-search__input search"
            type="search"
            id="js_search-input"
            autoComplete="nope"
          />
        </div>
        {/* Country list */}
        <ul className="pn-list list" id="js_list"></ul>
        <div
          className="pn-list-item pn-list-item--no-results"
          style={{ display: 'none' }}
          id="js_no-results-found"
        >
          No results found
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
