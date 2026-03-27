export interface UsuarioRequest {
    username: string;
    password: string;
    rol: 'ROLE_ADMIN' | 'ROLE_USER';
}