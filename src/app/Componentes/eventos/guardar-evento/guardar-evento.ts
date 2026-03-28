import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Servidor } from '../../../Servidor/servidor';
import { EventoRequest } from '../../../Entidad/evento-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-evento',
  imports: [FormsModule],
  templateUrl: './guardar-evento.html',
  styleUrl: './guardar-evento.css',
})
export class GuardarEvento {

  evento: EventoRequest = {
    nombre: '',
    lugar: '',
    fecha: '',
    precio: 0,
    capacidad: 0
  };

  constructor(
    private router: Router,
    private service: Servidor
  ) {}

  guardar() {
    this.service.guardarEvento(this.evento).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Guardado!',
          text: 'El evento se guardó con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['listar-eventos']);
      },
      error: (err) => {
        if (err.status === 403) {
          Swal.fire('Sin permiso', 'No tienes permiso para guardar eventos', 'warning');
        } else if (err.status === 400) {
          Swal.fire('Error', err.error.mensaje || 'Datos inválidos', 'error');
        } else {
          Swal.fire('Error', 'No se pudo guardar el evento', 'error');
        }
      }
    });
  }

  cancelar() {
    Swal.fire({
      title: 'Cancelado',
      text: 'Se ha cancelado el registro',
      icon: 'warning',
    });
    this.router.navigate(['listar-eventos']);
  }

}