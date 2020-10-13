import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class TokenService extends BaseService {

  token: string;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  buscaDadosAcesso (token: string): Observable<any> {
    return from(this.validaToken(token));
  }

  getAccessToken() {
    return Cookie.get('access_token');
  }

  setAccessToken(token) {
    Cookie.set('access_token', token, this.minutos(5));
  }

  renovaToken(token: string): Observable<string> {
    const path = environment.endpointRefreshToken + token;
    return this.httpClient.get(path, {responseType: 'text'});
  }

  async validaToken(token: string) {
    if (!this.getAccessToken()) {
      const tokenRenovado = await this.renovaToken(token).toPromise();
      this.setAccessToken(tokenRenovado);
    }
    return this.get(`${environment.endpointRedis}/dadosAcessoSiaa`).toPromise();
  }

  isAccessTokenSet(): boolean {
    return this.getAccessToken() !== undefined && this.getAccessToken() != null
      && this.getAccessToken() !== '';
  }

  private minutos(minutos: number): number {
    return minutos / (1 * 24 * 60);
  }
}
