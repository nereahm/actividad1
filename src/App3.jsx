import React, { useEffect, useState } from "react";

function App3() {
    const [usuarios, setUsuarios] = useState([]);
    const { VITE_API3 } = import.meta.env;

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsuarios = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    mode: 'cors',
                    signal: controller.signal
                };

                const res = await fetch(VITE_API3, options);
                const data = await res.json();
                setUsuarios(data.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsuarios();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="usuarios">
            <h1 className="usuarios__titulo">Usuarios</h1>
            <div className="usuarios__lista">
                {usuarios.map((usuario, index) => (
                    <div key={index} className="usuario">
                        <img src={usuario.picture.large} alt="Avatar" className="usuario__imagen" />
                        <div className="usuario__info">
                            <p className="usuario__nombre">{usuario.name.first} {usuario.name.last}</p>
                            <p className="usuario__ubicacion">{usuario.location.city}, {usuario.location.country}</p>
                            <p className="usuario__email">{usuario.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App3;
