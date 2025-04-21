export interface UsuarioAutenticado {
  login: string;
  nome: string;
  administrador: boolean;
  autenticado: boolean;
  token: string;
}
