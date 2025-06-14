import React from 'react'

const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input");
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
    getWeatherDetails(API_URL);
  }

  const handleLocationSearch = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;

        console.log(position);
        getWeatherDetails(API_URL);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    )
  }

  return (
    <div className="search-cont">
      <form action="#" className='search-form' onSubmit={handleCitySearch}>

        <span className="material-symbols-outlined">search</span>
        <input type="search" placeholder="Enter City..." ref={searchInputRef} className='search-input' required />

      </form>
      <button className="button-locat" onClick={handleLocationSearch}>
        <span className="material-symbols-outlined">my_location</span>
      </button>
    </div>
  )
}

export default SearchSection