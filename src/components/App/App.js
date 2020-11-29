import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import Cart from "../Cart/Cart";
import Confirmation from "../Confirmation/Confirmation";
import { getCartItems } from "../../api-services/cart-service";
import { SHOW_CART, SHOW_ORDER } from "../../constants";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

export const AppContext = createContext(null);

function App({ history }) {
  // const [user, setUser] = useState({
  //   // _id: "5fbd601032153d001ede1ab2", // live
  //   _id: "5fb9ddc86f02072f24037ab7", // local
  //   username: "test",
  //   email: "test@gmail.com",
  // });
  const fetchUser = () => {
    const result = localStorage.getItem("user");
    return result ? JSON.parse(result) : null;
  };

  const [user, setUser] = useState(() => fetchUser());
  console.log("User: ", user);

  const [cartData, setCartData] = useState([]);

  const loadCartData = async () => {
    const loggedInUser = (await user) || (await fetchUser());
    console.log("Loading cart data for user", loggedInUser);
    if (loggedInUser) {
      const cartData = await getCartItems(loggedInUser);
      console.log("Received cart data", cartData);
      await setCartData(cartData);
    }
  };

  // Be default Netlify sends the redirects to index.html or "/" path.
  // For Redirecting the Stripe Response to correct page along with the URL Query String
  const checkStripeResponseQueryParams = () => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success") || query.get("canceled")) {
      if (query.get("success")) {
        history.push(
          `/confirmation?success=true&orderId=${query.get("orderId")}`
        );
      } else {
        history.push(`/confirmation?canceled=true`);
      }
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    checkStripeResponseQueryParams();
    loadCartData();
  }, []);

  const cartCount = () => {
    return cartData ? cartData.length : 0;
  };

  // const [category, setCategory] = useState();
  return (
    <AppContext.Provider value={{ user, loadCartData }}>
      <Route
        render={(routerProps) => (
          <Header
            {...routerProps}
            user={user}
            cartCount={cartCount()}
            setUser={setUser}
            setCartData={setCartData}
          />
        )}
      />
      <Navbar />
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
      <main>
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
                label={SHOW_CART}
              />
            )}
          />
          <Route
            path="/confirmation"
            exact={true}
            render={(routerProps) => (
              <Confirmation
                {...routerProps}
                cartData={cartData}
                user={user}
                label={SHOW_ORDER}
                loadCartData={loadCartData}
              />
            )}
          />
          <Route
            path="/login"
            exact={true}
            render={(routerProps) => (
              <Login
                {...routerProps}
                setUser={setUser}
                loadCartData={loadCartData}
              />
            )}
          />
          <Route
            path="/signup"
            exact={true}
            render={(routerProps) => (
              <SignUp
                {...routerProps}
                setUser={setUser}
                loadCartData={loadCartData}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </AppContext.Provider>
  );
}

export default App;
