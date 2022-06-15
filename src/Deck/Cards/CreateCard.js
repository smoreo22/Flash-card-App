import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { CreateCardForm } from "./CreateCardForm.js";
import { CreateCardNav } from "./CreateCardNav.js";

const CreateCard = ({setEdited}) => {
  const { deckId } = useParams();

  const [deckInfo, setDeckInfo] = useState({ cards: [] });

  useEffect(() => {
    const controller = new AbortController();
    async function readDeckInfo() {
      try {
        const data = await readDeck(deckId, controller.sginal);
        setDeckInfo(data);

      } catch (error) {
        console.log(error);
      }
    }
    setEdited(true)
    readDeckInfo();
    //executes when card is destroyed
    return () => {
      setEdited(false)
      controller.abort();
    };
  }, [deckId]);

  return (
    <React.Fragment>
      <CreateCardNav deckInfo={deckInfo} />
      <h3>{deckInfo.name}: Add Card</h3>
      <CreateCardForm deckInfo={deckInfo} setEdited={setEdited}/>
    </React.Fragment>
  );
};
export default CreateCard;
