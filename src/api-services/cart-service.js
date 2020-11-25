import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getCartItems = async (user) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/cartitems/userId/${user._id}`
    );
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(
      `Error fetching items (grouped by categories): ${error.message}`
    );
  }
};

export const updateQuantity = async (cartId, qty) => {
  try {
    const res = await axios.put(
      `${BACKEND_URL}/api/cartitems/id/${cartId}/qty/${qty}`
    );
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(`Error updating cart- item quantity: ${error.message}`);
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/api/cartitems/id/${cartId}`);
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(`Error deleting cart-item: ${error.message}`);
  }
};
