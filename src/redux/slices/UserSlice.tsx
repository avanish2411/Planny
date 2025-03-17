import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface IUser{
    name:String;
    email:String;
    password:String;
    isAuthenticated: boolean;
}

interface IUserState{
    user: IUser | null;
}

const initialState:IUserState = {
    user: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser:(state,action:PayloadAction<IUser>)=>{
            state.user = action.payload;
        },
        clearUser:(state)=>{
            state.user = null;
        }
    }
})

export const {setUser,clearUser} = UserSlice.actions;
export default UserSlice.reducer;