import { NavLink } from 'react-router-dom';

function Nav() {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">CarCar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="row">
        <div className="col">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/models">Models</NavLink>
            <NavLink className="nav-link" to="/models/create">Create Models</NavLink>
            <NavLink className="nav-link" to="/create/manufacturer">Create a Manufacturer</NavLink>
            <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            <NavLink className="nav-link" to="/create/automobile">Create an Automobile</NavLink>
            <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
          </div>
        </div>
        <div className="col">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/salespeople/create">Add Salespeople</NavLink>
            <NavLink className="nav-link" to="/salespeople">Salespeople</NavLink>
            <NavLink className="nav-link" to="/salespeople/history"> Sales People History</NavLink>
            <NavLink className="nav-link" to="/customer/add">Add Customer</NavLink>
            <NavLink className="nav-link" to="/customer">Customers</NavLink>
            <NavLink className="nav-link" to="/sales/new">Record Sales</NavLink>
            <NavLink className="nav-link" to="/sales"> Sales History</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>


  )
}

export default Nav;
