import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/CartSlice"; // Import your action
import { RootState } from "../redux/store";
import { styled } from "@mui/material/styles"; // Import styled from MUI

interface MakeupProduct {
  id: number;
  name: string;
  image_link: string;
  price: number;
}

const CarouselContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
  overflow: "hidden",
  width: "100%",
  height: "110vh",
  padding: "20px",
  position: "relative",
});

const ImgSection = styled(Box)(() => ({
  backgroundImage: `url("/carsel.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  width: "100%",
  zIndex: -1,
  flexDirection: "column",
  minHeight: "400px",
  gap: "20px",
}));

const CardContainer = styled(Card)({
  width: "300px",
  margin: "20px",
  height: "400px",
  backgroundColor: "#fff", // Card background
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s",
  position: "relative", // Set position to relative
  top: "-110px", // Move card up to overlap the ImgSection
  "&:hover": {
    transform: "scale(1.05)", // Slight zoom effect
  },
  color: "#000",
});

const Image = styled("img")({
  width: "100%",
  height: "200px",
  borderRadius: "10px",
});

const DotsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

const Dot = styled("span")<{ isActive: boolean }>(({ isActive }) => ({
  height: "20px",
  width: "20px",
  margin: "0 5px",
  borderRadius: "50%",
  backgroundColor: isActive ? "#da5e9c" : "#ddd",
  transition: "background-color 0.3s ease",
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  width: "500px",
  padding: "5px",
  borderRadius: "8px",
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff", // Dark background for dark theme
  "& .MuiInputBase-input": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000", // White text for dark theme, black for light
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "dark" ? "#777" : "#ddd", // Darker border in dark theme
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main, // Border color on hover
  },
}));

const ImageCarousel: React.FC = () => {
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MakeupProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
        setFilteredProducts(imageLinks); // Initialize filtered products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching makeup products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentIndex(Math.max(0, Math.floor(filtered.length / 2))); // Center the displayed item
    } else {
      setFilteredProducts(products);
      setCurrentIndex(0); // Reset to first item
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(filteredProducts.length - 3, 0) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= filteredProducts.length ? 0 : prevIndex + 1
    );
  };

  const addToCart = (product: MakeupProduct) => {
    if (!currentUser) {
      alert("Please login to add items to cart");
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_link,
      quantity: 1, // Default quantity
    };

    dispatch(addItemToCart({ userId: currentUser.id, item: productToAdd })); // Dispatch add item to cart
    alert(`${product.name} added to cart!`); // Optional: alert message
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!filteredProducts.length) {
    return <p>No products found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the state correctly
  };

  return (
    <CarouselContainer>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <ImgSection>
          <Typography variant="h2">Welcome to Makeup Studio!</Typography>
          <Typography variant="h4">What We Sell</Typography>
          <SearchBox
            type="search"
            label="Search for products..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              ),
            }}
          />
          <Button>About</Button>
        </ImgSection>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "40vh" }}
      >
        <IconButton onClick={handlePrevious}>
          <ArrowBackIos />
        </IconButton>

        {/* Displaying three products at a time */}
        <Grid container spacing={2} justifyContent="center">
          {filteredProducts
            .slice(currentIndex, currentIndex + 3)
            .map((product) => (
              <Grid item xs={12} sm={4} key={product.id}>
                <CardContainer>
                  <Image src={product.image_link} alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="h6">
                      Price: ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(product)}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </CardContainer>
              </Grid>
            ))}
        </Grid>

        <IconButton onClick={handleNext}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Dots below the carousel */}
      <DotsContainer>
        {filteredProducts.map((_, index) => (
          <Dot key={index} isActive={index === currentIndex} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default ImageCarousel;
