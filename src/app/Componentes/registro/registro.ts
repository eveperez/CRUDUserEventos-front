import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Servidor/auth.service';
import { UsuarioRequest } from '../../Entidad/usuario-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  usuario: UsuarioRequest = {
    username: '',
    password: '',
    rol: 'ROLE_USER'
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  registrar() {
    if (!this.usuario.username || !this.usuario.password) {
      Swal.fire('Error', 'Completa todos los campos', 'error');
      return;
    }

    this.authService.registrar(this.usuario).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Registrado!',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        Swal.fire('Error', err.error.mensaje || 'No se pudo registrar', 'error');
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }

}