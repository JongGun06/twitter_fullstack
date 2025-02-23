import { createSlice, PayloadAction } from "@reduxjs/toolkit"


let initialState = {
    messageInfo: "1"
}

export let messageSlice = createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
        messinfo(state,action: PayloadAction<string>){
            state.messageInfo = action.payload
        }
    }
})

export let {messinfo} = messageSlice.actions

export default messageSlice.reducer