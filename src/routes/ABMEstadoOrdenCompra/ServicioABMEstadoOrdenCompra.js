const BASE_URL = "http://localhost:8080/ABMEstadoOrdenCompra";

const getEstados = async (soloVigentes) => {
    const response = await fetch(`${BASE_URL}/getEstados?soloVigentes=${soloVigentes}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
    }

    const data = await response.json();

    return data;
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
        const errorText = await response.text();
        console.error("Error:", errorText);
        throw new Error("Error al dar de alta");
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
        const errorText = await response.text();
        console.error("Error:", errorText);
        throw new Error("Error al dar de baja");
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
        const errorText = await response.text();
        console.error("Error:", errorText);
    }

    const data = await response.json();

    return data;
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
        const errorText = await response.text();
        console.error("Error:", errorText);
        throw new Error("Error: el nombre ya se encuentra en uso");
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