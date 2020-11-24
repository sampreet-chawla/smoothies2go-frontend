import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getItemsByCategories = async (url) => {
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
