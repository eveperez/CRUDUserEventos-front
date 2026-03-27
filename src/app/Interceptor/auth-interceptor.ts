import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    // Si hay credenciales las agrega al header de cada peticion
    if (username && password) {
        const credentials = btoa(`${username}:${password}`);
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Basic ${credentials}`)
        });
        return next(authRequest);
    }

    return next(req);
};