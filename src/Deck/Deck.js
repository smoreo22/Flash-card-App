import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

import { CardItem } from "./CardItem";
import EditDeck from "./Cards/EditDeck";
import StudyPage from "./Cards/StudyPage";
import NotFound from "../Layout/NotFound";
import { DeckDisplay } from "./DeckDisplay";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";

function Deck() {
  const history = useHistory();
  const {
    params: { deckId },
    path,
  } = useRouteMatch();

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
    readDeckInfo();
    return () => {
      controller.abort();
    };
  }, [deckId]);

  const handleDelete = async (item) => {
    if ("deckId" in item) {
      const result = window.confirm(
        "Delete this card? \n \n You will not be able to recover it"
      );
      if (result) {
        await deleteCard(item.id);
        history.go(0);
      }
    } else {
      const result = window.confirm("Delete this deck?");
      if (result) {
        await deleteDeck(item.id);
        history.goBack();
      }
    }
  };

  const cardList = deckInfo.cards.map((cardInfo) => (
    <CardItem
      key={cardInfo.id}
      cardInfo={cardInfo}
      handleDelete={() => handleDelete(cardInfo)}
    />
  ));

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${path}/edit`}>
          <EditDeck deckInfo={deckInfo} />
        </Route>
        <Route path={`${path}/study`}>
          <StudyPage deckInfo={deckInfo} />
        </Route>
        <Route path={`${path}/cards/new`}>
          <CreateCard />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard />
        </Route>
        <Route path={`${path}`}>
          <DeckDisplay
            deckInfo={deckInfo}
            handleDelete={handleDelete}
            cardList={cardList}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default Deck;
