import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMessage, messagess } from '../model/IMessage';

export let chatApi = createApi({
    reducerPath: "chatApi",
    tagTypes:["Mess"],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:7070"}),
    endpoints:(build) => ({
        getMessages: build.query<messagess[], void>({
            query:() => ({
                url: "/api/twitter/chat"
            }),
            providesTags: ["Mess"]
        }),
        getMessage: build.query<messagess[], string>({
            query: (idd) => ({
                url: `/api/twitter/chat/${idd}`
            }),
            providesTags: ["Mess"]
        }),
        createMessage: build.mutation<messagess,messagess>({
            query:(message) => ({
                url:`/api/twitter/chat`,
                method:"POST",
                body: message
            }),
            invalidatesTags:["Mess"]
        })
    })
})

export default chatApi.reducer