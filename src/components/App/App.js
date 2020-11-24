import "./App.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";

function App() {
  const [category, setCategory] = useState();
  return (
    <Router>
      {/* TODO - To be replaced with a NavBar */}
      <button className="btn btn-primary btn-md my-0 p" type="submit">
        Go to cart
        <i className="fas fa-shopping-cart ml-1"></i>
      </button>
      {/* TODO end - To be replaced with a NavBar */}
      <Switch>
        <Route
          path="/"
          exact={true}
          render={(routerProps) => <ItemsDisplay {...routerProps} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
