import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, Logger } from '@app/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatchingValidator } from '@app/shared/validators/matching.validator';

const log = new Logger('SignUp');

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm!: FormGroup;
    isLoading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.createForm();
    }

    ngOnInit() {}

    signUp() {
        this.isLoading = true;
        this.authenticationService
            .signUp(this.signUpForm.value)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(
                () => {
                    log.debug(`Sign up successful`);
                    this.router.navigate(['/'], { replaceUrl: true });
                },
                error => {
                    log.debug(`Sign up error: ${error}`);
                }
            );
    }

    private createForm() {
        this.signUpForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                username: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(10)]],
                confirmPassword: ['', Validators.required]
            },
            {
                validator: MatchingValidator('password', 'confirmPassword')
            }
        );
    }
}
