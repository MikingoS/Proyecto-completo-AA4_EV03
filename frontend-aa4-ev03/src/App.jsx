import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductosPage from './pages/ProductosPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="py-2">
        <Routes>
          <Route path="/" element={<ProductosPage />} />
          <Route path="/productos" element={<ProductosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;