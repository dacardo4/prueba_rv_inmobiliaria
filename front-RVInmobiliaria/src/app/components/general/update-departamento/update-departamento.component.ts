import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { DepartamentoService } from 'src/app/services/crud/departamento.service';
import { PaisService } from 'src/app/services/crud/pais.service';
import { MyValidations } from 'src/app/utils/myValidations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'updateDepartamento',
  templateUrl: './update-departamento.component.html',
  styleUrls: ['./update-departamento.component.scss']
})
export class UpdateDepartamentoComponent implements OnInit {

  @Input("departamento") departamento: object;
  @Output() finalAnswer = new EventEmitter<string>();

  saveOk = false;
  listPais = [];
  listDptos = [];
  listDptosFiltered = [];
  listCiudad = [];
  listCiudadFiltered = [];
  dptoForm: FormGroup;

  constructor(
    private _departamentoService: DepartamentoService,
    private _paisService: PaisService,
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadAllData();
  }
  /***************************** Init Data *****************************/
  initForms(): void {
    this.dptoForm = this._formBuilder.group({
      codigo_depto: ['',[Validators.required, Validators.maxLength(2)]],
      codigo_pais: ['Seleccione',MyValidations.isSelectSelected],
      nombre_depto: ['',[Validators.required, Validators.maxLength(20)]],
    });
  }
  fillForm(data: object): void {
    this.dptoForm.setValue({
      codigo_depto: data['codigo_depto'],
      codigo_pais: data['codigo_pais'],
      nombre_depto: data['nombre_depto'],
    });
  }
  /***************************** Load Data *****************************/
  loadAllData(): void {
    this._ngxSpinnerService.show();
    forkJoin([
      this._paisService.getAllPais().pipe(take(1)),
    ]).subscribe(
      data => {
        if(data[0]) this.listPais = data[0];
        this.fillForm(this.departamento);
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
    if (this.dptoForm.valid) {
      let data = this.dptoForm.value;
      data['codigo_pais'] = +data['codigo_pais'];
      data['codigo_depto'] = data['codigo_depto'].toUpperCase();
      data['nombre_depto'] = this.changeFormatTitleString(data['nombre_depto']);
      this.updateDpto(data);
    } else this.dptoForm.markAllAsTouched();
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
  updateDpto(data: object): void {
    this._ngxSpinnerService.show();
    this._departamentoService.patchDepartamento(this.departamento['id_depto'], data).pipe(take(1)).subscribe(
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
  answerOk() {
    this.finalAnswer.emit('ok');
  }
}
