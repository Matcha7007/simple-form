import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MatchValidator {
    public static match(matchWith: string, message?: string): ValidatorFn {
        return (ac: AbstractControl): ValidationErrors => {
            if (ac.parent && ac.value) {
                const formControlMatch = ac.parent.get(matchWith);
                if (ac.value != formControlMatch?.value) {
                    return {
                        message: message || `Value doesn't match with '${matchWith}' value`,
                    };
                }
            }
            return null as any;
        }
    }
}