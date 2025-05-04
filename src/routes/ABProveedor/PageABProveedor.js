import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServicioABProveedor from "./ServicioABProveedor";
import './ABProveedor.css';

function ABProveedor() {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [mostrarSoloVigentes, setMostrarSoloVigentes] = useState(true);
    const location = useLocation();

    const cargarProveedores = (soloVigentes) => {
        ServicioABProveedor.getProveedores(soloVigentes)
          .then(data => setProveedores(data))
          .catch(error => {
            console.error("Error al obtener proveedores:", error);
            setError("No se han encontrado proveedores");
          });
      };
    
      useEffect(() => {
        cargarProveedores(mostrarSoloVigentes);
      }, [mostrarSoloVigentes, location.state]);

    const altaProveedor = async () => {
        let response = await ServicioABProveedor.altaProveedor();
        if (typeof response === "string") {
            setError(response);
            return;
        }

        window.location.reload();
    };

    const handleCheckboxChange = (e) => {
        setMostrarSoloVigentes(e.target.checked);
      };

    const darBaja = async (idProveedor) => {
        let response = await ServicioABProveedor.darBaja(idProveedor);
        if (typeof response === "string") {
            setError(response);
            return;
        }

        window.location.reload();
    };

    const formatDate = (fecha) => {
        if (!fecha) return "-";
        return new Date(fecha).toLocaleString();
    };

    return (
        <div>

            <div className="header-container" style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>

                <button className="boton-volver" onClick={() => navigate("/Parametros")}>
                    Volver
                </button>

                <div style={{ display: "flex", alignItems: "center", gap:50 }}>
                    <h2 className="titulo-centro">
                        Lista de Proveedores
                    </h2>

                    <div style={{ display: "flex", alignItems: "center", gap: 10}}>
                        <label>
                            <input
                                type="checkbox"
                                checked={mostrarSoloVigentes}
                                onChange={handleCheckboxChange}
                            />
                            Mostrar solo proveedores vigentes
                        </label>
    
                        <button onClick={altaProveedor} className="boton-derecha">Nuevo proveedor</button>
    
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID Proveedor</th>
                            <th>Fecha Hora Baja</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((d) => (
                            <tr key={d.idProveedor}>
                                <td>{d.idProveedor}</td>
                                <td>{formatDate(d.fhBajaProveedor)}</td>
                                <td>
                                    {!d.dadoBaja && (
                                        <img
                                            src="/green_cross.svg"
                                            alt="Baja"
                                            className="clickable"
                                            onClick={() => darBaja(d.idProveedor)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {error && (
                <div className="error-message">
                    <h2>ERROR</h2>
                    <p>{error}</p>
                </div>
            )}

            
        </div>
    );
}

export default ABProveedor;
