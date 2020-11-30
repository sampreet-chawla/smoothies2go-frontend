import React, { useState, useEffect } from "react";
import { getItemsByCategories } from "../../api-services/item-service";
import CategoryRow from "../CategoryRow/CategoryRow";
import "./ItemsDisplay.css";
import SmoothiesImage from "../../img/smoothies2go_3049_2000.png";

function ItemsDisplay() {
  const [itemsList, setItemsList] = useState([]);

  const getItemsList = async () => {
    try {
      const itemsData = await getItemsByCategories();
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

  if (itemsList) {
    const rowJSX = itemsList.map((row, index) => (
      <CategoryRow
        id={`category${index + 1}`}
        key={index}
        title={row.category}
        items={row.items}
      />
    ));
    return (
      <div className="items-display">
        <img
          src={SmoothiesImage}
          alt="Smothies2GO Image"
          className="smoothies-image"
        />
        {rowJSX}
      </div>
    );
  } else {
    return <h4 style={{ color: "green" }}>Loading...</h4>;
  }
}

export default ItemsDisplay;
