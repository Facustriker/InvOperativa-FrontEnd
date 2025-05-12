import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServicioABMProveedor from "./ServicioABMProveedor";
import './ABMProveedor.css';

function PageModificarProveedor() {
    const { id } = useParams();
    const [proveedor, setProveedor] = useState(null);
    const [nuevoNombreProveedor, setNombreProveedor] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ServicioABMProveedor.getDatosProveedor(id)
            .then(data => {
                setProveedor(data);
                setNombreProveedor(data.nombreProveedor || '');
            })
            .catch(error => {
                console.error("Error al obtener datos del proveedor:", error);
                setError("No se han encontrado datos");
            });
    }, [id]);

    const handleChange = (e) => {
        setNombreProveedor(e.target.value);
    };

    const confirmar = async () => {
        const dto = {
            idProveedor: proveedor.idProveedor,
            nombreProveedor: nuevoNombreProveedor
        };

        try {
            await ServicioABMProveedor.confirmar(dto);
            navigate("/Parametros/ABMProveedor", { state: { recargar: true } });
        } catch (error) {
            console.error("Error al confirmar:", error);
            setError(error.message || "Error desconocido");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // limpiar error anterior
        confirmar();
    };

    if (!proveedor) return <p>Cargando datos...</p>;

    return (
        <div>
            <div className="header-container-alta">
                <h2 className="titulo-centro">Modificar proveedor</h2>

                <div>
                    <h2>ID: {proveedor.idProveedor}</h2>
                </div>

                <form onSubmit={handleSubmit} className="formularioAlta">
                    <input
                        type="text"
                        value={nuevoNombreProveedor}
                        onChange={handleChange}
                        placeholder={"Nombre anterior: " + proveedor.nombreProveedor}
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

export default PageModificarProveedor;