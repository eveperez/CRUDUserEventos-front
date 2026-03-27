export interface UsuarioResponse {
    id: number;
    username: string;
    rol: 'ROLE_ADMIN' | 'ROLE_USER';
}