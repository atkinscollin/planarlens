import { Observable, of } from 'rxjs';

import { LoginContext, SignUpContext, RenewPasswordContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
    credentials: Credentials | null = {
        email: 'test@mail.com',
        username: 'test',
        token: '123'
    };

    login(context: LoginContext): Observable<Credentials> {
        return of({
            email: context.email,
            username: 'usernamePlaceholder',
            token: '123456'
        });
    }

    signUp(context: SignUpContext): Observable<boolean> {
        return of(true);
    }

    renewPassword(context: RenewPasswordContext): Observable<boolean> {
        return of(true);
    }

    logout(): Observable<boolean> {
        this.credentials = null;
        return of(true);
    }
}
