import React, { useState, useEffect } from 'react';
import {
  listContainerStyle,
  rowStyle,
  headerGradientStyle
} from './List.styles';

function AutomobileList() {
  const [automobiles, setAutomobiles] = useState([]);

  useEffect(() => {
    async function getAutomobilesData() {
      try {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (response.ok) {
          const data = await response.json();
          setAutomobiles(data.autos);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    }
    getAutomobilesData();
  }, []);

  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Automobiles</h2>
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(auto => (
            <tr key={auto.vin} style={rowStyle}>
              <td>{auto.vin}</td>
              <td>{auto.color}</td>
              <td>{auto.year}</td>
              <td>{auto.model.name}</td>
              <td>{auto.model.manufacturer.name}</td>
              <td>{auto.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutomobileList;
