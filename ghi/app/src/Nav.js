import { NavLink } from 'react-router-dom';

function Nav() {
  const checkeredStyle = {
    backgroundImage: `
      linear-gradient(45deg, #000 25%, transparent 25%),
      linear-gradient(-45deg, #000 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #000 75%),
      linear-gradient(-45deg, transparent 75%, #000 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    color: 'white',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={checkeredStyle}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ color: 'white' }}>CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="modelsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Models
              </a>
              <ul className="dropdown-menu" aria-labelledby="modelsDropdown">
                <li><NavLink className="dropdown-item" to="/models/create">Create Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/list">Models</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="manufacturersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
              </a>
              <ul className="dropdown-menu" aria-labelledby="manufacturersDropdown">
                <li><NavLink className="dropdown-item" to="/manufacturer/create">Create a Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/list">Manufacturers</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="automobilesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Automobiles
              </a>
              <ul className="dropdown-menu" aria-labelledby="automobilesDropdown">
                <li><NavLink className="dropdown-item" to="/create/automobile">Create an Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/list">Automobiles</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="techniciansDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu" aria-labelledby="techniciansDropdown">
                <li><NavLink className="dropdown-item" to="/create/technicians">Create a Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/list">Technicians</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li><NavLink className="dropdown-item" to="/create/appointment">Create a Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointment/list">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/service/history">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
