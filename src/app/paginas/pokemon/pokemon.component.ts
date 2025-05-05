import { Component, OnInit } from '@angular/core';
import { CardsComponent } from "./cards/cards.component";
import { Pokemon, Pokemons } from './interfaces/pokemon';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-pokemon',
  imports: [CardsComponent,PaginacionComponent,SearchComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
pokemons:Pokemons|undefined;
constructor(
  private _srvPokemon:PokemonService
){ }

ngOnInit(): void {
    this._srvPokemon.getPokemons().subscribe(
      (pokemonsAll)=>{
        
        pokemonsAll.results.forEach((pokemon)=>{
          this._srvPokemon.getpokemon(pokemon.name).subscribe((PokemonData)=>{
            pokemon.data=PokemonData;
            this._srvPokemon.nextURL=pokemonsAll.next;
            this._srvPokemon.previousURL=pokemonsAll.previous;
          });
        });
        this.pokemons=pokemonsAll;
        
      }
    );
  }

  setNewPokemon(pokemonsNews:Pokemons):void{
    this.pokemons=pokemonsNews;
  }
searchPokemon(termino:string):void{
  if(termino){
    this._srvPokemon.getpokemon(termino).subscribe((pokemon)=>{
      this.pokemons={
        count: 1,
        next: '',
        previous: null,
        results: [{
          name: pokemon.name,
          url: '',
          data:pokemon
        }]
      };
      this._srvPokemon.nextURL=null;  
      this._srvPokemon.previousURL=null;
      
      });
  }else{
    this.ngOnInit();
  }

 

}

}