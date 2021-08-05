import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { CiudadService } from 'src/app/services/crud/ciudad.service';
import { DepartamentoService } from 'src/app/services/crud/departamento.service';
import { PaisService } from 'src/app/services/crud/pais.service';
import { MyValidations } from 'src/app/utils/myValidations';

@Component({
  selector: 'app-crud-location',
  templateUrl: './crud-location.component.html',
  styleUrls: ['./crud-location.component.scss']
})
export class CrudLocationComponent implements OnInit {

  saveOk = {
    pais: false,
    dpto: false,
    ciudad: false
  };
  listPais = [];
  listDptos = [];
  listDptosFiltered = [];
  formToShow: number = 0;
  ciudadForm: FormGroup;
  dptoForm: FormGroup;
  paisForm: FormGroup;

  constructor(
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _paisService: PaisService,
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.initForms();
    this.loadAllData();
  }
  

  ngOnInit(): void { }
  /***************************** Init Data *****************************/
  initForms(): void {
    this.ciudadForm = this._formBuilder.group({
      codigo_ciudad: ['',[Validators.required, Validators.maxLength(5)]],
      codigo_depto: ['Seleccione',MyValidations.isSelectSelected],
      paisTemp: ['Seleccione',MyValidations.isSelectSelected],
      nombre_ciudad: ['',[Validators.required, Validators.maxLength(20)]],
    });
    this.dptoForm = this._formBuilder.group({
      codigo_depto: ['',[Validators.required, Validators.maxLength(2)]],
      codigo_pais: ['Seleccione',MyValidations.isSelectSelected],
      nombre_depto: ['',[Validators.required, Validators.maxLength(20)]],
    });
    this.paisForm = this._formBuilder.group({
      codigo_pais: ['',[Validators.required, Validators.maxLength(2)]],
      nombre_pais: ['',[Validators.required, Validators.maxLength(20)]],
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
        if(data[1]) this.listDptos = data[1];
        if(data[2]) this.listPais = data[2];
        this._ngxSpinnerService.hide();
      },
      err => {
        console.log('Error al traer todos los datos para crud location',err);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** Forms Functions *****************************/
  submitAllForm(event: Event, from: string): void {
    event.preventDefault();
    switch (from) {
      case 'ciudad':
        if (this.ciudadForm.valid) {
          let data = this.ciudadForm.value;
          data['codigo_depto'] = +data['codigo_depto'];
          data['codigo_ciudad'] = data['codigo_ciudad'].toUpperCase();
          data['nombre_ciudad'] = this.changeFormatTitleString(data['nombre_ciudad']);
          delete data['paisTemp'];
          this.registerCiudad(data)
        } else this.ciudadForm.markAllAsTouched();
        break;
      case 'dpto':
        if (this.dptoForm.valid) {
          let data = this.dptoForm.value;
          data['codigo_pais'] = +data['codigo_pais'];
          data['codigo_depto'] = data['codigo_depto'].toUpperCase();
          data['nombre_depto'] = this.changeFormatTitleString(data['nombre_depto']);
          this.registerDpto(data);
        } else this.dptoForm.markAllAsTouched();
        break;
      case 'pais':
        if (this.paisForm.valid) {
          let data = this.paisForm.value;
          data['codigo_pais'] = data['codigo_pais'].toUpperCase();
          data['nombre_pais'] = this.changeFormatTitleString(data['nombre_pais']);
          this.registerPais(data);
        } else this.paisForm.markAllAsTouched();
        break;
    }
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
  registerCiudad(data: object): void {
    this._ngxSpinnerService.show();
    this._ciudadService.postCiudad(data).pipe(take(1)).subscribe(
      data => {
        this._ngxSpinnerService.hide();
        if (data) {
          this.initForms();
          this.saveOk['ciudad'] = true;
          setTimeout(
            () => {
              this.dissmiossDataSavedOk();
            }, 3000);
        }
      }, error => {
        console.log('Error guardando ciudad');
        console.log(error);
        this._ngxSpinnerService.hide();
      }
    );
  }
  registerDpto(data: object): void {
    this._ngxSpinnerService.show();
    this._departamentoService.postDepartamento(data).pipe(take(1)).subscribe(
      data => {
        this._ngxSpinnerService.hide();
        if (data) {
          this.initForms();
          this.saveOk['dpto'] = true;
          setTimeout(
            () => {
              this.dissmiossDataSavedOk();
            }, 3000);
        }
      }, error => {
        console.log('Error guardando dpto');
        console.log(error);
        this._ngxSpinnerService.hide();
      }
    );
  }
  registerPais(data: object): void {
    this._ngxSpinnerService.show();
    this._paisService.postPais(data).pipe(take(1)).subscribe(
      data => {
        this._ngxSpinnerService.hide();
        if (data) {
          this.initForms();
          this.saveOk['pais'] = true;
          setTimeout(
            () => {
              this.dissmiossDataSavedOk();
            }, 3000);
        }
      }, error => {
        console.log('Error guardando pais');
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
    this.saveOk = {
      pais: false,
      dpto: false,
      ciudad: false
    };
  }
  /***************************** html Functions *****************************/
  showSection(elementClicked: number): void {
    this.formToShow == elementClicked ? this.formToShow = 0 : this.formToShow = elementClicked;
  }
  onChangeSelectLocation(type: number, idSelected: string): void {
    this.ciudadForm.get('codigo_depto').setValue('Seleccione');
    this.listDptosFiltered = this.listDptos.filter(item => item.codigo_pais == idSelected);
  }
}
