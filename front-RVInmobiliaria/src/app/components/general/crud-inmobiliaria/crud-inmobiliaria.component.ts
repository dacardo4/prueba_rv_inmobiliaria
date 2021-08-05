import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { CiudadService } from 'src/app/services/crud/ciudad.service';
import { DepartamentoService } from 'src/app/services/crud/departamento.service';
import { InmobiliariaService } from 'src/app/services/crud/inmobiliaria.service';
import { PaisService } from 'src/app/services/crud/pais.service';
import { MyValidations } from 'src/app/utils/myValidations';

@Component({
  selector: 'app-crud-inmobiliaria',
  templateUrl: './crud-inmobiliaria.component.html',
  styleUrls: ['./crud-inmobiliaria.component.scss']
})
export class CrudInmobiliariaComponent implements OnInit {

  saveOk = false;
  listPais = [];
  listDptos = [];
  listDptosFiltered = [];
  listCiudad = [];
  listCiudadFiltered = [];
  inmuebleForm: FormGroup;

  constructor(
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _paisService: PaisService,
    private _inmobiliariaService: InmobiliariaService,
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.initForms();
    this.loadAllData();
  }

  ngOnInit(): void {
  }
  /***************************** Init Data *****************************/
  initForms(): void {
    this.inmuebleForm = this._formBuilder.group({
      codigo_inmueble: ['',[Validators.required, Validators.maxLength(10)]],
      direccion: ['',[Validators.required, Validators.maxLength(50)]],
      telefono: ['',[Validators.required, Validators.max(9999999999), Validators.min(1000000)]],
      paisProv: ['Seleccione',MyValidations.isSelectSelected],
      dptoProv: ['Seleccione',MyValidations.isSelectSelected],
      codigo_ciudad: ['Seleccione',MyValidations.isSelectSelected],
    });
  }
  /***************************** Load Data *****************************/
  loadAllData(): void {
    this._ngxSpinnerService.show();
    forkJoin([
      this._ciudadService.getAllCiudad().pipe(take(1)),
      this._departamentoService.getAllDepartamento().pipe(take(1)),
      this._paisService.getAllPais().pipe(take(1))
    ]).subscribe(
      data => {
        if(data[0]) this.listCiudad = data[0];
        if(data[1]) this.listDptos = data[1];
        if(data[2]) this.listPais = data[2];
        this._ngxSpinnerService.hide();
      },
      err => {
        console.log('Error al traer todos los datos para crud inmueble',err);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** Forms Functions *****************************/
  submitInmuebleForm(event: Event): void {
    event.preventDefault();
    if (this.inmuebleForm.valid) {
      let data = this.inmuebleForm.value;
      data['telefono'] = data['telefono'].toString();
      this.registerInmueble(data);
    } else this.inmuebleForm.markAllAsTouched();
  }
  getIsValid(form, propertyFormName: string): boolean {
    let isValid: boolean = false;
    if (form.get(propertyFormName).touched && form.get(propertyFormName).valid) isValid = true;
    return isValid;
  }
  getIsInvalid(form, propertyFormName: string): boolean {
    let isInvalid: boolean = false;
    if (form.get(propertyFormName).touched && form.get(propertyFormName).invalid) isInvalid = true;
    return isInvalid;
  }
  getPropertyHasErrors(form, propertyFormName: string): boolean {
    let hasError: boolean = false;
    if ( form.get(propertyFormName).errors && form.get(propertyFormName).touched ) hasError = true;
    return hasError;
  }
  getPropertyErrors(form, propertyFormName: string, errorName: string): boolean {
    let hasError: boolean = false;
    if ( form.get(propertyFormName).hasError(errorName) ) hasError = true;
    return hasError;
  }
  /***************************** Back Functions *****************************/
  registerInmueble(data: object): void {
    this._ngxSpinnerService.show();
    data['codigo_ciudad'] = +data['codigo_ciudad'];
    delete data['dptoProv'];
    delete data['paisProv'];
    this._inmobiliariaService.postInmueble(data).pipe(take(1)).subscribe(
      data => {
        this._ngxSpinnerService.hide();
        if (data) {
          this.initForms();
          this.saveOk = true;
          setTimeout(
            () => {
              this.dissmiossDataSavedOk();
            }, 3000);
        }
      }, error => {
        console.log('Error guardando inmueble');
        console.log(error);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** logic Functions *****************************/
  changeFormatTitleString(stringReceived): string {
    stringReceived = stringReceived.toLowerCase();
    stringReceived = stringReceived.charAt(0).toUpperCase() + stringReceived.substring(1);
    return stringReceived;
  }
  dissmiossDataSavedOk(): void {
    this.saveOk = false;
  }
  onChangeSelectLocation(type: number, idSelected: string): void {
    this.inmuebleForm.get('codigo_ciudad').setValue('Seleccione');
    switch (type) {
      case 1:
        this.listDptosFiltered = this.listDptos.filter(item => item.codigo_pais == idSelected);
        this.inmuebleForm.get('dptoProv').setValue('Seleccione');
        break;
      case 2:
        this.listCiudadFiltered = this.listCiudad.filter(item => item.codigo_depto == idSelected);
        break;
    }
  }
}
