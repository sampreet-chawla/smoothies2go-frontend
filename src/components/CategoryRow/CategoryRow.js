import React, { useState } from "react";
import { addToCart } from "../../api-services/item-service";
import { AppContext } from "../App/App";
import "./CategoryRow.css";

import AlertModal from "../AlertModal/AlertModal";

function CategoryRow({ id, title, items }) {
  const { user, loadCartData } = React.useContext(AppContext);

  const emptyShowModal = {
    show: false,
    title: "",
    message: "",
    messageType: "",
  };
  const [showModal, setShowModal] = useState(emptyShowModal);
  const hideModal = () => setShowModal(emptyShowModal);
  console.log("showModal: ", showModal);

  const handleAddToCart = async (item) => {
    console.log(`Clicked ${item.item_name}`);
    if (user) {
      const userId = user._id;
      console.log(`Adding cart for user -  ${userId}`);
      await addToCart(user.token, {
        user: user._id,
        item: item._id,
        qty: 1,
      });
      // window.alert(`1 ${item.item_name} added to cart`);
      setShowModal({
        show: true,
        title: "Added to Cart",
        message: `1 "${item.item_name}" added to the cart`,
        messageType: "success",
      });
      loadCartData();
    } else {
      setShowModal({
        show: true,
        title: "Please Login",
        message: `Kindly login to add items to the cart`,
        messageType: "alert",
      });
    }
  };

  const loadItemCards = () => {
    return items.map((item) => {
      return (
        <div className="col-lg-3 col-md-6 mb-4" key={item._id}>
          <div className="card">
            {/* <!--Card image--> */}
            <div className="view overlay" width="200">
              <img
                src={item.thumbnail_image_url}
                className="card-img-top"
                alt={item.item_name}
              />
              <a>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>
            {/* <!--Card image--> */}

            {/* <!--Card content--> */}
            <div className="card-body text-center">
              <strong>
                <h6 className="font-weight-bold black-text">
                  <strong>{item.item_name}</strong>
                </h6>
              </strong>
              <p style={{ color: "gray", fontSize: "12px" }}>
                {item.description}
              </p>
              <h6 className="font-weight-bold black-text">
                <strong>${item.price}</strong>
              </h6>
              <button
                className="btn default-color btn-lg my-0 p"
                // className="btn deep-orange lighten-1 btn-lg my-0 p"
                // className="btn btn-md my-0 p"
                type="submit"
                style={{ borderRadius: "5px", fontSize: "10px" }}
                onClick={() => handleAddToCart(item)}
              >
                Add to cart
                <i className="fas fa-shopping-cart ml-1"></i>
              </button>
            </div>
            {/* <!--Card content--> */}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="text-center mb-4" id={id}>
      <AlertModal showModal={showModal} hideModal={hideModal} />
      <h3
        className="h3-responsive category-title"
        style={{ paddingBottom: "10px", paddingTop: "15vh" }}
      >
        <strong>
          {/* <em>{title}</em> */}
          {title}
        </strong>
      </h3>
      <div className="row wow fadeIn">{loadItemCards()}</div>
    </section>
  );
}
export default CategoryRow;
