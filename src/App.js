import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import PageParametros from './routes/Parametros/PageParametros';
import PageABMProveedor from './routes/ABMProveedor/PageABMProveedor';
import PageABMEstadoOrdenCompra from './routes/ABMEstadoOrdenCompra/PageABMEstadoOrdenCompra';
import PageABMModeloInventario from './routes/ABMModeloInventario/PageABMModeloInventario';
import PageModificarEstado from './routes/ABMEstadoOrdenCompra/PageModificarEstado';
import PageAltaEstado from './routes/ABMEstadoOrdenCompra/PageAltaEstado';
import PageAltaProveedor from './routes/ABMProveedor/PageAltaProveedor';
import PageModificarProveedor from './routes/ABMProveedor/PageModificarProveedor';

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
          <Route path="ABMProveedor" element={<PageABMProveedor />}>
            <Route path="PageAltaProveedor" element={<PageAltaProveedor />} />
            <Route path="PageModificarProveedor/:id" element={<PageModificarProveedor />} />
          </Route>
          <Route path="ABMEstadoOrdenCompra" element={<PageABMEstadoOrdenCompra />}>
            <Route path="PageAltaEstado" element={<PageAltaEstado />} />
            <Route path="PageModificarEstado/:id" element={<PageModificarEstado />} />
          </Route>
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