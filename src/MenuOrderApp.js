import React, { useState } from "react";
import axios from "axios";

const MenuOrderApp = () => {

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(
        "https://thingproxy.freeboard.io/fetch/https://testmenuorderapi.azurewebsites.net/MenuItem"
      );
      console.log(response.data)
      const newArray = removeDuplicateMenuItems(response.data);
      setMenuItems(newArray);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const removeDuplicateMenuItems = (arr) => {
    const uniqueIds = new Set();
    arr.filter((item) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return false;
      } else {
        uniqueIds.delete(item.id);
        return true;
        }
    });
      
    return arr.filter((item) => {
        if (uniqueIds.has(item.id))
        {
            return true;
        }
        return false;
    }) 
  };

  return (
    <div>
      <h1>Menu Order App</h1>
      <button onClick={fetchMenuItems}>Fetch Menu Items</button>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>{menuItem.id} - {menuItem.category} - {menuItem.itemName} - {menuItem.price}</li>
        ))}
      </ul>
      <hr />
      <button >Submit Order</button>
    </div>
  );
};

export default MenuOrderApp;
