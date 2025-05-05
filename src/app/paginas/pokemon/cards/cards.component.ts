import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon, Pokemons } from '../interfaces/pokemon';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'pokemon-cards',
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnChanges{
 @Input() public pokemonsAll:Pokemons | undefined;
 @ViewChild(ModalComponent) public modal!: ModalComponent
 CargaImagen:boolean=false;
 
 ngOnChanges(changes: SimpleChanges): void {
   if(changes['pokemonsAll']){
    this.CargaImagen=false;
   }
 }

 openModal(pokemon:Pokemon):void{
  if(this.modal){
    this.modal.open(pokemon);
  }
  
 }
}
