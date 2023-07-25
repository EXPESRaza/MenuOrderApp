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

  const submitOrder = async (menuItems) => {
    try {
      let orderMenuItems = menuItems.filter((item) => {
        if (item.quantity != null && item.quantity > 0)
        {
          return true;
        }
        else {
          return false;
        }
      })

      var orderMenuItemsForPost = []
      orderMenuItems.forEach(item => {
        let quantity = item.quantity
        delete item.quantity;
        if (quantity > 0) {
          for (let i = 0; i < quantity; i++) {
            orderMenuItemsForPost.push(item);
          }
        }
      });

      const postOrderJson = JSON.stringify(orderMenuItemsForPost);
      console.log(postOrderJson);
      
      const response = await axios.post(
        "https://thingproxy.freeboard.io/fetch/https://testmenuorderapi.azurewebsites.net/Order",
        postOrderJson,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);

    } catch (error) {
      console.error("Error submit Order:", error);
    }
  };

  const addToOrder = (menuItem) => {
    addToQuantity(menuItem, menuItems)
  };

  const addToQuantity = (menuItem) => {
    if (menuItem.quantity == null)
    {
      menuItem.quantity = 0;
    }
    menuItem.quantity += 1;
    setMenuItems([...menuItems]);
    // console.log(menuItem);
  };

  const removeFromQuantity = (menuItem) => {
    if (menuItem.quantity == null || menuItem.quantity <= 0)
    {
      menuItem.quantity = 0;
    }
    else
    {
      menuItem.quantity -= 1;
    }
    setMenuItems([...menuItems])
    // console.log(menuItem);
  };

  const calculateTotalOrderCost = (menuItems) => {
    var totalOrderCost = 0;
    menuItems.forEach(menuItem => {
      var { price = 0, quantity = 0 } = menuItem;
      totalOrderCost += price * quantity;
    });  
    return totalOrderCost;
  };

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
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
                <td>
                  <button onClick={() => addToOrder(menuItem)}>Add to Order</button>
                  &nbsp;
                  <button onClick={() => addToQuantity(menuItem)}>+</button>
                  &nbsp;
                  <label>{menuItem.quantity}</label>
                  &nbsp;
                  <button onClick={() => removeFromQuantity(menuItem)}>-</button>
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </ul>
      </div>
      <div>
        <h3>Total Cost of the Order: {currencyFormat(calculateTotalOrderCost(menuItems))}</h3>
      </div>
      <hr />
      <button onClick={() => submitOrder(menuItems)}>Submit Order</button>
    </div>
  );
};

export default MenuOrderApp;
