import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, Logger } from '@app/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

const log = new Logger('RenewPassword');

@Component({
    selector: 'app-lost-password',
    templateUrl: './lost-password.component.html',
    styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
    error: string;
    renewPasswordForm!: FormGroup;
    isLoading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.createForm();
    }

    ngOnInit() {}

    renewPassword() {
        this.isLoading = true;
        this.authenticationService
            .renewPassword(this.renewPasswordForm.value)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(
                () => {
                    const email = this.renewPasswordForm.get('email').value;
                    log.debug(`${email} successfully renewed their password`);
                    this.router.navigate(['/login'], {
                        replaceUrl: true,
                        queryParamsHandling: 'merge',
                        queryParams: { email: email }
                    });
                },
                error => {
                    log.debug(`Password renew error: ${error}`);
                    this.error = error;
                }
            );
    }

    private createForm() {
        this.renewPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
}
