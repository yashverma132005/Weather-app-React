import React from 'react'

const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="curr">
      <img src={`icons/${currentWeather.weatherIcon || 'clear'}.svg`} className="weather-i" alt="Weather icon" />

      <h2 className='temperature'>
        {currentWeather.temperature} <span>°C</span>
      </h2>
      <p className='description'>{currentWeather.description || 'No data available'}</p>
    </div>
  )
}

export default CurrentWeather