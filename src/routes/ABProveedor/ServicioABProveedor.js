const BASE_URL = "http://localhost:8080/ABProveedor";

const getProveedores = async () => {
    const response = await fetch(`${BASE_URL}/getProveedores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en getProveedores:", errorText);
    }

    const data = await response.json();

    return data;
};

const altaProveedor = async () => {
    const response = await fetch(`${BASE_URL}/alta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors'
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en altaProveedor:", errorText);
        throw new Error("Error al dar de alta");
    }

    return null;
};

const darBaja = async (idProveedor) => {
    const response = await fetch(`${BASE_URL}/darBaja?idProveedor=${idProveedor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors'
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en darBaja:", errorText);
        throw new Error("Error al dar de baja");
    }

    return null;
};

const ServicioABProveedor = {
    getProveedores,
    altaProveedor,
    darBaja
};

export default ServicioABProveedor;