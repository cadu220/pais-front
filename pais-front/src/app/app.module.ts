import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Importando o HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/auth/home/home.module';
import { PaisesModule } from './pages/paises/paises.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    AuthModule,
    HomeModule,
    PaisesModule
  ],
  providers: [
    provideClientHydration(withEventReplay()) // Mantém seu código existente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
