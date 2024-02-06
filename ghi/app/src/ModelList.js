import {useEffect, useState} from 'react';

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
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture URL</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => (
                    <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.id}</td>
                    <td>
                        <img
                        src={model.picture_url}
                        alt={model.name}
                        style={{width: '100px', height: 'auto'}}
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