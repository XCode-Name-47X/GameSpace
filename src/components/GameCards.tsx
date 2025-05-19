import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;


interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  slug: string;
}

interface GameCardsProps {
  addGameToCategory: (
    game: Game,
    category: "playing" | "incomplete" | "finished" | "planned"
  ) => void;
}

function GameCards({ addGameToCategory }: GameCardsProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const fetchGames = async () => {
    try {
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: apiKey,
          page_size: 20,
          page: randomPage,
        },
      });
      setGames(response.data.results);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      fetchGames();
      return;
    }
    try {
      setIsSearching(true);
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: apiKey,
          search: searchTerm,
          page_size: 40,
        },
      });
      setGames(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className="game-section">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search games..."
          className="form-control search-box"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-success search-btn" type="submit">
          Search
        </button>
      </form>

      <div className="game-grid">
        {games.length > 0
          ? games.map((game) => (
              <div className="card game-card" key={game.id}>
                <img src={game.background_image} alt={game.name} />
                <div className="card-body">
                  <h5>{game.name}</h5>
                  <p>Rating: {game.rating} ⭐</p>
                  <a
                    className="btn btn-primary mb-2"
                    href={`https://rawg.io/games/${game.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Game
                  </a>
                  <div className="btn-group d-flex flex-column">
                    <button
                      className="btn btn-outline-success mb-1"
                      onClick={() => addGameToCategory(game, "playing")}
                    >
                      Add to Playing
                    </button>
                    <button
                      className="btn btn-outline-warning mb-1"
                      onClick={() => addGameToCategory(game, "incomplete")}
                    >
                      Add to Incomplete
                    </button>
                    <button
                      className="btn btn-outline-info mb-1"
                      onClick={() => addGameToCategory(game, "finished")}
                    >
                      Add to Finished
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => addGameToCategory(game, "planned")}
                    >
                      Add to Planned
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !isSearching && (
              <div className="no-results">
                <h4>No results found.</h4>
                <a
                  href={`https://www.google.com/search?q=${searchTerm}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger mt-2"
                >
                  Search on Google 🔍
                </a>
              </div>
            )}
      </div>

      {!searchTerm && (
        <div className="pagination-controls">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="btn btn-outline-secondary"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="page-number">Page: {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-outline-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GameCards;
