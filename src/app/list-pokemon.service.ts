import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListPokemonService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getPokemons() {
        return this.http.get('http://localhost:8000/pokemonlist');
    }

    //Uses http.get() to load data
    addPokemons(pokemonName: string) {
        this.http.post('http://localhost:8000/pokemonlist', { pokemonName})
            .subscribe((responseData) => {
                console.log(responseData);
            });
    }

    deletePokemon(pokemonId: string) {
        this.http.delete("http://localhost:8000/pokemonlist/" + pokemonId)
            .subscribe(() => {
                console.log('Deleted: ' + pokemonId);
                location.reload();
            });
            
    }

    updatePokemon(pokemonId: string,pokemonName: string) {
        this.http.put("http://localhost:8000/pokemonlist/" +
        pokemonId, { pokemonName })
        .subscribe(() => {
            console.log('Updated: ' + pokemonId);
        });
    }

    getPokemon(pokemonId: string) {
        return this.http.get('http://localhost:8000/pokemonlist/'+ pokemonId)
    }

    
}