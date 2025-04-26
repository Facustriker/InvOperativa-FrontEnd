const BASE_URL = "http://localhost:8080/CrearCoso";

const crearCoso = async (dto) => {
  try {
    const response = await fetch(`${BASE_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.text();

  } catch (error) {
    console.error("Error en la solicitud al backend:", error);
    throw error;
  }
};

const ServicioCrearCoso = {
  crearCoso,
};

export default ServicioCrearCoso;