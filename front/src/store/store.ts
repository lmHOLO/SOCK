import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export default store;
