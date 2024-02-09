import {useEffect, useState} from 'react';
import React from 'react';
import {
    listContainerStyle,
    imageStyle,
    rowStyle,
    headerGradientStyle
} from './List.styles';

function ModelList(){
    const [models, setModels] = useState ([]);
    useEffect(()=>{
    const getModelsData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }

    }
        getModelsData();
      }, [])

      return (
        <div style={listContainerStyle}>
          <table className="table" style={headerGradientStyle}>
            <thead style={headerGradientStyle}>
              <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture URL</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={model.id} style={rowStyle}>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img
                      src={model.picture_url}
                      alt={model.name}
                      style={imageStyle}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default ModelList;