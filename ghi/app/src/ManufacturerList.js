import React, { useState, useEffect } from 'react';
import { listContainerStyle, rowStyle, headerGradientStyle } from './List.styles';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    async function getManufacturersData() {
      try {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
        } else {
          console.error('Error fetching data: ', response.statusText);
        }
      } catch (error) {
        console.error('Network error: ', error.message);
      }
    }
    getManufacturersData();
  }, []);

  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Manufacturers</h2>
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>Manufacturer Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => (
            <tr key={manufacturer.id} style={rowStyle}>
              <td>{manufacturer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerList;
