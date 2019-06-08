import { Directive } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';

export const notNullValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const val = String(control.value).trim();

  return !val ? { notNull: true } : null;
};

@Directive({
  selector: '[appNotNull]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NotNullDirective, multi: true },
  ],
})
export class NotNullDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return notNullValidator(control);
  }
}
