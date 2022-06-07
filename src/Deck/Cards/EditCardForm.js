import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard } from "../../utils/api";
import { CardForm } from "../../Forms/CardForm";

export const EditCardForm = ({ cardInfo, setCardInfo, initialCardInfo }) => {
  const history = useHistory();
  const { deckId } = useParams();

 const handleEditCard = async (evt) => {
    evt.preventDefault();
    const controller = new AbortController();
    await updateCard(cardInfo, controller.signal);
    history.push(`/decks/${deckId}`);
  };
  const onCancel = () => {
    setCardInfo(initialCardInfo);
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <CardForm
        onSubmit={handleEditCard}
        onCancel={onCancel}
        cardInfo={cardInfo}
        setCardInfo={setCardInfo}
        submitLabel="Submit"
        cancelLabel="Cancel"
      />
    </React.Fragment>
  );
};