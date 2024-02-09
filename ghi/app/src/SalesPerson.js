import React, { useState } from 'react';

function SalespersonForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId
    };

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:8090/api/salespeople/', fetchConfig);

    if (response.ok) {
      setFirstName('');
      setLastName('');
      setEmployeeId('');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <div className="shadow p-4 mt-4">
            <h2>Add a Salesperson</h2>
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
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="form-control"
                  placeholder="Employee ID..."
                  required
                />
                <label htmlFor="employeeId">Enter Your Four Digit Employee ID</label>
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;