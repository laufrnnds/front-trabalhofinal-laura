import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Recado, RecadoAtualizado } from "./types";

const initialState: RecadoAtualizado = {
  id_recado: 0,
  descricao: "",
  detalhamento: "",
  status: "cancelado",
  user: { id_usuario: 0 },
  data_criacao: new Date(),
  data_atualizacao: new Date(),
};

const recadoSlice = createSlice({
  name: "recado",
  initialState,
  reducers: {
    selecionarRecado(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { selecionarRecado, clear } = recadoSlice.actions;
export const selectRecado = (state: RootState): Recado => state.recado;
export default recadoSlice.reducer;
