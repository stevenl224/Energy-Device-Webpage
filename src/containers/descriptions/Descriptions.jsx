import React from 'react'
import { Blurb } from '../../components'
import './descriptions.css'

const Descriptions = () => {
  return (
    <div className='tesla__descripts section__padding' id='deviceinfo'>
      <div className='tesla__descripts-heading'>
        <h1>Device Information</h1>
      </div>
      <div className='tesla__descripts-container'>
        <div className='tesla__descripts-container_batteries'>
          <Blurb name='Megapack 2XL' dimension='40FT x 10FT' energy='4 MWh' cost='$120,000' date='2022'/>
          <Blurb name='Megapack 2' dimension='30FT x 10FT' energy='3 MWh' cost='$80,000' date='2021'/>
          <Blurb name='Transformer' dimension='10FT x 10FT' energy='-0.25 MWh' cost='$10,000' date='----'/>
          <Blurb name='Megapack' dimension='30FT x 10FT' energy='2 MWh' cost='$50,000' date='2005'/>
          <Blurb name='Powerpack' dimension='10FT x 10FT' energy='1 MWh' cost='$20,000' date='2000'/>
        </div>
      </div>
    </div>
  )
}

export default Descriptions