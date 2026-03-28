import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CambiarPasswordRequest } from '../../Entidad/cambiar-password-request';
import { Router } from '@angular/router';
import { AuthService } from '../../Servidor/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  imports: [FormsModule],
  templateUrl: './cambiar-password.html',
  styleUrl: './cambiar-password.css',
})
export class CambiarPassword {

  dto: CambiarPasswordRequest = {
    username: '',
    passwordActual: '',
    passwordNueva: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  cambiarPassword() {
    if (!this.dto.username || !this.dto.passwordActual || !this.dto.passwordNueva) {
      Swal.fire('Error', 'Completa todos los campos', 'error');
      return;
    }

    this.authService.cambiarPassword(this.dto).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Contraseña actualizada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        Swal.fire('Error', err.error.mensaje || 'No se pudo cambiar la contraseña', 'error');
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }
}
