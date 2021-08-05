import { Component, OnInit } from '@angular/core';
import { InmobiliariaService } from 'src/app/services/crud/inmobiliaria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-inmobiliaria',
  templateUrl: './view-inmobiliaria.component.html',
  styleUrls: ['./view-inmobiliaria.component.scss']
})
export class ViewInmobiliariaComponent implements OnInit {

  page: number = 1;
  secctionToShow: number = 0;
  listInmuebles: Array<object> = [];
  listInmueblesFiltrada: Array<object> = [];
  filtroBuscador: string = '';
  inmuebleToEdit = {};

  constructor(
    private _inmobiliariaService: InmobiliariaService,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.loadAllData();
  }

  ngOnInit(): void {
  }
  /***************************** Load Data *****************************/
  loadAllData(): void {
    this._ngxSpinnerService.show();
    forkJoin([
      this._inmobiliariaService.getAllInmuebleWithAllData().pipe(take(1))
    ]).subscribe(
      data => {
        if (data[0]) {
          this.listInmuebles = data[0].map(function(element) {
            return {
              id: element.id_inmueble,
              codigo_inmueble: element.codigo_inmueble,
              direccion: `${element.direccion}, ${element.miCiudadEs.nombre_ciudad}, ${element['miCiudadEs']['seEncuentraEn']['nombre_depto']}, ${element['miCiudadEs']['seEncuentraEn']['miPaisEs']['nombre_pais']}.`,
              telefono: element.telefono
            };
          });
          this.listInmueblesFiltrada = this.listInmuebles;
        }
        this._ngxSpinnerService.hide();
      },
      err => {
        console.log('Error al traer todos los datos para crud inmueble',err);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** Filtro De Comercios *****************************/
  filtrarListaInmuebles(): void {
    if (this.filtroBuscador == '') this.listInmueblesFiltrada = this.listInmuebles;
    else this.listInmueblesFiltrada = this.listInmuebles.filter(item => 
      item['codigo_inmueble'].toLowerCase().includes(this.filtroBuscador.toLowerCase()) ||
      item['direccion'].toLowerCase().includes(this.filtroBuscador.toLowerCase()) ||
      item['telefono'].toLowerCase().includes(this.filtroBuscador.toLowerCase())
    );
  }
  /***************************** Filtro De Comercios *****************************/
  goToEdit(item): void {
    this.secctionToShow = 1;
    this.inmuebleToEdit = item;
  }
  getAnswer(answer): void {
    this.secctionToShow = 0;
    this.loadAllData();
  }
}
