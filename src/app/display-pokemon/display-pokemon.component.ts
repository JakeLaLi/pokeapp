import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ListPokemonService } from '../list-pokemon.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-display-pokemon',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './display-pokemon.component.html',
  styleUrl: './display-pokemon.component.css',
  providers: [ListPokemonService]
})
export class DisplayPokemonComponent implements OnInit {
  //declare variable to hold response and make it public
  // to be accessible from components.html 
  public pokemons: any;
  //initalize the call using ListPokemonService
  constructor(private _myService: ListPokemonService) { }
  ngOnInit() {
    this.getPokemons();
  }
  //method called OnInit
  getPokemons() {
    this._myService.getPokemons().subscribe({
      //read data and assign to public variable pokemons
      next: (data => { this.pokemons = data }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  onDelete(pokemonId: string) {
    this._myService.deletePokemon(pokemonId);
  }
}
