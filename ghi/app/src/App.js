import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import CreateManufacturer from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import CreateAutomobile from './AutomobileForm';
import AutomobileForm from './AutomobileForm';
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/create/manufacturer" element={<CreateManufacturer />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/create/automobile" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
