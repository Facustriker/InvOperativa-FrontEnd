import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServicioABMEstadoOrdenCompra from "./ServicioABMEstadoOrdenCompra";
import './ABMEstadoOrdenCompra.css';

function PageModificarEstado() {
    const { id } = useParams();
    const [estado, setEstado] = useState(null);
    const [nuevoNombreEstado, setNombreEstado] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ServicioABMEstadoOrdenCompra.getDatosEstado(id)
            .then(data => {
                setEstado(data);
                setNombreEstado(data.nombreEstado || ''); // corregido: era `data.nombre`
            })
            .catch(error => {
                console.error("Error al obtener datos del estado:", error);
                setError("No se han encontrado datos");
            });
    }, [id]);

    const handleChange = (e) => {
        setNombreEstado(e.target.value);
    };

    const confirmar = async () => {
        const dto = {
            idEOC: estado.idEOC,
            nombreEstado: nuevoNombreEstado
        };

        try {
            await ServicioABMEstadoOrdenCompra.confirmar(dto);
            setError(null);
            navigate("/Parametros/ABMEstadoOrdenCompra", { state: { recargar: true } });
        } catch (err) {
            console.error("Error al modificar estado:", err);
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmar();
    };

    if (!estado) return <p>Cargando datos...</p>;

    return (
        <div>
            <div className="header-container-alta">
                <h2 className="titulo-centro">Modificar estado</h2>

                <div>
                    <h2>ID: {estado.idEOC}</h2>
                </div>

                <form onSubmit={handleSubmit} className="formularioAlta">
                    <input
                        type="text"
                        value={nuevoNombreEstado}
                        onChange={handleChange}
                        placeholder={"Nombre anterior: " + estado.nombreEstado}
                    />
                    <button type="submit">Guardar</button>
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

export default PageModificarEstado;