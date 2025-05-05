import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje, Personajes } from '../interfaces/personajes';

@Injectable({
  providedIn: 'root'
})
export class RickmortyService {

  private apiURLBase:string='https://rickandmortyapi.com/api/character/';
  private next:string|null=null;
  private prev:string|null=null;
  constructor(
    private http:HttpClient
  ) { }

  getPersonajes(url: string=this.apiURLBase): Observable<Personajes>{
    return this.http.get<Personajes>(url);
  }
  getPersonaje(termino: string|number):Observable<Personaje>{
    return this.http.get<Personaje>(`${this.apiURLBase}${termino}`);
  }
  buscarPorNombre(nombre: string): Observable<Personajes> {
    return this.http.get<Personajes>(`${this.apiURLBase}?name=${nombre}`);
  }
  set nextURL(url:string|null){
    this.next=url;
  }
  set previousURL(url:string|null){
    this.prev=url;
  }

  get nextURL(): string|null{
    return this.next;
  }
  get previousURL(): string|null{
    return this.prev;
  }
}
