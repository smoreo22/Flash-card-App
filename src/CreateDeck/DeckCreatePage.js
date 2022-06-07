import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import { DeckForm } from "../Forms/DeckForm";

export const DeckCreatePage = () => {
  const history = useHistory();

  const initDeckInfo = {
    name: "",
    description: "",
  };
  const [deckInfo, setDeckInfo] = useState({ ...initDeckInfo });

  const createDeckHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const newDeck = await createDeck(deckInfo, abortController.signal);
    setDeckInfo({ ...initDeckInfo });
    history.push(`/decks/${newDeck.id}`);
  };

  const onCancel = () => {
      setDeckInfo({...initDeckInfo})
      history.push("/")
  }

  return (
      <DeckForm
      onSubmit={createDeckHandler}
      onCancel={onCancel}
      deckInfo={deckInfo}
      setDeckInfo={setDeckInfo}
      submitLabel="Submit"
      cancelLabel="Cancel"
      />
  )
}

