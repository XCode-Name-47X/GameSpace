import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import GameCards from "./components/GameCards";
import GameTracker from "./components/GameTracker";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  slug: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "playing" | "incomplete" | "finished" | "planned"
  >("home");

  const defaultTrackedGames = {
    playing: [] as Game[],
    incomplete: [] as Game[],
    finished: [] as Game[],
    planned: [] as Game[],
  };

  const [trackedGames, setTrackedGames] = useState(() => {
    const saved = localStorage.getItem("trackedGames");
    return saved ? JSON.parse(saved) : defaultTrackedGames;
  });

  // Save to localStorage when trackedGames changes
  useEffect(() => {
    localStorage.setItem("trackedGames", JSON.stringify(trackedGames));
  }, [trackedGames]);

  const addGameToCategory = (
    game: Game,
    category: keyof typeof trackedGames
  ) => {
    setTrackedGames((prev: typeof trackedGames) => {
      if (prev[category].some((g: Game) => g.id === game.id)) return prev;
      return {
        ...prev,
        [category]: [...prev[category], game],
      };
    });
  };

  const removeGameFromCategory = (
    gameId: number,
    category: keyof typeof trackedGames
  ) => {
    setTrackedGames((prev) => ({
      ...prev,
      [category]: prev[category].filter((game) => game.id !== gameId),
    }));
  };

  return (
    <div className="app-container">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === "home" && (
          <GameCards addGameToCategory={addGameToCategory} />
        )}
        {["playing", "incomplete", "finished", "planned"].includes(
          activeTab
        ) && (
          <GameTracker
            trackedGames={trackedGames}
            removeGameFromCategory={removeGameFromCategory}
            activeCategory={activeTab as keyof typeof trackedGames}
          />
        )}
      </div>
    </div>
  );
}

export default App;
