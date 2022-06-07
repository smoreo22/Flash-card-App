import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { StudyPageNav } from "./StudyPageNav";

export default function StudyPage() {
  const history = useHistory();
  const deckId = useParams().deckId;

const [deckInfo, setDeckInfo] = useState({ cards: [] });
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

useEffect(() => {
    const controller = new AbortController();
    async function readDeckInfo() {
      try {
        const data = await readDeck(deckId, controller.signal);
        setDeckInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    readDeckInfo();
    return () => {
      controller.abort();
    };
  }, [deckId]);

 const card = deckInfo.cards[cardIndex] || {};
const cardHandler = () => {
    if (cardIndex + 1 < deckInfo.cards.length) {
      setCardIndex(cardIndex + 1);
      setFlipped(!flipped);
    } else {
      const staying = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page?"
      );
      if (staying) {
        setCardIndex(0);
      } else history.push("/");
    }
  };

  return (
    <React.Fragment>
      <StudyPageNav deckInfo={deckInfo} />
      <h1>Study: {deckInfo.name}</h1>
      {deckInfo.cards.length > 2 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {deckInfo.cards.length}
            </h5>
            <p className="card-text">{flipped ? card.back : card.front}</p>
            <div
              className="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group" role="group" aria-label="First group">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setFlipped(!flipped)}
                >
                  Flip
                </button>
              </div>
              {flipped && (
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <button className="btn btn-primary" onClick={cardHandler}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are{" "}
            {deckInfo.cards.length} cards in this deck.
          </p>
          <Link
            to={`/decks/${deckInfo.id}/cards/new`}
            className="btn btn-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add Cards
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}