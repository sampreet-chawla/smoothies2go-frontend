import React, { useState, useEffect } from "react";
import { round } from "../../utils";

import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. Specify the Publisher API Key.
const stripePromise = loadStripe(
  "pk_test_51HpbVCG9f8uyvBw0jfj9G5PmbcuqWEW2Byis1w4apIYcImA6OCJITqtozwv8yio7uqD4ikEyW9jV7wzk8jRNQMkH00mCY3WVWs"
);

function Confirmation({ user, cartData, loadCartData }) {
  let chargeDetails = {
    subTotalPrice: 0.0,
    feesAndTax: 0.0,
    totalPrice: 0.0,
  };
  // const loadSuccessContent = () => {
  //   return (<div className="cover">
  //   <div className="confirm">
  //     <h2>Thank you!</h2>
  //     <p>
  //       The order has been confirmed, and will be ready for pickup in 15-20minutes, here are the
  //       details
  //     </p>
  //     <hr />
  //     <div>
  //       <h5>Confirmation will be sent to your email: {}</h5>
  //       <h5>Order number: #123456</h5>
  //       <h5>Order date: {new Date().toString()}</h5>
  //       <h5>Order total: ${}</h5>
  //       <Link to="/">
  //         <button>Continue shopping</button>
  //       </Link>
  //     </div>
  //   </div>
  // </div>);
  // }

  // const loadCancelledContent = () => {
  //   return (<div className="cover">
  //   <div className="confirm">
  //     <h2>Thank you!</h2>
  //     <p>
  //       The order will be ready for pickup in 15-20minutes, here are the
  //       details
  //     </p>
  //     <hr />
  //     <div>
  //       <h5>Confirmation will be sent to your email: {}</h5>
  //       <h5>Order number: #123456</h5>
  //       <h5>Order date: {new Date().toString()}</h5>
  //       <h5>Order total: ${}</h5>
  //       <Link to="/">
  //         <button>Continue shopping</button>
  //       </Link>
  //     </div>
  //   </div>
  // </div>);
  // }

  const OrderDisplay = ({ handleClick }) => {
    let subTotalPrice = cartData.reduce(
      (subTotalPrice, cartItem) =>
        (subTotalPrice = round(
          subTotalPrice + cartItem.item.price * cartItem.qty,
          2
        )),
      0.0
    );
    const feesAndTax = round(subTotalPrice * 0.1, 2);
    const totalPrice = round(subTotalPrice + feesAndTax, 2);
    chargeDetails = { subTotalPrice, feesAndTax, totalPrice };

    return (
      <section className="summary">
        <div className="summary">
          <h2 className="h2-responsive">Summary</h2>
          <p>Sub-total.price: ${subTotalPrice}</p>
          <p>Fees and Tax:: ${feesAndTax}</p>
          <p>Total Price: ${totalPrice}</p>
          <p>
            <button
              type="button"
              className="btn btn-primary"
              role="link"
              onClick={handleClick}
            >
              <i className="fa fa-lock"></i> &nbsp; Make Payment
            </button>
          </p>
        </div>
      </section>
    );
  };

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event) => {
    console.log("handleClick called.. ");
    try {
      const stripe = await stripePromise;
      const response = await fetch(
        "http://localhost:4501/api/stripe-payment/create-session",
        {
          method: "POST",
          headers: {
            // Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amt: chargeDetails.totalPrice * 100,
            userEmail: user.email,
          }),
        }
      );
      console.log("create-session called.. ");
      const session = await response.json();
      // When the customer clicks on the button, redirect them to Checkout.
      console.log("Redirecting to checkout.. ");
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log("Got result: ", result);
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        setMessage(result.error.message);
      }
    } catch (err) {
      console.log("Error posting request to payment server: ", err);
      setMessage(
        "Error posting request to payment server, the server maybe down. " +
          err.message
      );
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <OrderDisplay handleClick={handleClick} />
  );
}

export default Confirmation;
