import { AbstractControl, ValidatorFn } from "@angular/forms";

export const lettersOnlyValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  if (!value || !/^[a-zA-Z]+$/.test(value)) {
    return { lettersOnly: true };
  }
  return null;
};
