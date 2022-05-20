import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { appInitializer } from './app.initializer';
import { authInterceptorProvider } from './auth/auth.interceptor';
import { environment } from '../environments/environment';

// https://angular.io/guide/roadmap

// "Application Root Module" (= Einstiegsmodul):
// Der Name "AppModule" ist per Konvention bzw. ng-cli festgelegt
// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet
// https://angular.io/guide/ngmodulesl
// https://angular.io/guide/ngmodule-faq
// https://angular.io/api/core/NgModule
// https://blog.angular-university.io/angular2-ngmodule
// https://itnext.io/understanding-angular-modules-5f1215130bc8
@NgModule({
    // Von den importierten Modulen sind alle exportierten Komponenten nutzbar
    // Ein Modul muss die Module importieren, von denen es Funktionalitaet nutzt
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),

        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HomeModule,
        HttpClientModule,
        LayoutModule,
        SharedModule,
        // NICHT FahrradModule wegen Lazy Loading
    ],

    // Eigene Komponenten des Moduls oder Direktiven oder Pipes
    // Jede nutzbare Komponente muss in genau 1 Modul deklariert sein
    declarations: [
        // Eigentliche Komponente
        AppComponent,
    ],

    // Services mit @Injectable()
    providers: [
        {
            // Aufruf waehrend der Initialisierung
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
        },
        authInterceptorProvider,
    ],

    // Nur das Rootmodul hat die Property "bootstrap", um die
    // Einstiegskomponente zu deklarieren
    // https://angular.io/guide/entry-components
    // https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429
    bootstrap: [AppComponent],
})
export class AppModule {}
