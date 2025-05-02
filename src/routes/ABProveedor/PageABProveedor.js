import { useEffect, useState } from "react";
import ServicioABProveedor from "./ServicioABProveedor";

function ABProveedor() {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        ServicioABProveedor.getProveedores()
            .then(data => setProveedores(data))
            .catch(error => {
                console.error("Error al obtener proveedores:", error);
                setError("No se han encontrado proveedores");
            });
    }, []);

    const altaProveedor = async () => {
        let response = await ServicioABProveedor.altaProveedor();
        if (typeof response === "string") {
            setError(response);
            return;
        }

        window.location.reload();
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
            
            {error && (
                <div style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "10px" }}>
                    <h2>ERROR</h2>
                    <p>{error}</p>
                </div>
            )}

            <div>
                <div style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}>
                    <button onClick={altaProveedor}>Alta Proveedor</button>
                </div>
            </div>

            <div>
                <h2>Lista de Proveedores</h2>
                <table border="1">
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
        </div>
    );
}

export default ABProveedor;
