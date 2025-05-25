import { Routes } from '@angular/router';

// Este archivo define las rutas de la aplicación Angular, 
// especificando los componente que se cargarán para concretas rutas. 
export const routes: Routes = [
  // Ruta para la página Pokémon, que se encontrará en el directorio de pokemon
  {
    path: 'pokemon',
    // Carga del componente de forma diferida
    loadComponent: () => import('./pokemon/pokemon.page').then(m => m.PokemonPage),
  },
  // Ruta por defecto que redirige a la página Pokémon
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
];


