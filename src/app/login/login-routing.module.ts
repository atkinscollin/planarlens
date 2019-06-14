import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, AuthenticationGuard } from '@app/core';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { Shell } from '@app/shell/shell.service';
import { UnauthGuard } from '@app/core/authentication/unauth.guard';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'login', component: LoginComponent, data: { title: extract('Login') }, canActivate: [UnauthGuard] },
    { path: 'sign-up', component: SignUpComponent, data: { title: extract('Sign up') }, canActivate: [UnauthGuard] },
    {
      path: 'lost-password',
      component: LostPasswordComponent,
      data: { title: extract('Lost password') },
      canActivate: [AuthenticationGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
