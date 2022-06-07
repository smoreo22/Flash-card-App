import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../../utils/api";
import { CardForm } from "../../Forms/CardForm.js";

export const CreateCardForm = ({ deckInfo: { id = 0 } }) => {
  const history = useHistory();

  const initialCardInfo = {
    front: "",
    back: "",
    deckId: id,
  };
  const [cardInfo, setCardInfo] = useState(initialCardInfo);


  useEffect(() => {
    setCardInfo({ ...cardInfo, deckId: id });
  }, [id]);


  const handleCreateCard = async (evt) => {
    evt.preventDefault();
    const controller = new AbortController();
    await createCard(cardInfo.deckId, cardInfo, controller.signal);
    setCardInfo(initialCardInfo);
    history.go(0);
  };
  const onCancel = () => {
    setCardInfo(initialCardInfo);
    history.push(`/decks/${cardInfo.deckId}`);
  };

  return (
    <React.Fragment>
      <CardForm
        onSubmit={handleCreateCard}
        onCancel={onCancel}
        cardInfo={cardInfo}
        setCardInfo={setCardInfo}
        submitLabel="Save"
        cancelLabel="Done"
      />
    </React.Fragment>
  );
};