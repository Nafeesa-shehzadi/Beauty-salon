import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/CartSlice"; // Import your action
import { RootState } from "../redux/store";
interface MakeupProduct {
  id: number;
  name: string;
  image_link: string;
  price: number;
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #b08097;
  padding: 20px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a74275;
  }
  cursor: pointer;
  padding: 20px;
  gap: 20px;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 10px;
  max-width: 100%;
  max-height: 100%;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.span<{ isActive: boolean }>`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#da5e9c" : "#ddd")};
  transition: background-color 0.3s ease;
`;

const ImageCarousel: React.FC = () => {
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // Initialize dispatch
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  // Fetch images from Makeup API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
        );
        const data = await response.json();
        const imageLinks = data.slice(0, 20); // Limit to 20 products
        setProducts(imageLinks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching makeup products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addToCart = () => {
    if (!currentUser) {
      alert("Please login to add items to cart");
      return;
    }
    const productToAdd = {
      id: products[currentIndex].id,
      name: products[currentIndex].name,
      price: products[currentIndex].price,
      image: products[currentIndex].image_link,
      quantity: 1, // Default quantity
    };

    dispatch(addItemToCart({ userId: currentUser.id, item: productToAdd })); // Dispatch add item to cart
    alert(`${products[currentIndex].name} added to cart!`); // Optional: alert message
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!products.length) {
    return <p>No products found</p>;
  }

  return (
    <CarouselContainer>
      <Box textAlign="center" mt={4} mb={4}>
        <Typography variant="h2">What We Sell</Typography>
      </Box>
      <ImageContainer>
        <Image
          src={products[currentIndex].image_link}
          alt={products[currentIndex].name}
        />
        <Typography variant="h6">
          Name: {products[currentIndex].name}
        </Typography>
        <Typography variant="h6">
          Price: ${products[currentIndex].price}
        </Typography>
        <Button variant="contained" color="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </ImageContainer>

      {/* Navigation Icons */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={handlePrevious}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Dots below the carousel */}
      <DotsContainer>
        {products.map((_, index) => (
          <Dot key={index} isActive={index === currentIndex} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default ImageCarousel;
