import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import PageParametros from './routes/Parametros/PageParametros';
import PageABProveedor from './routes/ABProveedor/PageABProveedor';
import PageABMEstadoOrdenCompra from './routes/ABMEstadoOrdenCompra/PageABMEstadoOrdenCompra';
import PageABMModeloInventario from './routes/ABMModeloInventario/PageABMModeloInventario';

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* MAIN PAGE */}
        <Route path="/" element={
          <>
            {isMainPage && (
              <div className="main-buttons">
                <Link to="/Parametros">
                  <button>Parámetros</button>
                </Link>
                {/* AGREGAR MÁS BOTONES ACÁ CUANDO ESTÉN LISTOS */}
              </div>
            )}
          </>
        } />

        {/* Agregar rutas ACÁ abajo a medida que se necesite */}
        <Route path="/Parametros" element={<PageParametros />}>
          <Route path="ABProveedor" element={<PageABProveedor />} />
          <Route path="ABMEstadoOrdenCompra" element={<PageABMEstadoOrdenCompra />} />
          <Route path="ABMModeloInventario" element={<PageABMModeloInventario />} />
        </Route>
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