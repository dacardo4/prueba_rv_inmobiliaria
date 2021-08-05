import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInmobiliariaComponent } from './components/general/crud-inmobiliaria/crud-inmobiliaria.component';
import { CrudLocationComponent } from './components/general/crud-location/crud-location.component';
import { HomeComponent } from './components/general/home/home.component';
import { ViewInmobiliariaComponent } from './components/general/view-inmobiliaria/view-inmobiliaria.component';
import { ViewLocationComponent } from './components/general/view-location/view-location.component';
import { Error404Component } from './components/shared/error404/error404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register/location', component: CrudLocationComponent },
  { path: 'register/inmueble', component: CrudInmobiliariaComponent },
  { path: 'view/locations', component: ViewLocationComponent },
  { path: 'view/inmuebles', component: ViewInmobiliariaComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
