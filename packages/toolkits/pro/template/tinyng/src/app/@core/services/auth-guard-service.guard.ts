import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TiMessageService } from '@opentiny/ng';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  i18nValues: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private tiMessageService: TiMessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['pages/login']);
      setTimeout(() => {
        this.i18nValues = this.translate.instant('authNotice');
      });

      return false;
    } else {
      return true;
    }
  }
}
