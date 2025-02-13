import { IAuthInitailState, ILoginResponse } from "@/interfaces"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IAuthInitailState = {
  token: null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null,
}

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ILoginResponse>) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },

    logOut: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem("user")
    },
  },
})

export const { setToken, logOut } = authSlice.actions
export default authSlice.reducer

export const selectToken = createSelector(
  (state: { auth: ILoginResponse }) => state.auth.token,
  (token) => (token ? token : null)
)

export const selectUser = createSelector(
  (state: { auth: ILoginResponse }) => state.auth.user,
  (user) => (user ? user : null)
)
