import { BACKEND_URL } from "../constants";
import axios from "axios";

export const updateOrderPaid = async (orderId, userId) => {
  try {
    const data = await axios({
      method: "put",
      url: `${BACKEND_URL}/api/orders/paid/id/${orderId}/user/${userId}`,
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

export const updateOrderCancelled = async (orderId) => {
  try {
    const data = await axios({
      method: "put",
      url: `${BACKEND_URL}/api/orders/cancel/id/${orderId}`,
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
