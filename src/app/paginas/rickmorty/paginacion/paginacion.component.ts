import { Component, EventEmitter, Output } from '@angular/core';
import { RickmortyService } from '../services/rickmorty.service';
import { NgClass } from '@angular/common';
import { Personajes } from '../interfaces/personajes';

@Component({
  selector: 'rickymorty-paginacion',
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPersonajes=new EventEmitter<Personajes>
  constructor(
    private _srvPersonaje: RickmortyService
  ){ }

  get nextURL(): string|null{
    return this._srvPersonaje.nextURL;
  }
  get previousURL(): string|null{
    return this._srvPersonaje.previousURL;
  }

  loadPersonajes(url:string){
    this._srvPersonaje.getPersonajes(url).subscribe((personajesAll)=>{
      personajesAll.results.forEach((personaje)=>{
        this._srvPersonaje.getPersonaje(personaje.id).subscribe((personajeData)=>{
          personaje.data=personajeData;
          this._srvPersonaje.nextURL=personajesAll.info.next;
          this._srvPersonaje.previousURL=personajesAll.info.prev;
          this.eventNewPersonajes.emit(personajesAll);
        });
      });
    });
  }
}
