import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudLocationComponent } from './components/general/crud-location/crud-location.component';
import { CrudInmobiliariaComponent } from './components/general/crud-inmobiliaria/crud-inmobiliaria.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { ViewLocationComponent } from './components/general/view-location/view-location.component';
import { ViewInmobiliariaComponent } from './components/general/view-inmobiliaria/view-inmobiliaria.component';
import { HomeComponent } from './components/general/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalSaveOkComponent } from './components/shared/modal-save-ok/modal-save-ok.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateInmuebleComponent } from './components/general/update-inmueble/update-inmueble.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdatePaisComponent } from './components/general/update-pais/update-pais.component';
import { UpdateDepartamentoComponent } from './components/general/update-departamento/update-departamento.component';
import { UpdateCiudadComponent } from './components/general/update-ciudad/update-ciudad.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CrudLocationComponent,
    CrudInmobiliariaComponent,
    Error404Component,
    ViewLocationComponent,
    ViewInmobiliariaComponent,
    HomeComponent,
    ModalSaveOkComponent,
    UpdateInmuebleComponent,
    UpdatePaisComponent,
    UpdateDepartamentoComponent,
    UpdateCiudadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
