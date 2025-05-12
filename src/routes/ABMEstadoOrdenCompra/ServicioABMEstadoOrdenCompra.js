const BASE_URL = "http://localhost:8080/ABMEstadoOrdenCompra";

const parseError = async (response) => {
    try {
        const errorData = await response.json();
        return errorData.mensaje || "Error desconocido";
    } catch {
        return "Error inesperado en el servidor";
    }
};

const getEstados = async (soloVigentes) => {
    const response = await fetch(`${BASE_URL}/getEstados?soloVigentes=${soloVigentes}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return await response.json();
};

const altaEstado = async (nombreEstado) => {
    const response = await fetch(`${BASE_URL}/altaEstado?nombreEstado=${nombreEstado}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors'
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const bajaEstado = async (idEstadoOrdenCompra) => {
    const response = await fetch(`${BASE_URL}/bajaEstado?idEstadoOrdenCompra=${idEstadoOrdenCompra}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors'
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const getDatosEstado = async (idEstadoOrdenCompra) => {
    const response = await fetch(`${BASE_URL}/getDatosEstado?idEstadoOrdenCompra=${idEstadoOrdenCompra}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
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
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
    }

    return null;
};

const ServicioABMEstadoOrdenCompra = {
    getEstados,
    altaEstado,
    bajaEstado,
    getDatosEstado,
    confirmar
};

export default ServicioABMEstadoOrdenCompra;