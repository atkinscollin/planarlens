import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
    email: string;
    password: string;
    remember?: boolean;
}

export interface SignUpContext {
    email: string;
    username: string;
    password: string;
}

export interface RenewPasswordContext {
    email: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
    constructor(private credentialsService: CredentialsService) {}

    /**
     * Authenticates the user.
     * @param context The login parameters.
     * @return The user credentials.
     */
    login(context: LoginContext): Observable<Credentials> {
        // Replace by proper authentication call
        const data = {
            email: context.email,
            username: 'usernamePlaceholder',
            token: '123456'
        };
        this.credentialsService.setCredentials(data, context.remember);
        return of(data);
    }

    /**
     * Sign up the user.
     * @param context The user sign up parameters.
     * @returns The sign up status
     */
    signUp(context: SignUpContext): Observable<boolean> {
        // Replace by proper sign up call
        return of(true);
    }

    /**
     * Renew password of the user.
     * @param context The user sign up parameters.
     * @returns The sign up status
     */
    renewPassword(context: RenewPasswordContext): Observable<boolean> {
        // Replace by proper renew password call
        return of(true);
    }

    /**
     * Logs out the user and clear credentials.
     * @return True if the user was logged out successfully.
     */
    logout(): Observable<boolean> {
        // Customize credentials invalidation here
        this.credentialsService.setCredentials();
        return of(true);
    }
}
