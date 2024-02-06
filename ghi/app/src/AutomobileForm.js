import React, { useState, useEffect } from 'react';

function AutomobileForm() {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [modelId, setModelId] = useState('');
    const [models, setModels] = useState([]);

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
                const newAutomobile = await response.json();
                console.log(newAutomobile);
            } else {
                console.error('HTTP error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <div className="shadow p-4 mt-4">
                        <h2>Add an automobile to inventory</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="form-control"
                                    placeholder="Color..."
                                    required
                                />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="form-control"
                                    placeholder="Year..."
                                    required
                                />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="vin"
                                    value={vin}
                                    onChange={(e) => setVin(e.target.value)}
                                    className="form-control"
                                    placeholder="VIN..."
                                    required
                                />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    id="model"
                                    value={modelId}
                                    onChange={(e) => setModelId(e.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select a model</option>
                                    {models.map(model => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="model">Choose a model</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;