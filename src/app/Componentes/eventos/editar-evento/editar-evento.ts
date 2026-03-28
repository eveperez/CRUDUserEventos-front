import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Servidor } from '../../../Servidor/servidor';
import { EventoRequest } from '../../../Entidad/evento-request';
import { EventoResponse } from '../../../Entidad/evento-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evento',
  imports: [FormsModule],
  templateUrl: './editar-evento.html',
  styleUrl: './editar-evento.css',
})
export class EditarEvento implements OnInit {

  eventoId: number = 0;
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

  ngOnInit(): void {
    const eventoGuardado = localStorage.getItem('evento_key');
    if (eventoGuardado) {
      const eventoResponse: EventoResponse = JSON.parse(eventoGuardado);
      this.eventoId = eventoResponse.id;
      this.evento = {
        nombre: eventoResponse.nombre,
        lugar: eventoResponse.lugar,
        fecha: eventoResponse.fecha,
        precio: eventoResponse.precio,
        capacidad: eventoResponse.capacidad
      };
    }
  }

  editar() {
    this.service.editarEvento(this.eventoId, this.evento).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Editado!',
          text: 'El evento se editó con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['listar-eventos']);
      },
      error: (err) => {
        if (err.status === 403) {
          Swal.fire('Sin permiso', 'No tienes permiso para editar eventos', 'warning');
        } else if (err.status === 400) {
          Swal.fire('Error', err.error.mensaje || 'Datos inválidos', 'error');
        } else {
          Swal.fire('Error', 'No se pudo editar el evento', 'error');
        }
      }
    });
  }

  cancelar() {
    Swal.fire({
      title: 'Cancelado',
      text: 'Se ha cancelado la edición',
      icon: 'warning',
    });
    this.router.navigate(['listar-eventos']);
  }

}