import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Personaje, Personajes } from '../interfaces/personajes';

@Component({
  selector: 'rickymorty-card',
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  @Input() public personajesAll: Personajes | undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent;

  // ✅ Estado de carga por imagen
  public imagenesCargadas: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personajesAll']) {
      // Reiniciamos el array de carga si llegan nuevos personajes
      const total = this.personajesAll?.results?.length || 0;
      this.imagenesCargadas = new Array(total).fill(false);
    }
  }

  // ✅ Se llama desde el (load) de cada imagen
  imagenCargada(index: number): void {
    this.imagenesCargadas[index] = true;
  }

  openModal(personaje: Personaje): void {
    if (this.modal) {
      this.modal.open(personaje);
    }
  }
}
