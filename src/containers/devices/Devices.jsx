import React, { useState } from 'react';
import { Device, Block } from '../../components';
import resetLogo from '../../assets/reset.png';
import './devices.css';

const Devices = () => {
  const [deviceConfig, setDeviceConfig] = useState({
    device1: 0,
    device2: 0,
    device3: 0,
    device4: 0,
    device5: 0,
  });

  const [totals, setTotals] = useState({ cost: 0, energy: 0 });
  const [optimalSize, setOptimalSize] = useState({ length: 0, width: 0 });
  const [boxLayout, setBoxLayout] = useState([]);

  const deviceCosts = [120000, 80000, 50000, 20000, 10000];
  const deviceSizes = [[40, 10], [30, 10], [30, 10], [20, 10], [10, 10]];
  const deviceEnergies = [4, 3, 2, 1, -0.25];

  const resetDeviceValues = () => {
    setDeviceConfig({
      device1: 0,
      device2: 0,
      device3: 0,
      device4: 0,
      device5: 0,
    });
  };

  const calculateTotals = () => {
    let cost = 0;
    let energy = 0;

    for (const [deviceKey, value] of Object.entries(deviceConfig)) {
      const deviceIndex = Number(deviceKey.replace('device', '')) - 1;
      const deviceValue = value;

      const deviceCost = deviceCosts[deviceIndex];
      const deviceEnergy = deviceEnergies[deviceIndex];

      cost += deviceValue * deviceCost;
      energy += deviceValue * deviceEnergy;
    }

    setTotals({ cost, energy });
  };

  const handleCalculateClick = () => {
    let batteries = (deviceConfig.device1 + deviceConfig.device2 + deviceConfig.device3 + deviceConfig.device4);
    const device5Needed = Math.floor( batteries / 4 );
    if (device5Needed > deviceConfig.device5) {
      alert(`You need to buy ${device5Needed - deviceConfig.device5} more Transformers`)
      return;
    }
    calculateTotals();
    calculateOptimalSize();
  };

  const calculateOptimalSize = () => {
    const boxes = deviceSizes.map((sizes,index) => ({
      length: sizes[0],
      width: sizes[1],
      count: deviceConfig[`device${index + 1}`],
    }));
    const { length, width } = findOptimalSize(boxes);
    setOptimalSize({ length, width });

    const layout = [];
    boxes.forEach((box) => {
      const boxCount = box.count;
      const boxWidth = box.width;
      const boxLength = box.length;
      for (let i = 0; i < boxCount; i++) {
        layout.push({ width: boxWidth, length: boxLength });
      }
    });
    setBoxLayout(layout);
  };

  const calculateArea = (box) => {
    return box.length * box.width;
  };

  const findOptimalSize = (boxes) => {
    const sortedBoxes = boxes.sort((a, b) => calculateArea(b) - calculateArea(a));
  
    let length = 0;
    let width = 0;
  
    sortedBoxes.forEach((box) => {
      const boxLength = box.length;
      const boxWidth = box.width;
      const boxCount = box.count;
  
      for (let i = 0; i < boxCount; i++) {
        if (length + boxLength <= width && width <= 100) {
          length += boxLength;
        } else if (width + boxWidth <= 100) {
          width += boxWidth;
        } else {
          length += boxLength;
        }
      }
    });
  
    return { length, width };
  };
  
  

  return (
    <div className='tesla__devices section__padding' id='test'>
      <div className='tesla__devices-container'>
        <div className='tesla__devices-container_groupA'>
          <div className='tesla__devices-container_groupA-heading'>
            <h1>Devices</h1>
            <div className='tesla__devices_groupA-logo'>
              <img src= {resetLogo} alt='reset_logo' onClick={resetDeviceValues} />
            </div>
          </div>
          <div className='tesla__devices-container_groupA-products'>
            <Device product='device1' pname='Megapack 2XL' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device2' pname='Megapack 2' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device3' pname='Megapack' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device4' pname='Powerpack' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device5' pname='Transformer' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <div className='tesla__devices-container_groupA-products-calculate'>
              <p>*Note: For every 4 batteries, you need to buy 1 transformer*</p>
              <button type='button' onClick={handleCalculateClick}>
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div className='tesla__devices-container_groupB'>
          <div className='tesla__devices-container_totals'>
            <p>Total Cost: ${totals.cost.toLocaleString("en-US")}</p>
            <p>Total Size: {optimalSize.length}FT x {optimalSize.width}FT</p>
            <p>Total Energy: {totals.energy} MWh</p>
          </div>
        </div>
      </div>
      <div className='tesla__devices-layout'>
        <div className='tesla__devices-layout_frame'>
          {boxLayout.map((box, index) => (
            <div
              key={index}
              className='tesla__devices-layout_frame-box'
              style={{ width: `${box.width * 7.884}px`, height: `${box.length * 7.884}px` }}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devices;
