import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ServicioABMProveedor from "./ServicioABMProveedor";
import './ABMProveedor.css';

function PageAltaProveedor() {
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNombreProveedor(e.target.value);
    };

    const altaProveedor = async (nombreProveedor) => {
        try {
            await ServicioABMProveedor.altaProveedor(nombreProveedor);
            navigate("/Parametros/ABMProveedor", { state: { recargar: true } });
        } catch (error) {
            console.error("Error en altaProveedor:", error);
            setError(error.message || "Error desconocido");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Limpiar error anterior
        altaProveedor(nombreProveedor);
    };

    return (
        <div>
            <div className="header-container-alta">
                <h2 className="titulo-centro">Crear nuevo proveedor</h2>

                <form onSubmit={handleSubmit} className="formularioAlta">
                    <input
                        type="text"
                        value={nombreProveedor}
                        onChange={handleChange}
                        placeholder="Nombre..."
                    />
                    <button type="submit">Crear</button>
                </form>
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

export default PageAltaProveedor;