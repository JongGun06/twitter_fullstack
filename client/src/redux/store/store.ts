import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/UserAction";
import { postApi } from "../services/PostAction";
import { messageApi } from "../services/MessageAction";


let rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
})

export let setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (def) => def().concat(userApi.middleware, postApi.middleware, messageApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']