import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";
import { EditCardForm } from "./EditCardForm.js";
import { EditCardNav } from "./EditCardNav.js";

const EditCard = () => {
  const { deckId, cardId } = useParams();

  const [deckInfo, setDeckInfo] = useState({ cards: [] });
  const initialCardInfo = {
    front: "",
    back: "",
    deckId: 0,
  };
  const [cardInfo, setCardInfo] = useState({ ...initialCardInfo });

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
  }, [deckId]);

  useEffect(() => {
    const controller = new AbortController();
    async function readCardInfo() {
      try {
        const data = await readCard(cardId, controller.signal);
        setCardInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    readCardInfo();
  }, [deckId, cardId]);

  return (
    <React.Fragment>
      <EditCardNav deckInfo={deckInfo} cardInfo={cardInfo} />
      <h3>Edit Card</h3>
      <EditCardForm
        cardInfo={cardInfo}
        setCardInfo={setCardInfo}
        initialCardInfo={initialCardInfo}
      />
    </React.Fragment>
  );
};
export default EditCard;