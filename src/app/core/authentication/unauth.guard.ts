import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('UnauthGuard');

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.credentialsService.isAuthenticated()) {
      return true;
    }

    log.debug('Already authenticated, redirecting to home...');
    this.router.navigate(['/'], { replaceUrl: true });
    return false;
  }
}
