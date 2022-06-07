import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import CreateDeck from "../CreateDeck/CreateDeck";
import Deck from "../Deck/Deck";
import { Switch, Route } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;