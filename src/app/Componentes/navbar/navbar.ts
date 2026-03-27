import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Servidor/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }

  registro() {
    this.router.navigate(['registro']);
  }

  cambiarPassword() {
    this.router.navigate(['cambiar-password']);
  }

  listarEventos() {
    this.router.navigate(['listar-eventos']);
  }

  guardarEvento() {
    this.router.navigate(['guardar-evento']);
  }

}
