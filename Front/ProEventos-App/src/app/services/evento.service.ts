import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Eventos } from '../models/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'https://localhost:5001/api/evento';
  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(this.baseURL).pipe(take(1));
  }

  public getEventosByTema(tema: string): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(`${this.baseURL}/${tema}/tema`).pipe(take(1));
  }

  public getEventoById(id: number): Observable<Eventos> {
    return this.http.get<Eventos>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public post(evento: Eventos): Observable<Eventos> {
    return this.http.post<Eventos>(this.baseURL, evento).pipe(take(1));
  }

  public put(evento: Eventos): Observable<Eventos> {
    return this.http.put<Eventos>(`${this.baseURL}/${evento.id}`, evento).pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
