import React, { useState, useEffect } from "react";
import { getItemsByCategories } from "../../api-services/item-service";
import { BACKEND_URL } from "../../constants";
import CategoryRow from "../CategoryRow/CategoryRow";
import axios from "axios";

function ItemsDisplay(props) {
  const [itemsList, setItemsList] = useState([]);

  const getItemsList = async () => {
    try {
      const data = await axios.get(`${BACKEND_URL}/api/items/category-groups`);
      const itemsData = await data.data.data;
      setItemsList(itemsData);
    } catch (err) {
      console.log(
        `Error fetching items (grouped by categories) from backend: ${err.message}`
      );
    }
  };

  useEffect(() => {
    getItemsList();
  }, []);
  console.log(itemsList);

  //   const loadItems = () => (
  //     <div className="items-display">
  //       {itemsList.map((row, index) => (
  //         <CategoryRow
  //           id={`row${index}`}
  //           key={index}
  //           title={row.category}
  //           items={row.items}
  //         />
  //       ))}
  //     </div>
  //   );

  //   return itemsList ? (
  //     loadItems()
  //   ) : (
  //     <h4 className="h4-responsive">Loading...</h4>
  //   );

  const rowJSX = itemsList.map((row, index) => (
    <CategoryRow
      id={`category${index + 1}`}
      key={index}
      title={row.category}
      items={row.items}
    />
  ));

  if (itemsList) {
    return <div className="items-display">{rowJSX}</div>;
  } else {
    return <h4 className="h4-responsive">Loading...</h4>;
  }
}

export default ItemsDisplay;
