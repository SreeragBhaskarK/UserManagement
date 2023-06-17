import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList: {},
    isLoggedIn:false,
    adminIsLoggedIn:false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: (state, action) => {
            state.userList=action.payload
        },
        userImage:(state,action)=>{
            state.userList.image=action.payload
        },
        isLoggedIn:(state,action)=>{
            state.isLoggedIn=action.payload
        },
        adminIsLoggedIn:(state,action)=>{
            state.adminIsLoggedIn=action.payload
        }
    }


})

export const {userAdd,userImage,isLoggedIn,adminIsLoggedIn}=userSlice.actions
export default userSlice.reducer

