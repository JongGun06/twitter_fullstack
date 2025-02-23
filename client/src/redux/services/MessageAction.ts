import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMessage } from '../model/IMessage';

export let messageApi = createApi({
    reducerPath: "messageApi",
    tagTypes:["Mess"],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:7070"}),
    endpoints:(build) => ({
        getMessages: build.query<IMessage[], void>({
            query:() => ({
                url: "/api/twitter/messages"
            }),
            providesTags: ["Mess"]
        }),
        getMessage: build.query<IMessage, string>({
            query:(id) => ({
                url:`/api/twitter/messages/${id}`
            }),
            providesTags:["Mess"],
            
        }),
        createMessage: build.mutation<IMessage,IMessage>({
            query:(message) => ({
                url:`/api/twitter/messages`,
                method:"POST",
                body: message
            }),
            invalidatesTags:["Mess"]
        }),
        deleteMessage: build.mutation<IMessage,IMessage>({
            query:(message) => ({
                url:`/api/twitter/messages${message._id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Mess"]
        }),
        updateMessage: build.mutation<IMessage,IMessage>({
            query:(message) => ({
                url:`/api/twitter/messages${message.id}`,
                method:"PUT",
                body: message
            }),
            invalidatesTags:["Mess"]
        })
    })
})

export default messageApi.reducer