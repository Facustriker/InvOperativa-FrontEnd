import { useState } from 'react';
import ServicioCrearCoso from './ServicioCrearCoso';
import DTOCrearCoso from './DTOCrearCoso';

function CrearCoso() {
  const [nombreCoso, setNombreCoso] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = new DTOCrearCoso(nombreCoso);

    try {
      const respuesta = await ServicioCrearCoso.crearCoso(dto);
      console.log("Respuesta del backend:", respuesta);
      alert("Coso creado con éxito");
      setNombreCoso("");
      setError(null);
    } catch (error) {
      console.error("Error al crear el artículo:", error);
      setError("Error al guardar el artículo. Intente nuevamente.");
    }
  };

  return (
    <div style={{ margin: '2rem', padding: '1rem' }}>
      <h2>Crear Coso</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Coso:</label><br />
          <input
            type="text"
            value={nombreCoso}
            onChange={(e) => setNombreCoso(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
      </form>
    </div>
  );
}

export default CrearCoso;
