import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './paginas/home/home.component';
import { PokemonComponent } from './paginas/pokemon/pokemon.component';
import { DbzComponent } from './paginas/dbz/dbz.component';
import { CoctelesComponent } from './paginas/cocteles/cocteles.component';
import { ErrorComponent } from './paginas/error/error.component';
import { RickmortyComponent } from './paginas/rickmorty/rickmorty.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'pokemon', component:PokemonComponent},
    {path:'dbz', component:DbzComponent},
    {path:'cocteles', component:CoctelesComponent},
    {path:'rickymorty', component:RickmortyComponent},
    {path:'mi-api', loadChildren:()=> import('./paginas/mi-api/mi-api-routing.module').then(m=> m.MiApiRoutingModule)},
    {path:'**', component:ErrorComponent}
];
