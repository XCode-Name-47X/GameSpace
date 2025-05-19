import React, { useState, useEffect } from "react";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  slug: string;
}

interface GameTrackerProps {
  trackedGames: {
    playing: Game[];
    incomplete: Game[];
    finished: Game[];
    planned: Game[];
  };
  removeGameFromCategory: (
    gameId: number,
    category: keyof GameTrackerProps["trackedGames"]
  ) => void;
  activeCategory: keyof GameTrackerProps["trackedGames"];
}

const GameTracker: React.FC<GameTrackerProps> = ({
  trackedGames,
  removeGameFromCategory,
  activeCategory,
}) => {
  const [localCategory, setLocalCategory] =
    useState<keyof typeof trackedGames>(activeCategory);

  useEffect(() => {
    setLocalCategory(activeCategory);
  }, [activeCategory]);

  const categoryLabels: { [key in keyof typeof trackedGames]: string } = {
    playing: "🎮 Currently Playing",
    incomplete: "⏳ Incomplete",
    finished: "✅ Finished",
    planned: "📌 Planned to Play",
  };

  const renderCard = (game: Game, category: keyof typeof trackedGames) => (
    <div
      className="card game-card"
      key={game.id}
      style={{ position: "relative" }}
    >
      <img src={game.background_image} alt={game.name} />
      <div className="card-body">
        <h5>{game.name}</h5>
        <p>Rating: {game.rating} ⭐</p>
        <a
          className="btn btn-primary"
          href={`https://rawg.io/games/${game.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Game
        </a>
        <button
          style={{ position: "absolute", top: "5px", right: "5px" }}
          className="btn btn-danger btn-sm"
          onClick={() => removeGameFromCategory(game.id, category)}
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <center>
        <h1>📋 Game Tracker</h1>
        <div className="btn-group mb-4" role="group">
          {Object.keys(categoryLabels).map((category) => (
            <button
              key={category}
              className={`btn ${
                localCategory === category ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() =>
                setLocalCategory(category as keyof typeof trackedGames)
              }
            >
              {categoryLabels[category as keyof typeof trackedGames]}
            </button>
          ))}
        </div>
      </center>

      <div className="game-grid">
        {trackedGames[localCategory].length > 0 ? (
          trackedGames[localCategory].map((game) =>
            renderCard(game, localCategory)
          )
        ) : (
          <div className="text-center mt-4">
            <h4>No games added to this category yet.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTracker;
