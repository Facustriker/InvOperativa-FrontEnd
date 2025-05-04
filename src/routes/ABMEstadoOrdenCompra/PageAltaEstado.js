import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ServicioABMEstadoOrdenCompra from "./ServicioABMEstadoOrdenCompra";
import './ABMEstadoOrdenCompra.css';

function PageAltaEstado() {
    const [nombreEstado, setNombreEstado] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNombreEstado(e.target.value);
    };

    const altaEstado = async (nombreEstado) => {
        let response = await ServicioABMEstadoOrdenCompra.altaEstado(nombreEstado);
        if (typeof response === "string") {
            setError(response);
            return;
        }

        navigate("/Parametros/ABMEstadoOrdenCompra", { state: { recargar: true } });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        altaEstado(nombreEstado);
      };

    return (
        <div>
            
            <div className="header-container-alta">
                <h2 className="titulo-centro">Crear nuevo estado</h2>
            

            <form onSubmit={handleSubmit} className="formularioAlta">
                <input
                    type="text"
                    value={nombreEstado}
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

export default PageAltaEstado;
