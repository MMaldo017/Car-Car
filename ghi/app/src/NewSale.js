import React, { useState, useEffect } from 'react';

function NewSaleForm() {
  const [automobile, setAutomobile] = useState([]);
  const [automobileVin, setAutomobileVin] = useState('');
  const [salespeople, setSalesPeople] = useState([]);
  const [salespersonEmployeeId, setSalesPerson] = useState('');
  const [customers, setCustomers] = useState([]);
  const [customerFirstName, setCustomer] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const getAutomobileData = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (response.ok) {
          const data = await response.json();
          setAutomobile(data.autos);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    getAutomobileData();
  }, []);

  useEffect(() => {
    const getSalesPersonData = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
          const data = await response.json();
          setSalesPeople(data.salespeople);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    getSalesPersonData();
  }, []);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customer);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    getCustomerData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employeeId = parseInt(salespersonEmployeeId, 10);

    if (isNaN(employeeId)) {
      console.error('Invalid employee ID:', salespersonEmployeeId);
      return;
  }
    const data = {
      price,
      automobile: automobileVin,
      salesperson: employeeId,
      customer: customerFirstName,
    };

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch("http://localhost:8090/api/sales/", fetchConfig);
      console.log('Response Status:', response.status)
      if (response.ok) {
        const newSale = await response.json();
        console.log('After Reqiest - New Sale:', newSale);
        setAutomobileVin('');
        setSalesPerson('');
        setCustomer('');
        setPrice('');
      } else {
        console.error('Failed to record the sale:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3">
      <div className="shadow p-4 mt-4">
        <h2>Create a Sale</h2>
        <div className="mb-3">
          <label htmlFor="automobile" className="form-label">
            VIN:
          </label>
          <select
            id="automobile"
            value={automobileVin}
            onChange={(e) => setAutomobileVin(e.target.value)}
            className="form-select"
          >
            <option value="">Select VIN</option>
            {automobile.map((auto) => (
              <option key={auto.vin} value={auto.vin}>
                {auto.vin}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salesperson" className="form-label">
            Employee ID:
          </label>
          <select
            id="salesperson"
            value={salespersonEmployeeId}
            onChange={(e) => setSalesPerson(e.target.value)}
            className="form-select"
          >
            <option value="">Select Employee ID</option>
            {salespeople.map((salesperson) => (
              <option key={salesperson.id} value={salesperson.employee_id}>
                {salesperson.employee_id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customer" className="form-label">
            Customer First Name:
          </label>
          <select
            id="customer"
            value={customerFirstName}
            onChange={(e) => setCustomer(e.target.value)}
            className="form-select"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.first_name}>
                {customer.first_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  </div>
</form>

 

  );
}

export default NewSaleForm;
