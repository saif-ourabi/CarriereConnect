import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authStatus$.pipe(
      first(),
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          const userInfo:any = this.authService.getUserInfo();
          if (userInfo && userInfo.role === 'admin') {
            return true;
          } else {
            return this.router.createUrlTree(['/home-page']);
          }
        } else {
          return this.router.createUrlTree(['/Login']);
        }
      })
    );
  }
}
