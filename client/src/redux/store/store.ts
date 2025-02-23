import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/UserAction';
import { postApi } from '../services/PostAction';
import { messageApi } from '../services/MessageAction';
import messageSlice from '../reducer/MessageInfoReducer'; // Убедись, что здесь правильный путь
import { chatApi } from '../services/ChatAction';

const rootReducer = combineReducers({
    messageSlice,  // Пример правильного подключения редьюсера
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [chatApi.reducerPath]:chatApi.reducer
});

export let setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (def) => def().concat(userApi.middleware, postApi.middleware, messageApi.middleware,chatApi.middleware),
    });
};

// Типизация состояния
export type RootState = ReturnType<typeof rootReducer>; // Генерация типа для состояния
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
