import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Estilos

import CrearArticulo from './routes/CrearArticulo/PageCrearArticulo'; // Importamos la página de Crear Artículo

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bienvenido a la App de Artículos</h1>
          {/* Enlace para navegar a la página de Crear Artículo */}
          <Link to="/CrearArticulo" style={{ textDecoration: 'none', color: 'black' }}>
            <button>Crear Artículo</button>
          </Link>
        </header>
        <Routes>
          <Route path="/CrearArticulo" element={<CrearArticulo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
