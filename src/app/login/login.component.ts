import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    error: string | undefined;
    loginForm!: FormGroup;
    isLoading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        this.createForm();
    }

    ngOnInit() {
        const email: string | null = this.route.snapshot.queryParams.email;
        if (email) {
            this.loginForm.get('email').setValue(email);
        }
    }

    ngOnDestroy() {}

    login() {
        this.isLoading = true;
        const login$ = this.authenticationService.login(this.loginForm.value);
        login$
            .pipe(
                finalize(() => {
                    this.loginForm.markAsPristine();
                    this.isLoading = false;
                }),
                untilDestroyed(this)
            )
            .subscribe(
                credentials => {
                    log.debug(`${credentials.email} successfully logged in`);
                    this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
                },
                error => {
                    log.debug(`Login error: ${error}`);
                    this.error = error;
                }
            );
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: true
        });
    }
}
