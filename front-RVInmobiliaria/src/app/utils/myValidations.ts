import { AbstractControl } from '@angular/forms';

export class MyValidations {
    static isSelectSelected(control: AbstractControl) {
        const value = control.value;
        if (value == "Seleccione") {
            return { isSelectSelected: true};
        }
        return null;
    }
}
