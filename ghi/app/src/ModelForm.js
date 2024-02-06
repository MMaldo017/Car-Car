import React, { useState, useEffect } from 'react';

function ModelForm() {
    const [modelName, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const getManufacturersData = async () => {
            try {
                const response = await fetch("http://localhost:8100/api/manufacturers/");
                if (response.ok) {
                    const data = await response.json();
                    setManufacturers(data.manufacturers);
                } else {
                    console.error('HTTP error:', response.statusText);
                }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        };

        getManufacturersData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: modelName,
            picture_url: pictureUrl,
            manufacturer_id: manufacturerId
        };

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch("http://localhost:8100/api/models/", fetchConfig);
            if (response.ok) {
                const newModel = await response.json();
                console.log(newModel);
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
                        <h2>Create a vehicle model</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="modelName"
                                    value={modelName}
                                    onChange={(e) => setModelName(e.target.value)}
                                    className="form-control"
                                    placeholder="Model name..."
                                    required
                                />
                                <label htmlFor="modelName">Model name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="url"
                                    id="pictureUrl"
                                    value={pictureUrl}
                                    onChange={(e) => setPictureUrl(e.target.value)}
                                    className="form-control"
                                    placeholder="Picture URL..."
                                    required
                                />
                                <label htmlFor="pictureUrl">Picture URL</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    id="manufacturer"
                                    value={manufacturerId}
                                    onChange={(e) => setManufacturerId(e.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select a manufacturer</option>
                                    {manufacturers.map((manufacturer) => (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="manufacturer">Choose a manufacturer</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelForm;