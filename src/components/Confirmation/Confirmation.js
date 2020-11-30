import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import {
  BACKEND_URL,
  STRIPE_PUBLISHABLE_KEY,
  PAID_STATUS,
} from "../../constants";

import {
  updateOrderPaid,
  updateOrderCancelled,
} from "../../api-services/order-services";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import "./Confirmation.css";

import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. Specify the Publisher API Key.
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Confirmation({ user, cartData, loadCartData, label }) {
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState("");

  const loadOrderContent = () => {
    return (
      <MDBRow>
        <MDBCol md="0">
          <MDBCard>
            <MDBCardBody>
              <div className="cover" style={{ margin: "0 20px" }}>
                <div className="confirm">
                  {order.order_status === PAID_STATUS ? (
                    <p>
                      Thank You! Your order will be ready for pickup in
                      15-20mins.
                    </p>
                  ) : (
                    <p>The order has been cancelled, here are the details -</p>
                  )}
                  <br />
                  <div style={{ textAlign: "left" }}>
                    <p>
                      Order#: <span className="right-align">#{order._id}</span>
                    </p>
                    <p>
                      Order Date:{" "}
                      <span className="right-align">
                        {new Date(order.order_date_time).toString()}
                      </span>
                    </p>
                    <p>
                      Order Total:{" "}
                      <span className="right-align">${order.total_price}</span>
                    </p>
                    <p>
                      Order Status:{" "}
                      <span className="right-align">{order.order_status}</span>
                    </p>
                    <br />
                    <p style={{ textAlign: "center" }}>
                      Please visit us again!
                    </p>
                    <p style={{ textAlign: "center" }}>
                      <Link to="/">
                        <button
                          className="btn default-color btn-lg my-0 p"
                          style={{
                            borderRadius: "5px",
                            fontSize: "10px",
                            color: "black",
                          }}
                          role="link"
                        >
                          Continue Shopping
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  };

  const Message = ({ message }) => (
    <section>
      <h2 className="h2-responsive">{message}</h2>
    </section>
  );

  const loadOrderResponse = async () => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      // Update Order status in Backend database
      const orderId = query.get("orderId");
      const order = await updateOrderPaid(user.token, orderId);
      setOrder(order);
      await loadCartData();
      console.log("Success order: ", order);
      // Set success message
      setMessage("Order Confirmation");
    }
    if (query.get("canceled")) {
      // Update Order status in Backend database
      const order = await updateOrderCancelled(user.token, order.orderId);
      setOrder(order);

      // Set Failed message
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  };

  useEffect(() => {
    loadOrderResponse();
  }, []);

  const handleClick = async (subTotalPrice, feesAndTax, totalPrice) => {
    console.log("handleClick called.. ");
    try {
      const stripe = await stripePromise;
      const response = await fetch(
        `${BACKEND_URL}/api/stripe-payment/create-session`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // amt: chargeDetails.totalPrice * 100,
            amt: totalPrice * 100,
            userEmail: user.email,
            userId: user._id,
            cart_items: cartData.reduce((cartIds, cartItem) => {
              cartIds.push(cartItem._id);
              return cartIds;
            }, []),
            sub_total_price: subTotalPrice,
            fees_tax: feesAndTax,
            total_price: totalPrice,
          }),
        }
      );
      console.log("create-session called.. ");
      const session = await response.json();

      // Redirect customer to Strike Checkout Form.
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
    <div className="confirmation-container">
      <div className="confirmation-header">
        {/* Need to make the images transparent. */}
        {/* <img
          src="https://i.imgur.com/SxW9gfet.png"
          alt="coconut photo"
          width="50px"
        /> */}
        <Message message={message} />
        {/* <img
          src="https://i.imgur.com/zdnKWQft.png"
          alt="pineapple photo"
          width="50px"
        /> */}
      </div>
      {order && order.order_status ? loadOrderContent() : <></>}
    </div>
  ) : (
    <Cart
      user={user}
      cartData={cartData}
      loadCartData={loadCartData}
      label={label}
      handleClick={handleClick}
    />
  );
}

export default Confirmation;
