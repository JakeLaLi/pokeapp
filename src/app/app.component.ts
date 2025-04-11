import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ListPokemonService } from './list-pokemon.service';
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { NavigationMenuComponent } from "./navigation-menu/navigation-menu.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    NavigationMenuComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ListPokemonService]
})
export class AppComponent {
  title = 'Pokédex';

}
