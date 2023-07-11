import React from 'react'
import './device.css'

const Device = ({product, pname, deviceConfig, setDeviceConfig}) => {
  const handleInputClick = (event) => {
    event.target.select(); // Select the input's text when clicked
  };

  // updates device value dynamically
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = parseInt(value, 10); // Convert the input value to an integer

    if (isNaN(newValue) || newValue < 0 || newValue > 100) { // Check if the parsed value is not a number or falls outside the range 0-100
      if (value === '') { // Set newValue as an empty string if the input value is also empty
        newValue = '';
      } else {
        event.target.value = deviceConfig[name]; // Reset the input value to the previous value stored in deviceConfig
        return;
      }
    }
    // Update the deviceConfig state using the previous state
    setDeviceConfig((prevConfig) => ({
      ...prevConfig,
      [name]: newValue, // Sets value of device name to newValue to be returned to update state of deviceConfig variable
    }));
  };

  // when clicking off of input box, handles invalid values. Set deviceConfig# to 0
  const handleInputBlur = (event) => {
    const { name } = event.target;
    const currentValue = deviceConfig[name];

    if (currentValue === '') {
      event.target.value = 0; // Set the input value to 0 if the current value is an empty string
      setDeviceConfig((prevConfig) => ({
        ...prevConfig,
        [name]: 0,
      }));
    }
  }

  // decreases value of deviceconfig by 1 (cannot go below 0)
  const handleDecrement = (event) => {
    const { name } = event.target;
    const currentValue = deviceConfig[name];

    if (currentValue > 0) {
      setDeviceConfig((prevConfig) => ({
        ...prevConfig,
        [name]: currentValue - 1,
      }));
    }    
  };

  // increases value of deviceconfig by 1 (cannot go above 100)
  const handleIncrement = (event) => {
    const { name } = event.target;
    const currentValue = deviceConfig[name];

    if (currentValue < 100) {
      setDeviceConfig((prevConfig) => ({
        ...prevConfig,
        [name]: currentValue + 1,
      }));
    }
  };

  return (
    <div className='tesla__devices-container_device'>
      <div className='tesla__devices-container_device-content'>
        <p>{pname}</p>
        <div className='tesla__devices-container_device-widget'>
          <button
            type='button'
            className='tesla__devices-container_device_minus-btn'
            name={product}
            onClick={handleDecrement}
            disabled={deviceConfig[product] === 0}
            >
              –
          </button>
          <input            
            type='number'
            className='tesla__devices-container_device_input'
            name={product}
            value={deviceConfig[product]}
            onClick={handleInputClick}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <button
            type='button'
            className='tesla__devices-container_device_plus-btn'
            name={product}
            onClick={handleIncrement}
            disabled={deviceConfig[product] === 100}
            >
              +
          </button>
        </div>
      </div>      
    </div>
  )
}

export default Device;