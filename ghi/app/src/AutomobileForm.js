import React, { useState, useEffect } from 'react';
import { formContainerStyle, formTitleStyle, formGroupStyle, labelStyle, inputStyle, selectStyle, buttonStyle } from './ModelForm.styles';

function AutomobileForm() {
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [modelId, setModelId] = useState('');
  const [models, setModels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getModelsData = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/models/");
        if (response.ok) {
          const data = await response.json();
          setModels(data.models);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    getModelsData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      color,
      year,
      vin,
      model_id: modelId
    };

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch("http://localhost:8100/api/automobiles/", fetchConfig);
      if (response.ok) {
        setColor('');
        setYear('');
        setVin('');
        setModelId('');
        setErrorMessage('');
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setErrorMessage('This VIN has been used before. Please use a unique VIN.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formTitleStyle}>Add an Automobile to Inventory</h2>
      {errorMessage && <div style={{ color: 'white', marginBottom: '1rem' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="color" style={labelStyle}>Color</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={inputStyle}
            placeholder="Color..."
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="year" style={labelStyle}>Year</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={inputStyle}
            placeholder="Year..."
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="vin" style={labelStyle}>VIN</label>
          <input
            type="text"
            id="vin"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            style={inputStyle}
            placeholder="VIN..."
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="model" style={labelStyle}>Choose a Model</label>
          <select
            id="model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>Create</button>
      </form>
    </div>
  );
}

export default AutomobileForm;
