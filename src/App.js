import React from 'react'

import { Navbar } from './components';
import { Devices, Layout, Descriptions } from './containers';
import './App.css'

const App = () => {
  return (
    <div className='App'>
        <div className='gradient__bg'>
            <Navbar />
            <Descriptions />
        </div>
        <Devices />
        <Layout />
    </div>
  )
}

export default App