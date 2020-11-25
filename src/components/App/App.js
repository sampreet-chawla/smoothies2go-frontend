import "./App.scss";
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import Cart from "../Cart/Cart";
import { getCartItems } from "../../api-services/cart-service";

export const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    _id: "5fbd601032153d001ede1ab2", // live
    // _id: "5fb9ddc86f02072f24037ab7", // local
    username: "test",
  });

  const [cartData, setCartData] = useState([]);

  const loadCartData = async () => {
    console.log("Loading cart data");
    if (user) {
      const cartData = await getCartItems(user);
      console.log("Received cardData", cartData);
      await setCartData(cartData);
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
        <div className="navbar" style={{ textAlign: "right" }}>
          <Link to="/cart">
            {" "}
            <button className="btn btn-primary btn-md my-0 p" type="submit">
              Go to cart
              <i className="fas fa-shopping-cart ml-1"></i> &nbsp;{" "}
              {cartData ? cartData.length : 0}
            </button>
          </Link>
        </div>
        {/* TODO end - To be replaced with a NavBar */}
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(routerProps) => <ItemsDisplay {...routerProps} />}
          />
          <Route
            path="/cart"
            exact={true}
            render={(routerProps) => (
              <Cart
                {...routerProps}
                cartData={cartData}
                user={user}
                loadCartData={loadCartData}
              />
            )}
          />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
