import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable ,  of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {SingletonToken} from '../util/SingletonToken';
import { environment } from 'src/environments/environment';
import { AppService } from '../services/app.service';
import { Global } from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    const singletonToken = SingletonToken.getInstance();
    const token = route.params['token'];
    const usuario = route.queryParams['_crUsuario'];
    const empresa = route.queryParams['_crEmpresa'];

    singletonToken.token = token;

    singletonToken.crUsuario = usuario;
    singletonToken.crEmpresa = empresa;

    if (! environment.production) {
      return of(true).toPromise();
    }


    if (!this.appService.isUserAuthenticated() && !token) {
      this.router.navigate(['usuario-sem-acesso']);
      return of(false).toPromise();
    }

    if (this.appService.isUserAuthenticated() && this.global.isGlobalDataSet()) {
      return of(true).toPromise();
    } else {
      return this.appService.authenticate(token, usuario, empresa)
        .pipe(
          map(val => {
            if (!val) {
              this.router.navigate(['usuario-sem-acesso']);
            }
            return val;
          }),
          catchError(err => of(false).toPromise())
        );
    }
  }

  constructor(private appService: AppService, private router: Router
    , private global: Global) { }
}
