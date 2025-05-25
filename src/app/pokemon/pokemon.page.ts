import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
// Importar los componentes de Ionic que se van a usar en la página
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonImg
} from '@ionic/angular/standalone';
// Importar el decorador Component de Angular para definir el componente
@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonInput,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonImg
  ],
})
// Componente de la página Pokémon
export class PokemonPage implements OnInit {
  // Propiedades del componente
  name: string = '';
  opinion: string = '';
  pokemon: any = null;
  showModal = false;
  pokemonList: any[] = [];
  // Inyectar HttpClient y Firebase Firestore en el constructor
  constructor(private http: HttpClient, private firestore: Firestore) {}
  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.cargarListaPokemons();
  }
  // Método para cargar una lista de pokémon desde la API
  cargarListaPokemons() {
    interface PokeApiResponse {
      name: string;
      sprites: { front_default: string };
    }
    // Se crea un arreglo de IDs de Pokemon para obtener informacion de varios pokémons
    const ids = Array.from({ length: 15 }, (_, i) => i + 1);
    ids.forEach(id => {
      this.http.get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(poke => {
        this.pokemonList.push({
          name: poke.name,
          image: poke.sprites.front_default
        });
      });
    });
  }
  // Método para biscar un Pokémon por nombre
  buscarPokemon() {
    if (!this.name) return;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`)
      .subscribe(poke => {
        this.pokemon = poke;
        this.showModal = true;
      }, err => {
        alert('Pokémon no encontrado');
      });
  }
  // Método para mostrar los detalles de un Pókemon en un modal
  mostrarDetalles(p: any) {
    this.pokemon = p;
    this.showModal = true;
  }
  // Método para cerrar el modal
  async guardarPokemon() {
    const data = {
      name: this.pokemon.name,
      image: this.pokemon.sprites.front_default,
      height: this.pokemon.height,
      weight: this.pokemon.weight,
      opinion: this.opinion
    };
    // Se guarda la reseña del pokémon en Firestore
    await addDoc(collection(this.firestore, 'reseñas'), data);
    alert('¡Pokémon guardado!');
    this.showModal = false;
    this.opinion = '';
  }
}


