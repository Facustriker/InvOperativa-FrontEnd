import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import ABProveedor from './routes/ABProveedor/PageABProveedor';

function App() {
  const location = useLocation(); // <- Agarra la página actual

  // Rutas donde NO queremos mostrar el header
  const noHeaderRoutes = ['/ABProveedor'];

  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showHeader && (
        <header className="App-header">
          <h1>Bienvenido a InventAR.io</h1>
          <Link to="/ABProveedor" style={{ textDecoration: 'none', color: 'black' }}>
            <button>Proveedores</button>
          </Link>
        </header>
      )}
      <Routes>
        <Route path="/ABProveedor" element={<ABProveedor />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;