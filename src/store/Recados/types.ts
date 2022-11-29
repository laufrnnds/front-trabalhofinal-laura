import { UserId } from "../Usuarios/types";

export interface Recado extends RecadoRequest {
  id_recado: number;
}

export interface RecadoRequest {
  descricao: string;
  detalhamento: string;
  status: string;
  user: UserId;
}

export interface RecadoCriado extends Recado {
  data_criacao: Date;
}

export interface RecadoAtualizado extends RecadoCriado {
  data_atualizacao: Date;
}
