import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelList from './ModelList';
import ModelForm from './ModelForm';

import ManufacturerList from './ManufacturerList';
import CreateManufacturer from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalesPerson';
import SalespeopleList from './ListSalesPeople';
import AddCustomerForm from './CustomerForm';
import CustomersList from './CustomerList';
import NewSaleForm from './NewSale';
import SalesList from './SalesList';
import SalespersonHistory from './SalesPersonHis';
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/models" element={<ModelList />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/create/manufacturer" element={<CreateManufacturer />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/create/automobile" element={<AutomobileForm />} />
          <Route path="/salespeople/create" element={<SalespersonForm />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/customer/add" element={<AddCustomerForm />} />
          <Route path="/customer" element={<CustomersList />} />
          <Route path="/sales/new" element={<NewSaleForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/salespeople/history" element={<SalespersonHistory/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
