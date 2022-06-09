import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { CardForm } from "../../Forms/CardForm.js";

export const CreateCardForm = () => {
  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function submitHandler(card) {
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <CardForm
        initialState={deck}
        onSubmit={submitHandler}
        onDone={doneHandler}
      />
    </div>
  );
};
