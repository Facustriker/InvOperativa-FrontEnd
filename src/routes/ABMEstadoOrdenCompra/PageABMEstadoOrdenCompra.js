import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ServicioABMEstadoOrdenCompra from "./ServicioABMEstadoOrdenCompra";
import './ABMEstadoOrdenCompra.css';

function ABMEstadoOrdenCompra() {
  const [estados, setEstado] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarSoloVigentes, setMostrarSoloVigentes] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPage = location.pathname === "/Parametros/ABMEstadoOrdenCompra";

  const cargarEstados = (soloVigentes) => {
    ServicioABMEstadoOrdenCompra.getEstados(soloVigentes)
      .then(data => setEstado(data))
      .catch(error => {
        console.error("Error al obtener estados:", error);
        setError("No se han encontrado estados");
      });
  };

  useEffect(() => {
    cargarEstados(mostrarSoloVigentes);
  }, [mostrarSoloVigentes, location.state]);

  const handleCheckboxChange = (e) => {
    setMostrarSoloVigentes(e.target.checked);
  };

  const darBaja = async (idEOC) => {
    let response = await ServicioABMEstadoOrdenCompra.bajaEstado(idEOC);
    if (typeof response === "string") {
      setError(response);
      return;
    }
    window.location.reload();
  };

  const modificarEstado = (idEOC) => {
    navigate(`PageModificarEstado/${idEOC}`);
  };

  const formatDate = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleString();
  };

  return (
  <div>
    {isRootPage && (
      <>
        <div className="header-container" style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>

          <button className="boton-volver" onClick={() => navigate("/Parametros")}>
            Volver
          </button>

          <div style={{ display: "flex", alignItems: "center", gap:50 }}>
            <h2 className="titulo-centro">
              Lista de Estados
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap:150 }}>
              <label>
                <input
                  type="checkbox"
                  checked={mostrarSoloVigentes}
                  onChange={handleCheckboxChange}
                />
                Mostrar solo estados vigentes
              </label>
              <Link to="PageAltaEstado">
                <button className="boton-derecha">Nuevo estado</button>
              </Link>
            </div>
          </div>
        </div>
          

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Estado</th>
                <th>Nombre Estado</th>
                <th>Fecha Hora Baja</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estados.map((e) => (
                <tr key={e.idEOC}>
                  <td>{e.idEOC}</td>
                  <td>{e.nombreEstado}</td>
                  <td>{formatDate(e.fhBajaEOC)}</td>
                  <td>
                    {!e.dadoBaja && (
                      <div>
                        <img
                          src="/green_cross.svg"
                          alt="Modificar"
                          className="clickable"
                          onClick={() => modificarEstado(e.idEOC)}
                        />
                        <img
                          src="/green_cross.svg"
                          alt="Baja"
                          className="clickable"
                          onClick={() => darBaja(e.idEOC)}
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

export default ABMEstadoOrdenCompra;