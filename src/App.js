import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import CrearCoso from './routes/CrearCoso/PageCrearCoso';
import Borrador from './routes/Borrador/pageBorrador';

function App() {
  const location = useLocation(); // <- Agarra la página actual

  // Rutas donde NO queremos mostrar el header
  const noHeaderRoutes = ['/Borrador', '/CrearCoso'];

  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showHeader && (
        <header className="App-header">
          <h1>Bienvenido a la App de Cosos</h1>
          <Link to="/CrearCoso" style={{ textDecoration: 'none', color: 'black' }}>
            <button>Crear Coso</button>
          </Link>
          <Link to="/Borrador" style={{ textDecoration: 'none', color: 'black' }}>
            <button>Ir a términos y condiciones</button>
          </Link>
        </header>
      )}
      <Routes>
        <Route path="/CrearCoso" element={<CrearCoso />} />
        <Route path="/Borrador" element={<Borrador />} />
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