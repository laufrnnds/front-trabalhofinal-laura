export interface UserId {
  id_usuario: number;
}

export interface UserEmailId extends UserId {
  email: string;
}

export interface User extends UserEmailId {
  senha: string;
}

export interface UserSend {
  email: string;
  senha: string;
}

export interface UserReceive extends User {
  data_criacao: Date;
}
