import { Routes } from '@angular/router';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DisplayPokemonComponent } from './display-pokemon/display-pokemon.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',  //default component to display
        component: DisplayPokemonComponent
    }, {
        path: 'addPokemon',  //when pokemon added 
        component: ListPokemonComponent
    }, {
        path: 'editPokemon/:_id',
        component: ListPokemonComponent
    }, {
        path: 'displayPokemon',  //when students listed
        component: DisplayPokemonComponent
    }, {
        path: '**',  //when path cannot be found, keep this at the bottom
        component: NotFoundComponent
    }
];
