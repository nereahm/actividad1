import React, { useEffect, useState } from "react";

function App1() {
    const [pokemons, setPokemons] = useState( [] );
    const { VITE_API1 } = import.meta.env;

    useEffect(() => {
        
        let controller = new AbortController();

        const fetchPokemons = async () => {
            try {
                let options = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    mode: 'cors',
                    signal: controller.signal
                };

                let respuesta = await fetch(VITE_API1, options);
                let data = await respuesta.json();
                setPokemons(data);
            } catch (error) {
                    console.log(error);
                }
        };

        fetchPokemons();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <div className="galeria__contenedor">
                <h1 className="galeria__titulo">NÚMERO DE POKEMONS: {pokemons.count}</h1>
                <div className="galeria">
                    {pokemons.results && pokemons.results.map((pokemon, index) => (
                        <div className="galeria__pokemon" key={index}>
                            <p className="galeria__pokemonNombre">{pokemon.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App1;
