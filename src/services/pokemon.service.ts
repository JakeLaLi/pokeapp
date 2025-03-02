import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private caughtPokemon: { id: number; name: string }[] = [
    { id: 1, name: 'Pikachu' },
    { id: 4, name: 'Charmander' }
  ];

  getPokemon() {
    return [...this.caughtPokemon]; // Return a copy of the array
  }

  addPokemon(pokemon: { id: number; name: string }) {
    this.caughtPokemon.push(pokemon);
  }

  updatePokemon(index: number, updatedPokemon: { id: number; name: string }) {
    this.caughtPokemon[index] = updatedPokemon;
  }

  deletePokemon(index: number) {
    this.caughtPokemon.splice(index, 1);
  }
}