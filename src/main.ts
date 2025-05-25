import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

// Este es el punto de entrada de la aplicación Angular, donde se configura y arranca la aplicación.
bootstrapApplication(AppComponent, {
  providers: [
    // Proveer el componente raízz de la App
    provideHttpClient(),
    // Proveer la estrategia de reutilización de rutas de Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Proveer las rutas de la aplicación con pre-carga de módulos
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // Integración de Firebase de forma segura y compatible
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
});



