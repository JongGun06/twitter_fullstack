import { IUser } from "../model/IUser";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export let userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7070" }),
  endpoints: (build) => ({


    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: "/api/twitter/users"
      }),
      providesTags: ["User"]
    }),
    


    getUser: build.query<IUser, string>({
        query: (googleId) => ({
            url: `/api/twitter/users/${googleId}`,
        }),
        providesTags: ["User"],
    }),
    
    
    // Новый endpoint для проверки существования пользователя
    checkUserExistence: build.query<{ exists: boolean }, string>({
        query: (email) => ({
          url: `/api/twitter/users/check-existence`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }) // 👈 Добавил JSON.stringify()
        })
      }),
      
      
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: "/api/twitter/users",
        method: "POST",
        body: user
      }),
      invalidatesTags: ["User"]
    }),


    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/twitter/users/${user._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['User']
    }),



    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/twitter/users/${user._id}`,
        method: "PUT",
        body: user
      }),
      invalidatesTags: ['User']
    })


  })
});

export default userApi.reducer;
