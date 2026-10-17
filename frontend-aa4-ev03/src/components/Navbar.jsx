import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛒 Mi Sistema - AA4_EV03
        </Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Inicio
          </Link>
          <Link className="btn btn-primary" to="/productos">
            Gestionar Productos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;