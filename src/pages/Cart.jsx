import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCollection from "./../components/productCollection";
import { categoriesData } from "./../mockData/category";
import Title from "./../components/Title";
import Item from "./../components/Item";
import { FaPhone } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../services/CartContext";
import NoItemsFound from "./../components/NoItemsFound";
import OrdersContext from "../services/OrdersContext";
import { toast } from "react-toastify";
import ObjectNotFound from "./../components/ObjectNotFound";
import SkeletonLoader from "../components/SkeletonLoader";
import apiUrl from "../utils/config";

const Cart = () => {
  const similarItems = categoriesData[categoriesData.length - 3];
  const [recommended, setRecommended] = useState([]);
  const customerViewed = categoriesData[categoriesData.length - 1];

  const {
    cartItems,
    total,
    totalPrice,
    removeFromCart,
    clearCart,
    increment,
    decrement,
    cartNotFound,
    isLoading,
  } = useContext(CartContext);

  const { addToOrders, orderItems } = useContext(OrdersContext);

  const handleIncrement = (itemId) => {
    increment(itemId);
  };

  const handleDecrement = (itemId) => {
    decrement(itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      const reconciledItem = {
        ...item,
        status: "Delivered",
        date: new Date().toISOString(),
      };

      addToOrders(reconciledItem);
    });

    toast.success("Your Order was successful.");
  };

  useEffect(() => {
    // Fetch the random products from the server when the component mounts
    axios
      .get(`${apiUrl}products/random`)
      .then((response) => setRecommended(response.data))
      .catch((error) =>
        console.error("Error fetching recommended products:", error)
      );
  }, []);


  return (
    <div className="lg:mx-8 lg:my-4">
      <div className="lg:hidden">
        <Subtotal totalPrice={totalPrice} />
      </div>
      <div className="lg:flex lg:flex-row gap-3">
        <div className="lg:w-3/4 lg:shadow-sm lg:rounded-md lg:bg-white lg:pb-2">
          <Title
            title={`cart(${total})`}
            extraClass="lg:bg-white lg:ml-0 lg:p-2 lg:rounded-t-md"
          />
          {isLoading ? (
            <SkeletonLoader />
          ) : cartNotFound ? (
            <ObjectNotFound title="cart" />
          ) : cartItems.length === 0 ? (
            <NoItemsFound title="cart" />
          ) : (
            cartItems.map((item) => (
              <Item
                key={item._id}
                {...item}
                type="cart"
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))
          )}
        </div>
        <div className="px-4 py-2 flex gap-2 bg-white my-4 lg:w-1/4 lg:flex-col h-min lg:shadow-sm">
          <div className="hidden lg:block">
            <Subtotal totalPrice={totalPrice} />
          </div>

          <button className="p-4 rounded-md border-[1px] border-red-500 text-red-400 lg:hidden">
            <FaPhone className="transform -scale-x-100 " />
          </button>
          <button
            className="w-full shadow-md bg-red-400 text-white rounded-sm lg:rounded-md py-3"
            onClick={handleCheckout}
          >
            CHECKOUT (₦{parseInt(totalPrice).toLocaleString("en-US")})
          </button>
        </div>
      </div>

      <ProductCollection
        use="detail"
        key="You may also like"
        collectionName="You may also like"
        products={recommended}
      />

      <ProductCollection
        use="detail"
        key={similarItems.collectionName}
        {...similarItems}
      />

  

      <ProductCollection
        use="detail"
        key={customerViewed.collectionName}
        {...customerViewed}
      />
    </div>
  );
};

export default Cart;

export const Subtotal = ({ totalPrice }) => {
  return (
    <div>
      <Title title="cart summary" extraClass="lg:ml-0" />
      <div className="px-3 py-2 flex justify-between bg-white lg:p-0">
        <p>Subtotal</p>{" "}
        <p className="font-bold lg:text-xl">
          ₦{parseInt(totalPrice).toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
};
