import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { getCartItems } from "../../api-services/cart-service";
import { SHOW_CART, SHOW_ORDER } from "../../constants";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import Cart from "../Cart/Cart";
import Confirmation from "../Confirmation/Confirmation";
import Footer from "../Footer/Footer";

export const AppContext = createContext(null);

function App({ history }) {
  const fetchUser = () => {
    const result = localStorage.getItem("user");
    return result ? JSON.parse(result) : null;
  };

  const [user, setUser] = useState(() => fetchUser());
  console.log("User: ", user);

  const [cartData, setCartData] = useState([]);

  const loadCartData = async () => {
    const loggedInUser = (await user) || (await fetchUser());
    if (loggedInUser) {
      const cartData = await getCartItems(loggedInUser);
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

  // For Anchor Tags within React Routes (via Navbar)
  const takeToHashPosition = () => {
    const hash = history.location.hash;
    if (hash && document.getElementById(hash.substr(1))) {
      // Check if there is a hash and if an element with that id exists
      document
        .getElementById(hash.substr(1))
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    checkStripeResponseQueryParams();
    loadCartData();
    takeToHashPosition();
  }, [history.location.hash]);

  const cartCount = () => {
    return cartData ? cartData.length : 0;
  };

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
      <Route component={Navbar} />
      {/* Not Required but retained for Positioning - Was to be displayed by Navbar */}
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
      {/* End of div */}
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
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
