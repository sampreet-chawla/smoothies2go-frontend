import { BACKEND_URL } from "../constants";
import axios from "axios";

export const updateOrderPaid = async (token, orderId) => {
  try {
    const data = await axios({
      method: "put",
      url: `${BACKEND_URL}/api/orders/paid/id/${orderId}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log("updateOrderPaid data", data.data);
    const orderDetails = data.data.data;
    return orderDetails;
  } catch (err) {
    console.log(
      `Error updating paid order status for order ${orderId}: ${err.message}`
    );
  }
};

export const updateOrderCancelled = async (token, orderId) => {
  try {
    const data = await axios({
      method: "put",
      url: `${BACKEND_URL}/api/orders/cancel/id/${orderId}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log("updateOrderCancelled data", data.data);
    const orderDetails = data.data.data;
    return orderDetails;
  } catch (err) {
    console.log(
      `Error updating cancelled order status for order ${orderId}: ${err.message}`
    );
  }
};
