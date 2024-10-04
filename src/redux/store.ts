import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";

// Persistence configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducers for both users and messages
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMessageReducer = persistReducer(persistConfig, messageReducer);

const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    messages: persistedMessageReducer, // Now this reducer is also persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

// Create the persistor for the store
export const persistor = persistStore(store);
