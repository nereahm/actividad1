import React, { useEffect, useState } from "react";

function App5() {
  const [plataformas, setPlatformas] = useState([]);

  useEffect(() => {
    const fetchPlataformas = async () => {
      try {
        const controller = new AbortController();
        const options = {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
          },
          mode: 'cors',
          signal : controller.signal
        };

        const res = await fetch("https://api.rawg.io/api/platforms?key=a4e44b1570f64e258f654a9e6f5e24a3", options);
        const data = await res.json();
        setPlatformas(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlataformas();

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <div className="galeriaJuegos__contenedor">
      <h1 className="galeriaJuegos__titulo">Juegos según plataforma</h1>
      <div className="galeriaJuegos">
        {plataformas.slice(0, 12).map((plataforma, index) => (
          <div key={index} className="galeriaJuegos__plataforma">
            <h2 className="galeriaJuegos__nombrePlataforma">{plataforma.name}</h2>
            <img src={plataforma.image_background} alt={plataforma.name} className="galeriaJuegos__imgPlataforma" />
            <div className="lista__juegos">
              <h3 className="lista__tituloJuegos">Juegos</h3>
              <ul className="lista__listJuegos">
                {plataforma.games.map((game, index) => (
                  <li className="lista__gamesJuegos" key={index}>{game.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App5;
