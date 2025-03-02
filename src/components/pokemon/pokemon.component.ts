import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { PokemonService } from '../../services/pokemon.service'; // Ensure correct path

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add necessary modules
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonList: { id: number; name: string }[] = []; // Initialize as empty array
  newPokemonName: string = '';
  editingIndex: number | null = null;
  editPokemonName: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonList = this.pokemonService.getPokemon(); // Now initialized safely
  }

  addPokemon() {
    if (this.newPokemonName.trim()) {
      this.pokemonService.addPokemon({
        id: Math.floor(Math.random() * 1000),
        name: this.newPokemonName.trim(),
      });
      this.newPokemonName = '';
      this.refreshList();
    }
  }

  editPokemon(index: number) {
    this.editingIndex = index;
    this.editPokemonName = this.pokemonList[index].name;
  }

  updatePokemon() {
    if (this.editingIndex !== null) {
      this.pokemonService.updatePokemon(this.editingIndex, {
        id: this.pokemonList[this.editingIndex].id,
        name: this.editPokemonName,
      });
      this.editingIndex = null;
      this.editPokemonName = '';
      this.refreshList();
    }
  }

  deletePokemon(index: number) {
    this.pokemonService.deletePokemon(index);
    this.refreshList();
  }

  refreshList() {
    this.pokemonList = this.pokemonService.getPokemon();
  }
}