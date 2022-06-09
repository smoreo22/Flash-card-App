import React from "react";
import { DeckCreatePage } from "./DeckCreatePage";
import { DeckNav } from "./DeckNav";

const CreateDeck = () => {
 return (
  <div>
    <DeckNav />
    <h2>Create Deck</h2>
    <DeckCreatePage />
  </div>)
};

export default CreateDeck;

