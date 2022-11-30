import axios from "axios";
import {
  Recado,
  RecadoAtualizado,
  RecadoRequest,
} from "../store/Recados/types";
import { UserReceive, UserSend } from "../store/Usuarios/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

async function buscarRecadosApi(url: string) {
  const response = await api.get(url);
  return response.data;
}

async function criarRecadoApi(
  url: string,
  data: RecadoRequest
): Promise<RecadoAtualizado> {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      id_recado: 0,
      detalhamento: "",
      descricao: "",
      status: "concluido",
      user: { id_usuario: 0 },
      data_criacao: new Date(),
      data_atualizacao: new Date(),
    };
  }
}

async function buscarRecadoIdApi(url: string): Promise<string> {
  try {
    const response = await api.get(`${url}`);

    return response.data;
  } catch (err) {
    return "não foi possivel encontrar";
  }
}

async function excluirRecadoApi(url: string): Promise<string> {
  try {
    const response = await api.delete(`/recado/${url}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return "não foi possivel excluir";
  }
}

async function atualizarRecadoApi(
  url: string,
  data: RecadoRequest
): Promise<Recado> {
  try {
    const dataRequest: RecadoRequest = {
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      status: data.status,
      user: { id_usuario: data.user.id_usuario },
    };
    const response = await api.put(`${url}`, dataRequest);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      id_recado: 0,
      detalhamento: "",
      descricao: "",
      status: "concluido",
      user: { id_usuario: 0 },
    };
  }
}

async function filtrarRecadosApi(
  url: string,
  params: { busca: string; operacao: string }
): Promise<RecadoAtualizado[]> {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (err) {
    return [];
  }
}

async function buscarUsuarioApi(url: string) {
  const response = await api.get(url);
  return response.data;
}

async function criarUsuarioApi(
  url: string,
  data: UserSend
): Promise<UserReceive> {
  try {
    const response = await api.post(url, data);
    window.localStorage.setItem("idUser", `${response.data.id_usuario}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      id_usuario: 0,
      email: "",
      senha: "",
      data_criacao: new Date(),
    };
  }
}

export {
  buscarRecadosApi,
  criarRecadoApi,
  excluirRecadoApi,
  atualizarRecadoApi,
  filtrarRecadosApi,
  buscarRecadoIdApi,
  buscarUsuarioApi,
  criarUsuarioApi,
};
