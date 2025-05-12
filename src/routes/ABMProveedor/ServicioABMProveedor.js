const BASE_URL = "http://localhost:8080/ABMProveedor";

const parseError = async (response) => {
    try {
        const errorData = await response.json();
        return errorData.mensaje || "Error desconocido";
    } catch {
        return "Error inesperado en el servidor";
    }
};

const getProveedores = async (soloVigentes) => {
    const response = await fetch(`${BASE_URL}/getProveedores?soloVigentes=${soloVigentes}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return await response.json();
};

const altaProveedor = async (nombreProveedor) => {
    const response = await fetch(`${BASE_URL}/alta?nombreProveedor=${encodeURIComponent(nombreProveedor)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const darBaja = async (idProveedor) => {
    const response = await fetch(`${BASE_URL}/darBaja?idProveedor=${idProveedor}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const getDatosProveedor = async (idProveedor) => {
    const response = await fetch(`${BASE_URL}/getDatosProveedor?idProveedor=${idProveedor}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return await response.json();
};

const confirmar = async (dto) => {
    const response = await fetch(`${BASE_URL}/confirmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const ServicioABProveedor = {
    getProveedores,
    altaProveedor,
    darBaja,
    getDatosProveedor,
    confirmar,
};

export default ServicioABProveedor;