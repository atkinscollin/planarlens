import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService, CredentialsService } from '@app/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() sidenav!: MatSidenav;

    constructor(
        private router: Router,
        private titleService: Title,
        private authenticationService: AuthenticationService,
        private credentialsService: CredentialsService
    ) {}

    ngOnInit() {}

    logout() {
        this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }

    get currentUrl(): string {
        return this.router.routerState.snapshot.url;
    }

    get isLoggedIn(): boolean {
        return this.credentialsService.isAuthenticated();
    }

    get title(): string {
        return this.titleService.getTitle();
    }

    get username(): string {
        const credentials = this.credentialsService.credentials;
        return credentials ? credentials.username : null;
    }
}
