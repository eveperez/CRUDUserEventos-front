import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoResponse } from '../../../Entidad/evento-response';
import { Router } from '@angular/router';
import { Servidor } from '../../../Servidor/servidor';
import { AuthService } from '../../../Servidor/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-eventos',
  imports: [FormsModule, CommonModule],
  templateUrl: './listar-eventos.html',
  styleUrl: './listar-eventos.css',
})
export class ListarEventos implements OnInit{

  eventos : EventoResponse[] = [];
  idBusqueda: number | null = null;

  constructor(
    private router: Router,
    private service: Servidor,
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Opps..',
          text: 'No se pudieron cargar los eventos',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }

  editar(evento: EventoResponse) {
    Swal.fire({
      title: 'Datos cargados',
      text: 'Los datos del evento se han cargado correctamente',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      localStorage.setItem('evento_key', JSON.stringify(evento));
      this.router.navigate(['editar-evento']);
    });
  }

  buscar(id: number) {
    if (!id || id <= 0) {
      this.listar();
      return;
    }

    this.service.buscarEvento(id).subscribe({
      next: (evento) => {
        this.eventos = [evento];
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire('No encontrado', 'El evento con ese ID no existe', 'info');
        } else if (err.status === 401) {
          Swal.fire('No autenticado', 'Debes iniciar sesión', 'warning');
        } else if (err.status === 403) {
          Swal.fire('Sin permiso', 'No tienes acceso a esta operación', 'error');
        } else {
          Swal.fire('Error', 'Error al buscar el evento', 'error');
        }
      }
    });
  }

  guardarEvento() {
    this.router.navigate(['guardar-evento']);
  }


  eliminar(evento: EventoResponse) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta eliminacion',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2e8741',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarEvento(evento.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado!',
              text: 'El evento ha sido eliminado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.listar();
          },
          error: (err) => {
            if (err.status === 403) {
              Swal.fire('Sin permiso', 'No tienes permiso para eliminar eventos', 'warning');
            } else {
              Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
            }
          }
        });
      }
    });
  }
}
