import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getCartItems = async (user) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BACKEND_URL}/api/cartitems/userId/${user._id}`,
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    });
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(
      `Error fetching items (grouped by categories): ${error.message}`
    );
  }
};

export const updateQuantity = async (token, cartId, qty) => {
  try {
    const res = await axios({
      method: "put",
      url: `${BACKEND_URL}/api/cartitems/id/${cartId}/qty/${qty}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(`Error updating cart- item quantity: ${error.message}`);
  }
};

export const deleteCartItem = async (token, cartId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BACKEND_URL}/api/cartitems/id/${cartId}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(`Error deleting cart-item: ${error.message}`);
  }
};
