import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import UserSlice from './slices/UserSlice'
import TodoSlice from "./slices/TodoSlice";
import ExpenseSlice from "./slices/ExpenseSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    users: UserSlice,
    todos: TodoSlice,
    expenses: ExpenseSlice
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistedStore };
