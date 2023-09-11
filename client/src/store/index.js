import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import auth from "./authSlice";
import event from './eventSlice';
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, auth)


export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        event: event
    },
})

export const persistor = persistStore(store)
// const reducers = combineReducers({
//     auth,
// });

// const persistConfig = {
//     key: 'root',
//     storage
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//     reducer: persistedReducer,
// });
