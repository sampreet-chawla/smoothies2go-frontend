import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Checkout({ user, cartData, ordered, setOrdered }) {
  const buildSummary = () => {
    console.log("In build summary");
  };

  useEffect(() => {
    buildSummary();
  }, []);

  return cartData && cartData.length > 0 ? (
    <section className="checkout">
      <h2 className="h2-responsive">Summary</h2>
      <Link to="/confirmation">
        <button type="button" className="btn btn-primary" role="link">
          <i className="fa fa-lock"></i> &nbsp; Confirm Purchase
        </button>
      </Link>
    </section>
  ) : (
    <></>
  );
}

export default Checkout;
