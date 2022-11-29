import { RootState } from "../index";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { User, UserSend } from "./types";
import { buscarUsuarioApi, criarUsuarioApi } from "../../service/api";

export const buscarUsuarios = createAsyncThunk(
  "/usuario/buscarUsuarios",
  async () => {
    const response = await buscarUsuarioApi("/usuario/all");
    return response;
  }
);

export const criarUsuario = createAsyncThunk(
  "usuario/criarUsuario",
  async (dado: UserSend) => {
    const response = await criarUsuarioApi("/usuario", dado);
    return response;
  }
);

const adapter = createEntityAdapter<User>({
  selectId: (item) => item.id_usuario,
});

export const { selectAll: selectAllUser, selectById } = adapter.getSelectors(
  (state: RootState) => state.usuarios
);

const UsuariosSlice = createSlice({
  name: "usuarios",
  initialState: adapter.getInitialState({ loading: false, message: "" }),
  reducers: {
    addOne: adapter.addOne,
    updateOne: adapter.updateOne,
    removeOne: adapter.removeOne,
  },
  extraReducers(builder) {
    builder.addCase(buscarUsuarios.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarUsuarios.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarUsuario.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(criarUsuario.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id_usuario === 0) {
        state.message = "Não foi possivel criar o usuario";
        return state;
      }

      state.message = "Usuario salvo com sucesso!";
      adapter.addOne(state, action.payload);
    });
  },
});

export const { addOne, removeOne, updateOne } = UsuariosSlice.actions;
export default UsuariosSlice.reducer;
