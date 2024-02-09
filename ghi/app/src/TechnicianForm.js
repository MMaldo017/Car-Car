import React, { useState } from 'react';
import {
    formContainerStyle,
    formTitleStyle,
    formGroupStyle,
    labelStyle,
    inputStyle,
    buttonStyle
  } from './ModelForm.styles';

function TechnicianForm() {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [employee_id, setEmployee_id] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            first_name,
            last_name,
            employee_id,
        };

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch("http://localhost:8080/api/technicians/", fetchConfig);
            if (response.ok) {
                const newTechnician = await response.json();
                console.log(newTechnician);
                setFirst_name('');
                setLast_name('');
                setEmployee_id('');
            } else {
                console.error('HTTP error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };

    return (
        <div style={formContainerStyle}>
          <h1 style={formTitleStyle}>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="add-technician-form">
            <div style={formGroupStyle}>
              <label htmlFor="first_name" style={labelStyle}>First Name</label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                style={inputStyle}
                placeholder="First name..."
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="last_name" style={labelStyle}>Last Name</label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                style={inputStyle}
                placeholder="Last name..."
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="employee_id" style={labelStyle}>Employee ID</label>
              <input
                type="text"
                id="employee_id"
                value={employee_id}
                onChange={(e) => setEmployee_id(e.target.value)}
                style={inputStyle}
                placeholder="Employee ID..."
                required
              />
            </div>
            <button style={buttonStyle} type="submit">Create</button>
          </form>
        </div>
      );
    }

    export default TechnicianForm;