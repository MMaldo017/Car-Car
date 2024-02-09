import React, { useState } from 'react';

function AddCustomerForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber
    };

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch("http://localhost:8090/api/customers/", fetchConfig);
      if (response.ok) {
        const newCustomer = await response.json();
        console.log(newCustomer);
        
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
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
            <h2>Add a Customer</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  placeholder="First Name..."
                  required
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  placeholder="Last Name..."
                  required
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Address..."
                  required
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control"
                  placeholder="Phone Number..."
                  required
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerForm;