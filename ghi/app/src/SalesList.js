import { useEffect, useState } from 'react';

function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSalesData = async () => {
      const response = await fetch('http://localhost:8090/api/sales/');

      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
      }
    };

    getSalesData();
  }, []);

  return (
    <div>
      <h2>Sales List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Employee ID</th>
            <th>Customer</th>
            <th>Automobile VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
              <td>{sale.salesperson.employee_id}</td>
              <td>{sale.customer.first_name} {sale.customer.last_name}</td>
              <td>{sale.automobile.vin}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
