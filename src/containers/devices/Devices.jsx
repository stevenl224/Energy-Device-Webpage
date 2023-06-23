import React, { useState } from 'react';
import { Device } from '../../components';
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

  const deviceCosts = [
    120000, // Device 1 cost
    80000, // Device 2 cost
    50000, // Device 3 cost
    20000, // Device 4 cost
    10000 // Device 5 cost
  ];
  const deviceSizes = [
    [40, 10], // Device 1 size
    [30, 10], // Device 2 size
    [30, 10], // Device 3 size
    [10, 10], // Device 4 size
    [10, 10], // Device 5 size
  ];
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
      alert(`You need to add ${device5Needed - deviceConfig.device5} more Transformer(s)`)
      return;
    }
    calculateTotals();
    calculateOptimalSize();
  };

  const calculateOptimalSize = () => {
    const boxes = deviceSizes.map((sizes, index) => ({
      length: sizes[0],
      width: sizes[1],
      count: deviceConfig[`device${index + 1}`],
      config: index + 1
    }));
  
    const { length, width, layout } = findOptimalSize(boxes);
    setOptimalSize({ length, width });
    setBoxLayout(layout);
  };

  const findOptimalSize = (boxes) => {
    let length = 0;
    let width = 0;
    let currWidth = 0;
    let layout = [];
    let newRow = false;
  
    const sortedBoxes = boxes.sort((a, b) => {
      // Sort boxes in descending order of max dimension
      const maxDimA = Math.max(a.length, a.width);
      const maxDimB = Math.max(b.length, b.width);
      return maxDimB - maxDimA;
    });
  
    sortedBoxes.forEach((box) => {
      const boxLength = box.width;
      const boxWidth = box.length;
      const boxCount = box.count;
      const boxConfig = box.config;

      for (let i = 0; i < boxCount; i++) {
        if (boxLength === 10 && boxWidth === 10) {

          if (newRow === false) {
            if (length === 0 && width === 0) {
              length += boxLength;
              width += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
            } else if (width + boxWidth < 100) {
              width += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig }); 
            } else {
              newRow = true;
              width += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
            }
          } else {
            // Handle special case for [10, 10] boxes
            if (layout.includes(0, 0)) {
              let indx = layout.indexOf(0);
              layout.splice(indx, 1, { width: boxWidth, length: boxLength, config: boxConfig });
            }
            else{
              if (currWidth + boxWidth <= 100 && currWidth !== 0) {
                currWidth += boxWidth;
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
              } else {
                length += boxLength;
                currWidth = 0; // reset the next row box width
                currWidth += boxWidth;
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
              }
            }
          }
        } else {
          if (!newRow) {
            if (length === 0 && width === 0) {
              length += boxLength;
              width += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig }); // placing the first block down
            } else if (width + boxWidth < 100) {
              width += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig }); // placing the first block down
            } else if (width + boxWidth === 100){
                newRow = true;
                width += boxWidth;
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
            } else {
              newRow = true;
              const gap = (100 - width) / 10;
              
              for (let n = 0; n < gap; n++) {
                layout.push(0) // placeholder for gaps
              }
              length += boxLength;
              currWidth += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
            }
          } else {
            if (currWidth === 0) {
              length += boxLength;
              currWidth += boxWidth;
              layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
            }
            else {
              if (currWidth + boxWidth <= width) {
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig }); // placing blox in next row, no change in size of length or width
                currWidth += boxWidth;
              } else if (currWidth + boxWidth < 100) {
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
                currWidth += boxWidth;
              } else if ((currWidth + boxWidth === 100)){
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
                width = 100;
                currWidth = 0;
              } else {
                const gap = (100 - currWidth) / 10;
                for (let n = 0; n < gap; n++) {
                  layout.push(0) // placeholder for gaps
                }
                length += boxLength;
                currWidth = 0; // reset the next row box width
                currWidth += boxWidth;
                layout.push({ width: boxWidth, length: boxLength, config: boxConfig });
              }
            }
          }
        }
      }
    });
    
    // finding indexs of placeholders remaining in array
    let placeholders = [];
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 0) {
        placeholders.push(i)
      }
    }
    // removing placeholders from final layout
    for (let o = placeholders.length - 1; o >= 0; o--) {
      layout.splice(placeholders[o],1);
    }

    console.log(layout)

    return { length, width, layout };
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
            <Device product='device1' pname='Megapack 2XL 🔋🟣' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device2' pname='Megapack 2 🔋🔴' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device3' pname='Megapack 🔋🔵' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device4' pname='Powerpack 🔋🟠' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <Device product='device5' pname='Transformer🟡' deviceConfig={deviceConfig} setDeviceConfig={setDeviceConfig} />
            <div className='tesla__devices-container_groupA-products-calculate'>
              <p>*Note: For every 4 batteries (🔋), you need to add 1 transformer*</p>
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
              className={`tesla__devices-layout_frame-box box-${box.width}-${box.config}`}
              style={{ width: `${box.width * 11.9}px`, height: `${box.length * 11.9}px` }}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devices;
