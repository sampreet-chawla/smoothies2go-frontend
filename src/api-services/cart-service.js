import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getCartItemsForUser = async (user) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/cartitems/userId/${user._id}`
    );
    const cartData = await res.data.data;
    return cartData;
  } catch (error) {
    console.log(
      `Error fetching items (grouped by categories) from backend: ${error.message}`
    );
  }
};
