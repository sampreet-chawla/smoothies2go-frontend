import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getItemsByCategories = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/items/category-groups`);
    const itemsData = await res.data.data;
    return itemsData;
  } catch (error) {
    console.log(
      `Error fetching items (grouped by categories) from backend: ${error.message}`
    );
  }
};

export const addToCart = async (cartData) => {
  try {
    const data = await axios({
      method: "post",
      url: `${BACKEND_URL}/api/cartitems/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(cartData),
    });
    console.log("addTocart data", data.data);
    // if (data.data.data) {
    // }
  } catch (err) {
    console.log(`Error adding item to the cart ${err.message}`);
  }
};
