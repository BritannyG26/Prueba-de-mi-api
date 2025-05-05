import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Personajes } from './interfaces/personajes';
import { RickmortyService } from './services/rickmorty.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.componet';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rickmorty',
  imports: [CardComponent,PaginacionComponent, SearchComponent],
  templateUrl: './rickmorty.component.html',
  styleUrl: './rickmorty.component.css'
})
export class RickmortyComponent implements OnInit{
  personajes: Personajes | undefined;

  constructor(
    private _srvPersonaje:RickmortyService
  ){ }

  ngOnInit(): void {
    this._srvPersonaje.getPersonajes().subscribe((personajesAll)=>{
      personajesAll.results.forEach((personaje)=>{
        this._srvPersonaje.getPersonaje(personaje.id).subscribe((personajeData)=>{
          personaje.data=personajeData;
          this._srvPersonaje.nextURL=personajesAll.info.next
          this._srvPersonaje.previousURL=personajesAll.info.prev
        });
      });
      this.personajes=personajesAll;
    });
  }
  setNewPersonajes(personajesNews:Personajes){
    this.personajes=personajesNews;
  }

  searchPersonaje(termino: string): void {
    if(termino){
      if (!isNaN(Number(termino))) {
      this._srvPersonaje.getPersonaje(termino).subscribe((personaje) => {
        this.personajes = {
          info: {
            count: 1,
            pages: 1,
            next: null,
            prev: null
          },
          results: [
            {
              id: personaje.id,
              name: personaje.name,
              data: personaje
            }
          ]
        };
      });
      this._srvPersonaje.nextURL=null
      this._srvPersonaje.previousURL=null
    } else {
      
      this._srvPersonaje.buscarPorNombre(termino).subscribe((respuesta) => {
        const detalleObservables = respuesta.results.map((p) =>
          this._srvPersonaje.getPersonaje(p.id)
        );
  
        forkJoin(detalleObservables).subscribe((detalles) => {
          respuesta.results.forEach((p, index) => {
            p.data = detalles[index];
          });
  
          this._srvPersonaje.nextURL = respuesta.info.next;
          this._srvPersonaje.previousURL = respuesta.info.prev;
  
          this.personajes = respuesta;
        });
      }, (error) => {
        this.personajes = {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null
          },
          results: []
        };
      });
      this._srvPersonaje.nextURL=null
      this._srvPersonaje.previousURL=null
    }
    }
    
  }
  
}
