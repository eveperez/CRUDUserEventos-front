import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoResponse } from '../Entidad/evento-response';
import { Observable } from 'rxjs';
import { EventoRequest } from '../Entidad/evento-request';

@Injectable({
  providedIn: 'root',
})
export class Servidor {
  
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8014/eventos';

  listarEventos(): Observable<EventoResponse[]> {
    return this.http.get<EventoResponse[]>(this.url);
  }

  guardarEvento(evento: EventoRequest): Observable<EventoResponse> {
    return this.http.post<EventoResponse>(this.url, evento);
  }

  buscarEvento(id: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(this.url + '/' + id);
  }

  editarEvento(id: number, evento: EventoRequest): Observable<EventoResponse> {
    return this.http.put<EventoResponse>(this.url + '/' + id, evento);
  }

  eliminarEvento(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
