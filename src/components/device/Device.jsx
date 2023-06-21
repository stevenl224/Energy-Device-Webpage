import React from 'react'
import './device.css'

const Device = ({product, pname, deviceConfig, setDeviceConfig}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = parseInt(value, 10);

    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      if (value === '') {
        newValue = '';
      } else {
        event.target.value = deviceConfig[name];
        return;
      }
    }

    setDeviceConfig((prevConfig) => ({
      ...prevConfig,
      [name]: newValue,
    }));
  };

  const handleInputBlur = (event) => {
    const { name } = event.target;
    const currentValue = deviceConfig[name];

    if (currentValue === '') {
      // event.target.value = currentValue;
      event.target.value = 0;
      setDeviceConfig((prevConfig) => ({
        ...prevConfig,
        [name]: 0,
      }));
    }
  }

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