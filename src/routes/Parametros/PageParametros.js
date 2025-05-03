import { Link, Outlet, useLocation } from 'react-router-dom';
import './PageParametros.css';

function PageParametros() {
  const location = useLocation();
  const isRootParametros = location.pathname === "/Parametros";

  return (
    <div>
      {isRootParametros && (
        <div className="parametros-container">
          <Link to="ABProveedor"><button>Proveedores</button></Link>
          <Link to="ABMEstadoOrdenCompra"><button>Estados Orden Compra</button></Link>
          <Link to="ABMModeloInventario"><button>Modelos Inventario</button></Link>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default PageParametros;
