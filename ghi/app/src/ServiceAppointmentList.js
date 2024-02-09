import React, { useState, useEffect } from 'react';
import { listContainerStyle, rowStyle, headerGradientStyle, buttonStyle } from './List.styles';

function ServiceAppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [visibleAppointments, setVisibleAppointments] = useState(new Set());

  useEffect(() => {
    fetchAutomobilesAndAppointments();
  }, []);

  const fetchAutomobilesAndAppointments = async () => {
    // Fetch automobiles first
    let automobiles = [];
    try {
      const autoResponse = await fetch("http://localhost:8100/api/automobiles/");
      if (autoResponse.ok) {
        const autoData = await autoResponse.json();
        automobiles = autoData.autos;
      } else {
        throw new Error('Failed to fetch automobiles');
      }
    } catch (error) {
      console.error('Error fetching automobiles:', error);
    }

    // Then fetch appointments
    try {
      const appResponse = await fetch("http://localhost:8080/api/appointments/");
      if (appResponse.ok) {
        const appData = await appResponse.json();
        const appointmentsData = markVIPAppointments(appData.appointments, automobiles);
        setAppointments(appointmentsData);
        setVisibleAppointments(new Set(appointmentsData.map(app => app.id)));
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const markVIPAppointments = (appointments, automobiles) => {
    const vinSet = new Set(automobiles.map(auto => auto.vin));
    return appointments.map(appointment => ({
      ...appointment,
      is_vip: vinSet.has(appointment.vin),
    }));
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    const statusSlug = newStatus; // "cancel" or "finish"
    const url = `http://localhost:8080/api/appointments/${id}/${statusSlug}/`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === id) {
            const updatedStatus = newStatus === 'cancel' ? 'canceled' : 'finished';
            return { ...appointment, status: updatedStatus };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      } else {
        console.error('Failed to update the appointment status:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  return (
    <div style={listContainerStyle}>
      <h2 style={headerGradientStyle}>Service Appointments</h2>
      <table className="table" style={headerGradientStyle}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.filter(appointment => visibleAppointments.has(appointment.id)).map(appointment => (
            <tr key={appointment.id} style={rowStyle}>
              <td>{appointment.vin}</td>
              <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
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
