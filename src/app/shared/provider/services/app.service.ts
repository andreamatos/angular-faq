
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable ,  of } from 'rxjs';
import { DadosAcesso } from '../model/dados-acesso-siaa';
import {Global} from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private tokenService: TokenService,
              private global: Global) { }

  private findAccessData(token: string): Observable<DadosAcesso> {
    return this.tokenService.buscaDadosAcesso(token);
  }

  isUserAuthenticated(): boolean {
    if (this.tokenService.isAccessTokenSet()) {
      return true;
    }
    return false;
  }

  authenticate(token?: string, usuario?: string, empresa?: string): Observable<boolean> {
    if (!token && !this.tokenService.isAccessTokenSet()) {
      return of(false);
    } else if (!token) {
      token = this.tokenService.getAccessToken();
    }
    return this.findAccessData(token.toString())
      .pipe( d => d.pipe(map(dadosAcesso => {
        if (dadosAcesso) {
          this.setGlobalData((usuario ? usuario : dadosAcesso.username).toString()
            , (empresa ? empresa : dadosAcesso.codEmpresa).toString(), dadosAcesso.token);
          this.tokenService.setAccessToken(this.global.token);
          return true;
        }
        return false;
      })));
  }

  private setGlobalData(nomeUsuario: string, codigoEmpresa: string, token: string) {
    this.global.nomeUsuario = nomeUsuario;
    this.global.codigoEmpresa = codigoEmpresa;
    this.global.token = token;
  }
}