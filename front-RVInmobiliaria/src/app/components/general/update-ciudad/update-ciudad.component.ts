import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from 'src/app/services/crud/ciudad.service';
import { DepartamentoService } from 'src/app/services/crud/departamento.service';
import { InmobiliariaService } from 'src/app/services/crud/inmobiliaria.service';
import { PaisService } from 'src/app/services/crud/pais.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyValidations } from 'src/app/utils/myValidations';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'updateCiudad',
  templateUrl: './update-ciudad.component.html',
  styleUrls: ['./update-ciudad.component.scss']
})
export class UpdateCiudadComponent implements OnInit {

  @Input("ciudad") ciudad: object;
  @Output() finalAnswer = new EventEmitter<string>();

  saveOk = false;
  listPais = [];
  listDptos = [];
  listDptosFiltered = [];
  listCiudad = [];
  ciudadForm: FormGroup;

  constructor(
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _paisService: PaisService,
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadAllData(this.ciudad['id']);
  }
  /***************************** Init Data *****************************/
  initForms(): void {
    this.ciudadForm = this._formBuilder.group({
      codigo_ciudad: ['',[Validators.required, Validators.maxLength(5)]],
      codigo_depto: ['Seleccione',MyValidations.isSelectSelected],
      paisTemp: ['Seleccione',MyValidations.isSelectSelected],
      nombre_ciudad: ['',[Validators.required, Validators.maxLength(20)]],
    });
  }
  fillForm(data: object): void {
    this.onChangeSelectLocation(1, data['seEncuentraEn']['codigo_pais']);
    this.onChangeSelectLocation(2, data['seEncuentraEn']['id_depto']);
    this.ciudadForm.setValue({
      codigo_ciudad: data['codigo_ciudad'],
      codigo_depto: data['codigo_depto'],
      paisTemp: data['seEncuentraEn']['codigo_pais'],
      nombre_ciudad: data['nombre_ciudad'],
    });
  }
  /***************************** Load Data *****************************/
  loadAllData(id: number): void {
    this._ngxSpinnerService.show();
    forkJoin([
      this._departamentoService.getAllDepartamento().pipe(take(1)),
      this._paisService.getAllPais().pipe(take(1)),
    ]).subscribe(
      data => {
        if(data[0]) this.listDptos = data[0];
        if(data[1]) this.listPais = data[1];
        this.fillForm(this.ciudad);
        this._ngxSpinnerService.hide();
      },
      err => {
        console.log('Error al traer todos los datos para crud inmueble',err);
        this._ngxSpinnerService.hide();
      }
    );
  }
  /***************************** Forms Functions *****************************/
  submitForm(event: Event): void {
    event.preventDefault();
    if (this.ciudadForm.valid) {
      let data = this.ciudadForm.value;
      data['codigo_depto'] = +data['codigo_depto'];
      data['codigo_ciudad'] = data['codigo_ciudad'].toUpperCase();
      data['nombre_ciudad'] = this.changeFormatTitleString(data['nombre_ciudad']);
      delete data['paisTemp'];
      this.updateInmueble(data);
    } else this.ciudadForm.markAllAsTouched();
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
  updateInmueble(data: object): void {
    this._ngxSpinnerService.show();
    this._ciudadService.patchCiudad(this.ciudad['id_ciudad'], data).pipe(take(1)).subscribe(
      data => {
        this._ngxSpinnerService.hide();
        this.answerOk();
      }, error => {
        console.log('Error actualizando inmueble');
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
    this.ciudadForm.get('codigo_depto').setValue('Seleccione');
    switch (type) {
      case 1:
        this.listDptosFiltered = this.listDptos.filter(item => item.codigo_pais == idSelected);
        break;
    }
  }
  answerOk() {
    this.finalAnswer.emit('ok');
  }
}
