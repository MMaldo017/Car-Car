import React, { useState } from 'react';

function ManufacturerForm() {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name
        };

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);
            setName('');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a manufacturer</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Manufacturer name..."
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"/>
                                <label htmlFor="name">Manufacturer name</label>
                            </div>
                            <button className="btn btn-primary" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerForm;