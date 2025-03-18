import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import UserSlice from './slices/UserSlice'
import TodoSlice from "./slices/TodoSlice";
import ExpenseSlice from "./slices/ExpenseSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import NoteSlice from "./slices/NoteSlice";
import ThemeSlice from "./slices/ThemeSlice";

const rootReducer = combineReducers({
    users: UserSlice,
    todos: TodoSlice,
    expenses: ExpenseSlice,
    notes: NoteSlice,
    theme: ThemeSlice
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
