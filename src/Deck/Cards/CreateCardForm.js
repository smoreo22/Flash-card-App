import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { CardForm } from "../../Forms/CardForm.js";

export const CreateCardForm = ({ setEdited }) => {
  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const initialCardInfo = {
    front: "",
    back: "",
    deckId: 0,
  };

  useEffect(() => {
    readDeck(deckId)
  }, [deckId]);

  function submitHandler(card) {
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`)
    // setEdited(false)
  }

  return (
    <div>
      <CardForm
        initialState={initialCardInfo}
        onSubmit={submitHandler}
        onDone={doneHandler}
      />
    </div>
  );
};
