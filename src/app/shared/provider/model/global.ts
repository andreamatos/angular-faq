import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Global {
  codigoEmpresa?: string;
  idCurso?: number;
  idQuadro?: number;
  idGrupo?: number;
  nomeUsuario?: string;
  token?: string;
  polo?: number;

  isGlobalDataSet(): boolean {
    return (this.nomeUsuario !== undefined && this.nomeUsuario !== '')
      && (this.codigoEmpresa !== undefined && this.codigoEmpresa !== '');
  }
}
