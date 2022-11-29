import { RootState } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {
  id_usuario: 0,
  email: "",
  senha: "",
};

const UsuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    selecionarUsuario(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { selecionarUsuario, clear } = UsuarioSlice.actions;
export const selectUsuario = (state: RootState): User => state.usuario;
export default UsuarioSlice.reducer;
