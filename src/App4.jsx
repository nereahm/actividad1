import React, { useEffect, useState } from "react";

function App4() {
    const [dragonDatos, setDragonDatos] = useState({});
    const { VITE_API4 } = import.meta.env;

    useEffect(() => {
        const controller = new AbortController();

        const fetchDragonDatos = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    mode: 'cors',
                    signal: controller.signal
                };

                const res = await fetch(VITE_API4, options);
                const data = await res.json();
                setDragonDatos(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDragonDatos();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="dragon__accionesContenedor">
            <h2 className="dragon__accionesTitulo">{dragonDatos.name}</h2>
            <div className="dragon__acciones">
                {dragonDatos.actions && dragonDatos.actions.map((action, index) => (
                    <div key={index} className="dragon__accion">
                        <p className="dragon__accionNombre">Nombre: {action.name}</p>
                        <p className="dragon__accionDesc">Descripción: {action.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App4;
