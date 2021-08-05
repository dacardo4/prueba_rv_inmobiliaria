import { Component, OnInit } from '@angular/core';
import { InmobiliariaService } from 'src/app/services/crud/inmobiliaria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { PaisService } from 'src/app/services/crud/pais.service';
import { DepartamentoService } from 'src/app/services/crud/departamento.service';
import { CiudadService } from 'src/app/services/crud/ciudad.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit {

  secctionToShow: number = 0;
  pagePaises: number = 1;
  listPaises: Array<object> = [];
  listPaisesFiltrada: Array<object> = [];
  filtroBuscadorPais: string = '';
  paisToEdit = {};
  pageDpto: number = 1;
  listDpto: Array<object> = [];
  listDptoFiltrada: Array<object> = [];
  filtroBuscadorDpto: string = '';
  dptoToEdit = {};
  pageCiudad: number = 1;
  listCiudad: Array<object> = [];
  listCiudadFiltrada: Array<object> = [];
  filtroBuscadorCiudad: string = '';
  ciudadToEdit = {};

  constructor(
    private _ngxSpinnerService: NgxSpinnerService,
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _paisService: PaisService,
  ) {
    this.loadAllData();
  }

  ngOnInit(): void {
  }
  /***************************** Load Data *****************************/
  loadAllData(): void {
    this._ngxSpinnerService.show();
    forkJoin([
      this._ciudadService.getAllCiudadWithAllData().pipe(take(1)),
      this._departamentoService.getAllDepartamentoWithAllData().pipe(take(1)),
      this._paisService.getAllPais().pipe(take(1))
    ]).subscribe(
      data => {
        if (data[0]) {
          this.listCiudad = data[0];
          this.listCiudadFiltrada = data[0];
        }
        if (data[1]) {
          this.listDpto = data[1];
          this.listDptoFiltrada = data[1];
        }
        if (data[2]) {
          this.listPaises = data[2];
          this.listPaisesFiltrada = data[2];
        }
        this._ngxSpinnerService.hide();
      },
      err => {
        console.log('Error al traer todos los datos para view location',err);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** Filtro De Comercios *****************************/
  filtrarListas(from: string): void {
    switch (from) {
      case 'pais':
        if (this.filtroBuscadorPais == '') this.listPaisesFiltrada = this.listPaises;
        else this.listPaisesFiltrada = this.listPaises.filter(item => 
          item['codigo_pais'].toLowerCase().includes(this.filtroBuscadorPais.toLowerCase()) ||
          item['nombre_pais'].toLowerCase().includes(this.filtroBuscadorPais.toLowerCase())
        );
        break;
      case 'dpto':
        if (this.filtroBuscadorDpto == '') this.listDptoFiltrada = this.listDpto;
        else this.listDptoFiltrada = this.listDpto.filter(item => 
          item['codigo_depto'].toLowerCase().includes(this.filtroBuscadorDpto.toLowerCase()) ||
          item['nombre_depto'].toLowerCase().includes(this.filtroBuscadorDpto.toLowerCase()) ||
          item['miPaisEs']['nombre_pais'].toLowerCase().includes(this.filtroBuscadorDpto.toLowerCase())
        );
        break;
      case 'ciudad':
        if (this.filtroBuscadorCiudad == '') this.listCiudadFiltrada = this.listCiudad;
        else this.listCiudadFiltrada = this.listCiudad.filter(item => 
          item['codigo_inmueble'].toLowerCase().includes(this.filtroBuscadorCiudad.toLowerCase()) ||
          item['direccion'].toLowerCase().includes(this.filtroBuscadorCiudad.toLowerCase()) ||
          item['telefono'].toLowerCase().includes(this.filtroBuscadorCiudad.toLowerCase())
        );
        break;
    }
  }
  /***************************** Filtro De Comercios *****************************/
  goToEdit(from: string, item: object): void {
    switch (from) {
      case 'pais':
        this.secctionToShow = 1;
        this.paisToEdit = item;
        break;
      case 'dpto':
        this.secctionToShow = 2;
        this.dptoToEdit = item;
        break;
      case 'ciudad':
        this.secctionToShow = 3;
        this.ciudadToEdit = item;
        break;
    }
  }
  getAnswer(answer): void {
    this.secctionToShow = 0;
    this.loadAllData();
  }
}
