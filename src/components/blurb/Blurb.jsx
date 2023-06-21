import React from 'react'
import './blurb.css'

const Blurb = ({ name, dimension, energy, cost, date }) => {
  return (
    <div className='tesla__descripts-container_blurb'>
      <div className='tesla__descripts-container_blurb-content'>
        <h3>{name}</h3>
        <div>
          <p>Size: {dimension}</p>
          <p>Energy: {energy}</p>
          <p>Cost: {cost}</p>
          <p>Release Date: {date}</p>
        </div>
      </div>
    </div>
  )
}

export default Blurb