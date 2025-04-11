import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ListPokemonService } from '../list-pokemon.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-pokemon',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css'
})
export class ListPokemonComponent {
  public mode = 'Add'; //default mode
  private id: any; //student ID
  private pokemon: any
  
  //initalize the call using ListPokemonService
  constructor(private _myService: ListPokemonService, private router:Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id')) { 
        this.mode = 'Edit'; /*request had a parameter _id */ 
        this.id = paramMap.get('_id');
        
        //request pokemon info based on the id
        this._myService.getPokemon(this.id).subscribe({
          next: (data => {
            //read data and assign to private variable pokemon
            this.pokemon = data;
            //populate the pokemonName on the page
            this.pokemonForm.patchValue({
              pokemonName: this.pokemon.pokemonName
            })
          }),
        
          error: (err => console.error(err)),
          complete: (() => console.log('finished loading'))
        
        });
      }
      else {
        this.mode = 'Add';
        this.id = null; 
      }
    });
  }
  
  pokemonForm = new FormGroup({
    pokemonName: new FormControl('')
  });

  onSubmit() {
    let pokemonName = this.pokemonForm.get('pokemonName')?.value ?? "";
    console.log("you submitted: " + pokemonName);
    
    if (this.mode == 'Add')
      this._myService.addPokemons(pokemonName);
    if (this.mode == 'Edit')
      this._myService.updatePokemon(this.id, pokemonName);

    this.router.navigate(['/displayPokemon']);
  } 

}
