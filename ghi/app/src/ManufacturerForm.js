import React, { useState } from 'react';
import {
    formContainerStyle,
    formTitleStyle,
    formGroupStyle,
    inputStyle,
    buttonStyle
} from './ModelForm.styles';

function ManufacturerForm() {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name };

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const response = await fetch(manufacturerUrl, fetchConfig);
            if (response.ok) {
                const newManufacturer = await response.json();
                console.log(newManufacturer);
                setName('');
                setErrorMessage('');
            } else {
                if (response.status === 409) {
                    setErrorMessage('Manufacturer has already been added.');
                } else {
                    setErrorMessage('Manufacturer has already been added.');
                }
            }
        } catch (error) {
            console.error('Network error:', error.message);
            setErrorMessage('A network error occurred. Please try again.');
        }
    };

    return (
        <div style={formContainerStyle}>
          <h1 style={formTitleStyle}>Create a Manufacturer</h1>
          {errorMessage && <div style={{ color: 'white', margin: '10px 0' }}>{errorMessage}</div>}
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div style={formGroupStyle}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Manufacturer name..."
                required
                type="text"
                name="name"
                id="name"
                style={inputStyle}
              />
            </div>
            <button style={buttonStyle} type="submit">Create</button>
          </form>
        </div>
    );
}

export default ManufacturerForm;
