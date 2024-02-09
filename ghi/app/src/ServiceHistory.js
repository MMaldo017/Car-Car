import React, { useState, useEffect } from 'react';
import {
  listContainerStyle,
  rowStyle,
  headerGradientStyle
} from './List.styles';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchVin, setSearchVin] = useState('');
  const [error, setError] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filterAppointments = () => {
      if (!searchVin.trim()) {
        setFilteredAppointments(appointments);
      } else {
        const filtered = appointments.filter(app => app.vin.includes(searchVin));
        setFilteredAppointments(filtered.length > 0 ? filtered : []);
        setError(filtered.length > 0 ? false : 'No appointments found with that VIN.');
      }
    };
    filterAppointments();
  }, [searchVin, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments/");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch appointments');
    }
  };

  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Service History</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by VIN..."
          value={searchVin}
          onChange={(e) => setSearchVin(e.target.value)}
          style={{ ...rowStyle, marginBottom: '10px', color: 'black' }}
        />
      </div>
      {error && <div className="alert alert-danger" role="alert" style={{ color: 'white', backgroundColor: 'red' }}>{error}</div>}
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason for Service</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index} style={rowStyle}>
              <td>{appointment.vin}</td>
              <td>{appointment.status}</td>
              <td>{appointment.customer}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
              <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
              <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
