import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../model/IPost';

export let postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7070' }),
  endpoints: (build) => ({
    // Получение всех постов
    getPosts: build.query<IPost[], void>({
      query: () => ({
        url: '/api/twitter/posts',
      }),
      providesTags: ['Post'],
    }),

    // Создание нового поста
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: '/api/twitter/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'], // Инвалидируем кэш для перезагрузки списка
    }),

    // Удаление поста
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/api/twitter/posts/${post._id?.trim()}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'], // Инвалидируем кэш для обновления списка
    }),

    // Обновление поста
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/api/twitter/posts/${post._id?.trim()}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
