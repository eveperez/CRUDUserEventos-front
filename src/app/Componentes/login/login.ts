import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Servidor } from '../../Servidor/servidor';
import { AuthService } from '../../Servidor/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private service: Servidor,
    private authService: AuthService,
  ) {}

  login() {
    if (!this.username || !this.password) {
      Swal.fire('Error', 'Completa todos los campos', 'error');
      return;
    }

    this.authService.login(this.username, this.password);

    this.service.listarEventos().subscribe({
      next: () => {
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Login correcto',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['listar-eventos']);
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire('Error', 'Credenciales incorrectas', 'error');
        } else {
          Swal.fire('Error', 'Error del servidor', 'error');
        }
        this.authService.logout();
      }
    });
  }

  registro() {
    this.router.navigate(['registro']);
  }

}