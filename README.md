

````markdown
# 📱 Pokédex Legendaria - Aplicación Móvil con Ionic + Firebase

¡Bienvenido a **Pokédex Legendaria**!  
Una aplicación móvil desarrollada en **Ionic + Angular**, que permite buscar Pokémon por nombre a través de la [API oficial de PokéAPI](https://pokeapi.co), visualizar sus detalles y guardar tus opiniones en **Firebase**.  

---

## 🚀 Funcionalidades principales

- 🔎 Búsqueda de Pokémon por nombre.
- 🧬 Visualización de datos clave: altura, peso, tipos, habilidades.
- 🖼️ Imágenes oficiales integradas desde la PokéAPI.
- 💬 Agrega tu opinión personal y guárdala en **Firestore**.
- 📲 Despliegue directo a dispositivo Android o emulador.

---

## 🔧 Tecnologías utilizadas

- **Ionic Framework**
- **Angular**
- **Firebase (Firestore)**
- **PokéAPI**
- **Android Studio / Emulador AVD**

---

## 👨‍💻 Integrantes del Proyecto

| Nombre | 
|--------|
| Francis Aconda | 
| Marco Tapia | 


---

## 🗂️ Estructura de Archivos Relevantes

### `main.ts` - Configuración principal

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
});
````

---

### `pokemon.page.ts` - Lógica de búsqueda y guardado

```ts
buscarPokemon() {
  this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`)
    .subscribe(poke => {
      this.pokemon = poke;
      this.showModal = true;
    }, err => {
      alert('Pokémon no encontrado');
    });
}

async guardarPokemon() {
  const data = {
    name: this.pokemon.name,
    image: this.pokemon.sprites.front_default,
    height: this.pokemon.height,
    weight: this.pokemon.weight,
    opinion: this.opinion
  };
  await addDoc(collection(this.firestore, 'reseñas'), data);
  alert('¡Pokémon guardado!');
  this.showModal = false;
  this.opinion = '';
}
```

---

### `pokemon.page.html` - Interfaz de usuario

```html
<ion-input [(ngModel)]="name" placeholder="Buscar Pokémon"></ion-input>
<ion-button (click)="buscarPokemon()">Buscar</ion-button>

<ion-card *ngFor="let p of pokemonList" (click)="mostrarDetalles(p)">
  <img [src]="p.image" />
  <ion-card-title>{{ p.name | titlecase }}</ion-card-title>
</ion-card>

<ion-modal [isOpen]="showModal">
  <ion-content>
    <h2>{{ pokemon.name | titlecase }}</h2>
    <img [src]="pokemon.sprites.front_default" />
    <ion-input [(ngModel)]="opinion" placeholder="¿Qué opinas?"></ion-input>
    <ion-button (click)="guardarPokemon()">Guardar Reseña</ion-button>
  </ion-content>
</ion-modal>
```

---

### `app.routes.ts` - Navegación

```ts
export const routes: Routes = [
  {
    path: 'pokemon',
    loadComponent: () => import('./pokemon/pokemon.page').then(m => m.PokemonPage),
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
];
```

---

## 📦 Instrucciones para correr la app

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/pokedex-legendaria.git
   cd pokedex-legendaria
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Agrega tu configuración de Firebase en `environment.ts`:

   ```ts
   export const environment = {
     firebaseConfig: {
       apiKey: "YOUR_KEY",
       authDomain: "YOUR_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       ...
     }
   };
   ```

4. Levanta el servidor de desarrollo:

   ```bash
   ionic serve
   ```

5. Para Android:

   ```bash
   ionic capacitor add android
   ionic capacitor run android
   ```

---

## ☁️ Firebase Firestore

Se guarda cada reseña con esta estructura:

```json
{
  "name": "bulbasaur",
  "image": "https://...",
  "height": 7,
  "weight": 69,
  "opinion": "¡Un clásico de los clásicos!"
}
```

---

## 📷 Capturas de pantalla 

> Pagina Inicio
![Imagen de WhatsApp 2025-05-25 a las 15 15 07_ee2ddd30](https://github.com/user-attachments/assets/7f2cae32-1eb4-454f-9bdf-436fef2937b1)
> Barra Busqueda - Nombre Pokemon
![Imagen de WhatsApp 2025-05-25 a las 15 15 07_d453acfa](https://github.com/user-attachments/assets/42e1a05f-3537-46e3-b6de-aa4ec989edb0)
> Caracteristicas Pokemon
![Imagen de WhatsApp 2025-05-25 a las 15 15 07_4cc764e0](https://github.com/user-attachments/assets/5d619fcd-7b0d-46aa-9021-26acf453b76c)
> Reseña
![Imagen de WhatsApp 2025-05-25 a las 15 15 08_d690f106](https://github.com/user-attachments/assets/510dec35-6644-4a3e-96d9-b4f42884712c)
> Guardado de reseña
![Imagen de WhatsApp 2025-05-25 a las 15 15 08_0f3d467d](https://github.com/user-attachments/assets/8dded566-648b-48a0-9b90-68a4329d283c)




---

## ✅ Estado del Proyecto

* [x] Búsqueda funcional
* [x] Visualización de datos
* [x] Opiniones almacenadas en Firebase
* [x] Diseño responsive


---

## 🧠 Créditos

* PokéAPI – [https://pokeapi.co/](https://pokeapi.co/)
* Firebase – [https://firebase.google.com/](https://firebase.google.com/)
* Ionic Framework – [https://ionicframework.com/](https://ionicframework.com/)

---




