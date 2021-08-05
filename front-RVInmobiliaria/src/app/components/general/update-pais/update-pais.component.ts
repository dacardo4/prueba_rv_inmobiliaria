import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from 'src/app/services/crud/pais.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyValidations } from 'src/app/utils/myValidations';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'updatePais',
  templateUrl: './update-pais.component.html',
  styleUrls: ['./update-pais.component.scss']
})
export class UpdatePaisComponent implements OnInit {

  @Input("pais") pais: object;
  @Output() finalAnswer = new EventEmitter<string>();

  saveOk = false;
  listPais = [];
  listDptos = [];
  listDptosFiltered = [];
  listCiudad = [];
  listCiudadFiltered = [];
  paisForm: FormGroup;

  constructor(
    private _paisService: PaisService,
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.fillForm(this.pais);
  }
  /***************************** Init Data *****************************/
  initForms(): void {
    this.paisForm = this._formBuilder.group({
      codigo_pais: ['',[Validators.required, Validators.maxLength(2)]],
      nombre_pais: ['',[Validators.required, Validators.maxLength(20)]],
    });
  }
  fillForm(data: object): void {
    this.paisForm.setValue({
      codigo_pais: data['codigo_pais'],
      nombre_pais: data['nombre_pais'],
    });
  }
  /***************************** Forms Functions *****************************/
  submitForm(event: Event): void {
    event.preventDefault();
    if (this.paisForm.valid) {
      let data = this.paisForm.value;
      data['codigo_pais'] = data['codigo_pais'].toUpperCase();
      data['nombre_pais'] = this.changeFormatTitleString(data['nombre_pais']);
      this.updatePais(data);
    } else this.paisForm.markAllAsTouched();
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
  updatePais(data: object): void {
    this._ngxSpinnerService.show();
    this._paisService.patchPais(this.pais['id_pais'], data).pipe(take(1)).subscribe(
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
  answerOk() {
    this.finalAnswer.emit('ok');
  }
}
