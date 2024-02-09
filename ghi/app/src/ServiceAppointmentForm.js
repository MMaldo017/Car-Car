import React, { useState, useEffect } from 'react';
import {
    formContainerStyle,
    formTitleStyle,
    formGroupStyle,
    labelStyle,
    inputStyle,
    selectStyle,
    buttonStyle
  } from './ModelForm.styles';

function ServiceAppointmentForm() {
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician_id, setTechnicianId] = useState('');
    const [technician, setTechnician] = useState([]);

    useEffect(() => {
        const getTechnicianData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/technicians/");
                if (response.ok) {
                    const data = await response.json();
                    setTechnician(data.technicians);
                } else {
                    console.error('HTTP error:', response.statusText);
                }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        };

        getTechnicianData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            vin,
            customer,
            date_time: dateTime,
            reason,
            technician_id: technician_id,
            status: "scheduled",
        };

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch("http://localhost:8080/api/appointments/", fetchConfig);
            if (response.ok) {
                const newAppointment = await response.json();
                console.log(newAppointment);
                setVin('');
                setCustomer('');
                setDateTime('');
                setReason('');
                setTechnicianId('');
            } else {
                console.error('Failed to create appointment:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };
    return (
        <div style={formContainerStyle}>
          <h1 style={formTitleStyle}>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-service-appointment-form">
            <div style={formGroupStyle}>
              <label htmlFor="vin" style={labelStyle}>Automobile VIN</label>
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                style={inputStyle}
                placeholder="Enter VIN"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="customer" style={labelStyle}>Customer</label>
              <input
                type="text"
                id="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                style={inputStyle}
                placeholder="Enter customer's name"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="date_time" style={labelStyle}>Date and Time</label>
              <input
                type="datetime-local"
                id="date_time"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="reason" style={labelStyle}>Reason</label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={inputStyle}
                placeholder="Enter reason for service"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="technician" style={labelStyle}>Technician</label>
              <select
                id="technician"
                value={technician_id}
                onChange={(e) => setTechnicianId(e.target.value)}
                style={selectStyle}
                required
              >
                <option value="">Choose a technician...</option>
                {technician.map(tech => (
                  <option key={tech.id} value={tech.id}>
                    {tech.first_name} {tech.last_name}
                  </option>
                ))}
              </select>
            </div>
            <button style={buttonStyle} type="submit">Create</button>
          </form>
        </div>
      );
    }

    export default ServiceAppointmentForm;