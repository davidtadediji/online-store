import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { Row, CardGroup } from "react-bootstrap";
import ItemCard from "./itemCard";
import RangeCard from "./rangeCard";
import GroupCard from "./groupCard";
import SlideShow from "./slideShow";
import { useState, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "./../services/CartContext";
import { useContext } from "react";
import image3 from "../assets/img/project-img3.png";
import NoItemsFound from './NoItemsFound';
import { AuthContext } from "../services/AuthContext";

const ItemCollection = ({
  type,
  slideImages,
  collectionName,
  products,
  groups,
  headerColor,
  textColor,
  filters,
}) => {

  
  // Navigation
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 600;
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 600;
  };

  // Apply filters on products
  const filteredProducts = products
    .filter((product) => {
      if (filters.priceRange !== "") {
        // Apply price range filter
        const [minPrice, maxPrice] = filters.priceRange.split("-");
        const productPrice = product.price;
        return (
          productPrice >= parseFloat(minPrice) &&
          productPrice <= parseFloat(maxPrice)
        );
      }
      return true;
    })
    .filter((product) => {
      if (filters.color !== "") {
        // Apply color filter
        return product.color === filters.color;
      }
      return true;
    })
    .filter((product) => {
      if (filters.size !== "") {
        // Apply size filter
        return product.size === filters.size;
      }
      return true;
    })
    .filter((product) => {
      if (filters.brand !== "") {
        // Apply brand filter
        return product.brand === filters.brand;
      }
      return true;
    });

  const { addToCart } = useContext(CartContext);
  const { isSignedIn } = useContext(AuthContext);

  const handleAddToCart = (id) => {
    if (isSignedIn) {
      // If authenticated, proceed with adding the item to the cart
      const newItem = filteredProducts.find((product) => product.id === id);
      if (newItem) {
        const itemWithQuantity = {
          ...newItem,
          quantity: 1,
          status: "In Stock",
          prevPrice: "7000",
        };
        addToCart(itemWithQuantity);
        // toast.success("Item has been added to Cart.");
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="items w-full md:w-[90%] lg:w-full flex-grow">
      <div className="items__header p-2 ">
        <h4 className="items__text--title">{collectionName}</h4>
      </div>
      {filteredProducts.length !== 0 ? (
        <div className="grid grid-cols-2 p-2 bg-white md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredProducts.slice(0, 12).map((deal, index) => (
            <ItemCard
              key={index}
              {...deal}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <NoItemsFound title="Filtered Product List" />
      )}
      <div
        className="scroll-arrow scroll-arrow-left"
        onClick={handleScrollLeft}
      >
        <FaArrowLeft />
      </div>
      <div
        className="scroll-arrow scroll-arrow-right"
        onClick={handleScrollRight}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default ItemCollection;
