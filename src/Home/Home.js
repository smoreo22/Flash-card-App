import { listDecks, deleteDeck } from "../utils/api/index";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { HomeDecks } from "./HomeDecks.js";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decksFromApi = await listDecks(abortController.signal);
        setDecks(decksFromApi);
      } catch (error) {
        console.log(error);
      }
    }
    loadDecks();
    return function cleanUp() {
      abortController.abort();
    };
  }, []);

  const homeDecks = decks.map((deck) => (
    <HomeDecks
      key={deck.id}
      deck={deck}
      handleDelete={() => handleDelete(deck)}
    />
  ));
  const handleDelete = async (deck) => {
    const abortController = new AbortController();
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deck.id, abortController.signal);
      history.go(0);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <Link to="/decks/new" className="btn btn-secondary text-white">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>{" "}
          Create Deck{" "}
        </Link>
      </div>
      <div className="list-group">{homeDecks}</div>
    </div>
  );
}
export default Home;
