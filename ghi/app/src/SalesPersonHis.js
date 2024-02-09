import React, { useState, useEffect } from 'react';


function SalespersonHistory() {
  const [salesHistory, setSalesHistory] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  useEffect(() => {
    // Fetch sales history data
    const fetchSalesHistory = async () => {
      const response = await fetch('http://localhost:8090/api/sales/');

      if (response.ok) {
        const data = await response.json();
        setSalesHistory(data.sales);
      }
    };

    // Fetch salespeople data
    const fetchSalespeople = async () => {
      const response = await fetch('http://localhost:8090/api/salespeople/');

      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
      }
    };

    fetchSalesHistory();
    fetchSalespeople();
  }, []);

  const handleSalespersonChange = (salespersonId) => {
    setSelectedSalesperson(salespersonId);
  };

  const filteredSales = selectedSalesperson
    ? salesHistory.filter(sale => sale.salesperson.id.toString() === selectedSalesperson)
    : salesHistory;

  return (
    <div className="container">
      <h2>Salesperson History</h2>
      <label>
        Select Salesperson:
        <select
          value={selectedSalesperson}
          onChange={(e) => handleSalespersonChange(e.target.value)}
        >
          <option value="" disabled>Select a salesperson</option>
          {salespeople.map(salesperson => (
            <option key={salesperson.id} value={salesperson.id}>
              {salesperson.first_name} {salesperson.last_name} (ID: {salesperson.employee_id})
            </option>
          ))}
        </select>
      </label>

      {filteredSales.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>Automobile VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id}>
                <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name} (ID: ${sale.salesperson.employee_id})`}</td>
                <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalespersonHistory;
