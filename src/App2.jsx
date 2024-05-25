import React, { useEffect, useState } from "react";

function App2() {
    const [productos, setProductos] = useState([]);
    const { VITE_API2 } = import.meta.env;

    useEffect(() => {
        const controller = new AbortController();
        const fetchProductos = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    mode: 'cors',
                    signal: controller.signal
                };

                const res = await fetch(VITE_API2, options);
                const datos = await res.json();
                setProductos(datos);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProductos();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="productos">
            <h1 className="productos__titulo">Productos</h1>
            <div className="productos__lista">
                {productos.map((product, index) => (
                    <div key={index} className="producto">
                        <img src={product.image} alt={product.title} className="producto__imagen" />
                        <h2 className="producto__titulo">{product.title}</h2>
                        <p className="producto__categoria">Categoría: {product.category}</p>
                        <p className="producto__descripcion">{product.description}</p>
                        <p className="producto__precio">Precio: {product.price}€</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App2;
