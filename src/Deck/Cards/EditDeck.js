import React from "react";
import { EditDeckForm } from "./EditDeckForm";
import { EditDeckNav } from "./EditDeckNav";

const EditDeck = ({ deckInfo }) => (
  <React.Fragment>
    <EditDeckNav deckInfo={deckInfo} />
    <h1>Edit Deck</h1>
    <EditDeckForm />
  </React.Fragment>
);

export default EditDeck;