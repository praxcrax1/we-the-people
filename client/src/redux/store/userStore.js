import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

const rootReducer = {
  user: userReducer,
  // Add other reducers here as needed
};


const store = configureStore({
    reducer: rootReducer,
    // You can add middleware and other options here if needed
  });

export default store;
