import { useState } from 'react';
import ServicioCrearArticulo from './ServicioCrearArticulo';
import DTOCrearArticulo from './DTOCrearArticulo';

function CrearArticulo() {
  const [nombreArticulo, setNombreArticulo] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = new DTOCrearArticulo(nombreArticulo);

    try {
      const respuesta = await ServicioCrearArticulo.crearArticulo(dto);
      console.log("Respuesta del backend:", respuesta);
      alert("Artículo creado con éxito");
      setNombreArticulo("");
      setError(null);
    } catch (error) {
      console.error("Error al crear el artículo:", error);
      setError("Error al guardar el artículo. Intente nuevamente.");
    }
  };

  return (
    <div style={{ margin: '2rem', padding: '1rem' }}>
      <h2>Crear Artículo</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Artículo:</label><br />
          <input
            type="text"
            value={nombreArticulo}
            onChange={(e) => setNombreArticulo(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
      </form>
    </div>
  );
}

export default CrearArticulo;
