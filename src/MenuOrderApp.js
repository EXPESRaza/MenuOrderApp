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

  const submitOrder = async () => {
    try {
      const response = await axios.post(
        "https://thingproxy.freeboard.io/fetch/https://testmenuorderapi.azurewebsites.net/Order",
        [ 
          {
            "id": 6,
            "category": "Sides",
            "itemName": "Fries",
            "price": 3.95
          },
          {
            "id": 8,
            "category": "Sides",
            "itemName": "Salad",
            "price": 2.95
          },
          {
            "id": 10,
            "category": "Drinks",
            "itemName": "Coffee",
            "price": 2.95
          }
        ],
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data)
    } catch (error) {
      console.error("Error submit Order:", error);
    }
  };

  const addToOrder = (orderItem) => {
    console.log(orderItem);
    };

  return (
    <div>
      <h1>Menu Order App</h1>
      <button onClick={fetchMenuItems}>Fetch Menu Items</button>
      <div>
      <ul>
        <table>
          <tbody>
            <tr>
              <td><b>ID</b></td>
              <td><b>Category</b></td>
              <td><b>Name</b></td>
              <td><b>Price</b></td>
            </tr>
            {menuItems.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>{menuItem.id}</td>
                <td>{menuItem.category}</td>
                <td>{menuItem.itemName}</td>
                <td>{menuItem.price}</td>
                <td><button  onClick={() => addToOrder(menuItem)}>Add to Order</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </ul>
      </div>
      <hr />
      <button onClick={submitOrder}>Submit Order</button>
    </div>
  );
};

export default MenuOrderApp;
