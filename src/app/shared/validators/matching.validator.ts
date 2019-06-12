import { FormGroup } from '@angular/forms';

// Custom validator to check if two form fields values match.
export function MatchingValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        // Skip if it already has an error.
        if (matchingControl.errors && !matchingControl.errors.matching) {
            return;
        }

        // Set error on matchingControl if validation fails.
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ matching: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}