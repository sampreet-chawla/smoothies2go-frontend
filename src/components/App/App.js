import "./App.scss";
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import { getCartItemsForUser } from "../../api-services/cart-service";

export const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    _id: "5fbd601032153d001ede1ab2",
    username: "test",
  });

  const [cartData, setCartData] = useState([]);

  // console.log("User : ", user);

  const loadCartData = async () => {
    console.log("Loading card data");
    if (user) {
      const cartData = await getCartItemsForUser(user);
      console.log("Received cardData", cartData);
      setCartData(cartData);
    }
  };

  useEffect(() => {
    loadCartData();
  }, []);

  // const [category, setCategory] = useState();
  return (
    <AppContext.Provider value={{ user, loadCartData }}>
      <Router>
        {/* TODO - To be replaced with a NavBar */}
        <button className="btn btn-primary btn-md my-0 p" type="submit">
          Go to cart
          <i className="fas fa-shopping-cart ml-1"></i> &nbsp; {cartData.length}
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
    </AppContext.Provider>
  );
}

export default App;
