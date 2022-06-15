import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck } from "../../utils/api";
import { CardForm } from "../../Forms/CardForm";

export const EditCardForm = ({ cardInfo, setCardInfo, initialCardInfo, setEdited }) => {
  const history = useHistory();
  const { deckId } = useParams();

 const handleEditCard = async (card) => {
    const controller = new AbortController();
    await updateCard(card, controller.signal);
    setEdited(true)
    console.log("card updated")
    // await readDeck(deckId)
    history.push(`/decks/${deckId}`);
    // history.go(-1)
  };
  const onDone = () => {
    setCardInfo(initialCardInfo);
    history.push(`/decks/${deckId}`);
  };

  return (
 
      <CardForm
        onSubmit={handleEditCard}
        onDone={onDone}
        initialState={cardInfo}
        // submitLabel="Submit"
        // cancelLabel="Cancel"
      />
   
  );
};