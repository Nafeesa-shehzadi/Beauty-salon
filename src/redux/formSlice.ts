import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  gender: string;
  birthday: Date | null; // Adjust this to Date if necessary
  file: File | null; // Change based on your file handling
}

const initialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  city: "",
  zip: "",
  state: "",
  gender: "",
  birthday: null,
  file: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormData>) {
      return { ...state, ...action.payload };
    },
    clearFormData(state) {
      return initialState;
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
