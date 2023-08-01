import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import burgerImage from "../assets/burger.jpg";
import pastaImage from "../assets/pasta.jpg";
import pizzaImage from "../assets/pizza.jpg";
import saladImage from "../assets/salad.jpg";
import "./Menu.css";

const Menu = ({ table_No }) => {
  const { tableNo } = useParams();

  const menuItemsData = [
    {
      id: 1,
      name: "Burger",
      price: 10,
      image: burgerImage,
      category: "Main Course",
    },
    {
      id: 2,
      name: "Pizza",
      price: 12,
      image: pizzaImage,
      category: "Main Course",
    },
    {
      id: 3,
      name: "Salad",
      price: 8,
      image: saladImage,
      category: "Appetizer",
    },
    {
      id: 4,
      name: "Pasta",
      price: 9,
      image: pastaImage,
      category: "Main Course",
    },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const addToCart = (item) => {
    const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...item, quantity: 1 },
      ]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems.filter((cartItem) => cartItem.quantity > 0));
  };

  // Function to calculate the total cart amount
  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to filter menu items based on selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItemsData
      : menuItemsData.filter((item) => item.category === selectedCategory);

  // Get unique food categories from the menu data
  const foodCategories = [
    "All",
    ...new Set(menuItemsData.map((item) => item.category)),
  ];

  // Function to handle order submission
  const navigate = useNavigate();
  const handleSubmitOrder = async () => {
    const postData = {
      tableNo: tableNo,
      status: "preparing",
      items: cartItems,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/orders/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newOrderData = await response.json();
      if (newOrderData.statusCode === 200) {
        toast.success("Your order has been placed successfully");
        navigate("/cooking");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="menu-container">
      <div className="left-section">
        <h2 className="text-cyan-900 font-bold">Food Categories</h2>
        <ul className="category-list">
          {foodCategories.map((category) => (
            <li key={category}>
              <button
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="menu">
        <h2 className="heading">Menu</h2>
        <ul className="menu-list">
          {filteredMenuItems.map((item) => {
            const cartItem = cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <li key={item.id} className="menu-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <div className="quantity-controls">
                    <button
                      className="decrement-button"
                      onClick={() => removeFromCart(item)}
                      disabled={quantity === 0}
                    >
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button
                      className="increment-button"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="order">
        <h2 className="heading">Order for Table {table_No}</h2>
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>
                ${item.price} x {item.quantity}
              </span>
            </li>
          ))}
        </ul>
        <p className="total-amount">Total: ${getTotalAmount()}</p>

        {orderSubmitted && <p>Order submitted successfully!</p>}

        <button className="submit-button" onClick={() => handleSubmitOrder()}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Menu;
