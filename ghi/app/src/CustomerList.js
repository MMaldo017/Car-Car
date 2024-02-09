import { useEffect, useState } from 'react';

function CustomersList() {
  const [customer, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomersData = async () => {
      const response = await fetch('http://localhost:8090/api/customers/');

      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customer);
      }
    }

    getCustomersData();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customer.map(customer => (
            <tr key={customer.id}>
              <td>{customer.first_name} {customer.last_name}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersList;