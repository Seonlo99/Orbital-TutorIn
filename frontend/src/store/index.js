import {configureStore} from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers";

const userInfofromStorage = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : null;

const initialState = {
    user: { userInfo: userInfofromStorage},
};

const store = configureStore({
    reducer: {
        user:userReducer,
    },
    preloadedState: initialState,
})

export default store;