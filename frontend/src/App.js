// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import FindSpot from "./components/FindSpot";
import CreateNewSpot from "./components/CreateSpot";
import ReviewByUser from "./components/ReviewByUser";
import SpotsByUser from "./components/SpotsByUser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/spots/:spotId">
            <FindSpot/>
          </Route>
          <Route path="/view-your-spots">
            <SpotsByUser/>
          </Route>
          <Route path="/view-your-reviews">
            <ReviewByUser/>
          </Route>
          <Route exact path="/host-your-home">
            <CreateNewSpot/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
