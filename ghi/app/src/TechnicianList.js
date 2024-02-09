import React, { useState, useEffect } from 'react';
import {
  listContainerStyle,
  rowStyle,
  headerGradientStyle
} from './List.styles';

function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    async function getTechnicianData() {
      try {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    }
    getTechnicianData();
  }, []);

  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Technicians</h2>
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(tech => (
            <tr key={tech.employee_id} style={rowStyle}>
              <td>{tech.employee_id}</td>
              <td>{tech.first_name}</td>
              <td>{tech.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TechniciansList;
