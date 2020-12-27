import { FormGroup, FormControl, FormArray} from "@angular/forms";

export function badRequestErrorHandler(errorResult: any, form: FormGroup, errors: string[]) {
    if (errorResult.status === 400) {
        // handle validation error
        if (typeof (errorResult.error) === typeof ({})) {
            let validationErrorDictionary = errorResult.error;
            for (var fieldName in validationErrorDictionary) {
                if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                    if (form && form.controls[fieldName]) {
                        // integrate into angular's validation if we have field validation
                        form.controls[fieldName].setErrors({ remote: validationErrorDictionary[fieldName] });
                    } else {
                        // if we have cross field validation then show the validation error at the top of the screen
                        errors.push(validationErrorDictionary[fieldName]);
                    }
                }
            }
        } else {
            errors.push(errorResult.error);
        }
    } else {
        errors.push("something went wrong!");
    }
}


export function validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            validateAllFormFields(control);
        } else if (control instanceof FormArray) {
            (control).controls.forEach(c => {
                validateAllFormFields(<FormGroup>c);
            });
        }
    });
}
