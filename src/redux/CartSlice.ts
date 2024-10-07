import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Track quantity of each item
}

interface CartState {
  userCarts: {
    [userId: number]: CartItem[]; // Store carts for each user
  };
}

const initialState: CartState = {
  userCarts: {}, // Initially, no user has any items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(
      state,
      action: PayloadAction<{ userId: number; items: CartItem[] }>
    ) {
      const { userId, items } = action.payload;
      state.userCarts[userId] = items; // Store the cart items for the specific user
    },
    addItemToCart(
      state,
      action: PayloadAction<{ userId: number; item: CartItem }>
    ) {
      const { userId, item } = action.payload;
      const userCart = state.userCarts[userId] || [];
      const existingItemIndex = userCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        userCart[existingItemIndex].quantity += item.quantity; // Increase quantity if item exists
      } else {
        userCart.push(item); // Add new item to the cart
      }

      state.userCarts[userId] = userCart; // Update the user's cart
    },
    removeItemFromCart(
      state,
      action: PayloadAction<{ userId: number; itemId: number }>
    ) {
      const { userId, itemId } = action.payload;
      const userCart = state.userCarts[userId] || [];
      state.userCarts[userId] = userCart.filter((item) => item.id !== itemId); // Remove the item
    },
    clearCart(state, action: PayloadAction<{ userId: number }>) {
      const { userId } = action.payload;
      state.userCarts[userId] = []; // Clear all items from the user's cart
    },
  },
});

export const { setCartItems, addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
