import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelList from './ModelList';
import ModelForm from './ModelForm';

import ManufacturerList from './ManufacturerList';
import CreateManufacturer from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechnicianList';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentsList from './ServiceAppointmentList';
import ServiceHistory from './ServiceHistory';

const rootStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #BFC0C0, #636363)',
  color: '#363636',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Georgia, "Times New Roman", Times, serif',
};
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div style={rootStyle}>
      <div className="container">
        <Routes>
          <Route path="/models/list" element={<ModelList />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/manufacturers/list" element={<ManufacturerList />} />
          <Route path="/manufacturer/create" element={<CreateManufacturer />} />
          <Route path="/automobiles/list" element={<AutomobileList />} />
          <Route path="/create/automobile" element={<AutomobileForm />} />
          <Route path="/technicians/list" element={<TechniciansList />} />
          <Route path="/create/technicians" element={<TechnicianForm />} />
          <Route path="/create/appointment" element={<ServiceAppointmentForm />} />
          <Route path="/appointment/list" element={<ServiceAppointmentsList />} />
          <Route path="/service/history" element={<ServiceHistory />} />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
