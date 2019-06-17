import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { Shell } from '@app/shell/shell.service';
import { UnauthGuard } from '@app/core/authentication/unauth.guard';

const routes: Routes = [
    Shell.childRoutes([
        { path: 'login', component: LoginComponent, data: { title: 'Login' }, canActivate: [UnauthGuard] },
        {
            path: 'sign-up',
            component: SignUpComponent,
            data: { title: 'Sign up' },
            canActivate: [UnauthGuard]
        },
        {
            path: 'reset-password',
            component: LostPasswordComponent,
            data: { title: 'Reset password' }
        }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LoginRoutingModule {}
