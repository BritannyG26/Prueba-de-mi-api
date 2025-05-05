import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Personaje } from '../interfaces/personajes';

@Component({
  selector: 'rickymorty-modal',
  standalone:true,
  imports: [TitleCasePipe],
  templateUrl: './modal.component.html',
  styles: [`
    `]
})
export class ModalComponent {
  @Input() public personaje:Personaje={
    id:0,
    name:'',
    type:'',
    image:'',
    location:{
      name:''
    },
    origin:{
      name:''
    }
  }as Personaje
  
  private bootstrapModal:any
  @ViewChild('modalElement') public modalElement!: ElementRef
  constructor(@Inject(PLATFORM_ID)private platformId:Object){}

  ngAfterView():void{
    if(isPlatformBrowser(this.platformId)){
      this.initializeModal();
    }
  }

  initializeModal():void{
    import('bootstrap').then((bootstrap)=>{
      this.bootstrapModal= new bootstrap.Modal(this.modalElement.nativeElement)
    })
  }

  open(personaje:Personaje):void{
    this.personaje=personaje
    if(isPlatformBrowser(this.platformId)){
      if(this.bootstrapModal){
        this.bootstrapModal.show();
      }else{
        this.initializeModal();
        setTimeout(()=>{
          this.bootstrapModal.show()
        }, 0)
      }
    }

  }

  close():void{
    this.bootstrapModal.hide();
  }

}
