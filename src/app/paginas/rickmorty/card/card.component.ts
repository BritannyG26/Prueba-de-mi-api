import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Personaje, Personajes } from '../interfaces/personajes';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'rickymorty-card',
  imports: [NgIf,NgFor,ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public personajesAll: Personajes|undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['personajesAll']){
      //this.allPersonajes=changes['allPersonajes'].currentValue
    }
  }

  openModal(personaje:Personaje):void{
    if(this.modal){
      this.modal.open(personaje);
    }
    
  }

}
