import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ServicioABMProveedor from "./ServicioABMProveedor";
import './ABMProveedor.css';

function ABMProveedor() {
  const [proveedores, setProveedor] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarSoloVigentes, setMostrarSoloVigentes] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPage = location.pathname === "/Parametros/ABMProveedor";

  const cargarProveedores = (soloVigentes) => {
    ServicioABMProveedor.getProveedores(soloVigentes)
      .then(data => setProveedor(data))
      .catch(error => {
        console.error("Error al obtener proveedores:", error);
        setError(error.message || "Error desconocido");
      });
  };

  useEffect(() => {
    cargarProveedores(mostrarSoloVigentes);
  }, [mostrarSoloVigentes, location.state]);

  const handleCheckboxChange = (e) => {
    setMostrarSoloVigentes(e.target.checked);
  };

  const darBaja = async (idProveedor) => {
    try {
      await ServicioABMProveedor.darBaja(idProveedor);
      window.location.reload();
    } catch (error) {
      console.error("Error al dar de baja:", error);
      setError(error.message || "Error desconocido");
    }
  };

  const modificarProveedor = (idProveedor) => {
    navigate(`PageModificarProveedor/${idProveedor}`);
  };

  const formatDate = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleString();
  };

  return (
    <div>
      {isRootPage && (
        <>
          <div className="header-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button className="boton-volver" onClick={() => navigate("/Parametros")}>
              Volver
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
              <h2 className="titulo-centro">Lista de Proveedores</h2>

              <div style={{ display: "flex", alignItems: "center", gap: 150 }}>
                <label>
                  <input
                    type="checkbox"
                    checked={mostrarSoloVigentes}
                    onChange={handleCheckboxChange}
                  />
                  Mostrar solo proveedores vigentes
                </label>
                <Link to="PageAltaProveedor">
                  <button className="boton-derecha">Nuevo proveedor</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID Proveedor</th>
                  <th>Nombre Proveedor</th>
                  <th>Fecha Hora Baja</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((p) => (
                  <tr key={p.idProveedor}>
                    <td>{p.idProveedor}</td>
                    <td>{p.nombreProveedor}</td>
                    <td>{formatDate(p.fhBajaProveedor)}</td>
                    <td>
                      {!p.dadoBaja && (
                        <div>
                          <img
                            src="/green_cross.svg"
                            alt="Modificar"
                            className="clickable"
                            onClick={() => modificarProveedor(p.idProveedor)}
                          />
                          <img
                            src="/green_cross.svg"
                            alt="Baja"
                            className="clickable"
                            onClick={() => darBaja(p.idProveedor)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Outlet />

      {error && (
        <div className="error-message">
          <h2>ERROR</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default ABMProveedor;