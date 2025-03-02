import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from '../components/pokemon/pokemon.component'; // Import your PokemonComponent

@Component({
  selector: 'app-root',
  standalone: true, // Ensure it's marked as standalone
  imports: [RouterOutlet, PokemonComponent], // Add PokemonComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix `styleUrl` -> should be `styleUrls`
})
export class AppComponent {
  title = 'pokeapp';
}