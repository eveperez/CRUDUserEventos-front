import { Routes } from '@angular/router';
import { Login } from './Componentes/login/login';
import { Registro } from './Componentes/registro/registro';
import { CambiarPassword } from './Componentes/cambiar-password/cambiar-password';
import { ListarEventos } from './Componentes/eventos/listar-eventos/listar-eventos';
import { GuardarEvento } from './Componentes/eventos/guardar-evento/guardar-evento';
import { EditarEvento } from './Componentes/eventos/editar-evento/editar-evento';

export const routes: Routes = [
    {   
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: Login
    },
    { 
        path: 'registro', 
        component: Registro
    },
    { 
        path: 'cambiar-password', 
        component: CambiarPassword
    },
    { 
        path: 'listar-eventos', 
        component: ListarEventos
    },
    { 
        path: 'guardar-evento', 
        component: GuardarEvento
    },
    { 
        path: 'editar-evento', 
        component: EditarEvento
    }, 
];
