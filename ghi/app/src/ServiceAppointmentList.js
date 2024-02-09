import React, { useState, useEffect } from 'react';
import { listContainerStyle, rowStyle, headerGradientStyle, buttonStyle } from './List.styles';

function ServiceAppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments/");
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      const filteredAppointments = filterAppointmentsByStatus(data.appointments);
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const filterAppointmentsByStatus = (appointments) => {
    return appointments.filter(appointment => appointment.status === 'scheduled');
  };


  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Service Appointments</h2>
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} style={rowStyle}>
              <td>{appointment.vin}</td>
              <td>{appointment.status}</td>
              <td>{appointment.customer}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
              <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
              <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
              <td>{appointment.reason}</td>
              <td>
                <button style={buttonStyle} className="btn" onClick={() => updateAppointmentStatus(appointment.id, 'cancel')}>Cancel</button>
                <button style={{ ...buttonStyle, backgroundColor: 'yellow' }} className="btn" onClick={() => updateAppointmentStatus(appointment.id, 'finish')}>Finish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceAppointmentsList;
