import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Recado } from "../Recados/types";

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id_recado,
});

export const { selectAll: selectAllArquiv, selectById } = adapter.getSelectors(
  (state: any) => state.arquivados
);

const ArquivadosSlice = createSlice({
  name: "arquivados",
  initialState: adapter.getInitialState(),
  reducers: {
    addOneArquiv: adapter.addOne,
    removeOneArquiv: adapter.removeOne,
  },
});

export const { addOneArquiv, removeOneArquiv } = ArquivadosSlice.actions;
export default ArquivadosSlice.reducer;
