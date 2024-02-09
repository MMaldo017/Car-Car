import React, { useState, useEffect } from 'react';
import { formContainerStyle, formTitleStyle, formGroupStyle, labelStyle, inputStyle, selectStyle, buttonStyle, imagePreviewContainerStyle, imagePreviewStyle } from './ModelForm.styles';

function ModelForm() {
    const [modelName, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

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

    useEffect(() => {
        setImagePreview(pictureUrl);
    }, [pictureUrl]);

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
                setModelName('');
                setPictureUrl('');
                setManufacturerId('');
                setImagePreview('');
            } else {
                console.error('HTTP error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={formTitleStyle}>Create a Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="add-model-form">
                <div style={formGroupStyle}>
                    <label htmlFor="modelName" style={labelStyle}>Model Name</label>
                    <input
                        type="text"
                        id="modelName"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        style={inputStyle}
                        placeholder="Enter model name..."
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="pictureUrl" style={labelStyle}>Picture URL</label>
                    <input
                        type="url"
                        id="pictureUrl"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        style={inputStyle}
                        placeholder="Enter picture URL..."
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="manufacturer" style={labelStyle}>Choose a Manufacturer</label>
                    <select
                        id="manufacturer"
                        value={manufacturerId}
                        onChange={(e) => setManufacturerId(e.target.value)}
                        style={selectStyle}
                        required
                    >
                        <option value="">Select a manufacturer</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button style={buttonStyle} type="submit">Create</button>
            </form>
            {imagePreview && (
                <div style={imagePreviewContainerStyle}>
                    <img src={imagePreview} alt="Preview" style={imagePreviewStyle} />
                </div>
            )}
        </div>
    );
}

export default ModelForm;
