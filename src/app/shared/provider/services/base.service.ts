
import { Observable ,  throwError as _throw } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

declare var showErrorMessage: any;
declare var closeProcessing: any;
declare var getMessage: any;

export abstract class BaseService {
  constructor(protected httpClient: HttpClient) {
  }

  get<T>(path: string): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.get<T>(path, { headers }).pipe(catchError(this.processHandleError));
  }

  getHeader<T>(path: string, headers: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(path, { headers }).pipe(catchError(this.processHandleError));
  }

  post<T, E>(path: string, input: T): Observable<E> {
    const headers = new HttpHeaders();
    return this.httpClient.post<E>(path, input, { headers }).pipe(catchError(this.processHandleError));
  }

  doUpload<E>(path: string, body: any): Observable<E> {
    const headers = new HttpHeaders();
    return this.httpClient.post<E>(path, body, { headers }).pipe(catchError(this.processHandleError));
  }

  delete<T>(path: string): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.delete<T>(path, { headers }).pipe(catchError(this.processHandleError));
  }

  private processHandleError(err: HttpErrorResponse) {
    closeProcessing();

    let message = null;

    if (err != null && err.error != null) {
      message = getMessage(err.error.message);
    }

    if (message == null) {
      message = `Erro ao acessar serviço: ${err.status} - ${err.statusText}`;
    }

    showErrorMessage(message);
    return _throw(err.statusText);
  }

}
