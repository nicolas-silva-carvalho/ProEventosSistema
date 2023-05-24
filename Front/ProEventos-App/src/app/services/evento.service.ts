import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from '../models/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'https://localhost:5001/api/evento';
  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(this.baseURL);
  }

  public getEventosByTema(tema: string): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(`${this.baseURL}/${tema}/tema`);
  }

  public getEventoById(id: number): Observable<Eventos> {
    return this.http.get<Eventos>(`${this.baseURL}/${id}`);
  }
}
