import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: number;
  name: string;
  date: string;
  persons: number;
  desc: string;
  service: string;
}

interface Service {
  id: number;
  url: string;
  title: string;
}

interface MessageState {
  messages: Booking[];
  searchTerm: string;
  services: Service[]; // Store services here
}

const initialState: MessageState = {
  messages: [],
  searchTerm: "",
  services: [
    { id: 1, url: "/MENI&PEDI.jpg", title: "Manicures Pedicures" },
    { id: 2, url: "/FACIAL.jpg", title: "Facial Treatments" },
    { id: 3, url: "/hairstyle.jpg", title: "Hair Care" },
    { id: 4, url: "/bridalmakeup2.jpg", title: "Bridal Makeup" },
    { id: 5, url: "/makeup.jpg", title: "Party Makeup" },
    { id: 6, url: "/mehndi.jpeg", title: "Mehndi" },
    { id: 7, url: "/nailart3.jpg", title: "Nail Art" },
    { id: 8, url: "/wax.jpg", title: "Waxing" },
    { id: 9, url: "/threading.jpg", title: "Threading" },
  ], // Predefined services list
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        date: string;
        persons: number;
        desc: string;
        service: string;
      }>
    ) => {
      state.messages.push(action.payload);
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        date: string;
        persons: number;
        desc: string;
        service: string;
      }>
    ) => {
      const index = state.messages.findIndex(
        (message) => message.id === action.payload.id
      );
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    deleteMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addMessage, updateMessage, deleteMessage, setSearchTerm } =
  messagesSlice.actions;

export default messagesSlice.reducer;
