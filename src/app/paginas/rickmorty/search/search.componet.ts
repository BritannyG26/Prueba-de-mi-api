import { Component, EventEmitter, Output,  } from "@angular/core";



@Component({
    selector: 'rickymorty-search',
    standalone:true,
    imports:[],
    template: `
    <div class="col-12">
    <div class="input-group mb-3">
        <input 
        #txtSearch
        type="text" class="form-control" placeholder="Escriba el nombre del personaje" aria-label="Escriba el nombre del personaje" 
        (keydown.enter)="searchPersonaje(txtSearch.value)"
        aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" 
        (click)="searchPersonaje(txtSearch.value)"
        type="button" id="button-addon2"><i class="bi bi-search"></i></button>
    </div>
    </div>
    `,
    styles:[`
        `]
})

export class SearchComponent{
    @Output() public eventSearch= new EventEmitter<string>();
    searchPersonaje(termino:string|number):void{
        const termSearch= termino.toString().trim()
        //if(termSearch.length===0){
           // return
        //}
        this.eventSearch.emit(termSearch);
    }
}