import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Setor } from '../model/setor';
import { FaqDuvidas } from '../model/faqDuvidas';
import { FaqSetor } from '../model/faqSetor';
import { FaqUsuSetor } from '../model/faqUsuSetor';
import { FaqEmprSetor } from '../model/faqEmprSetor';
import { FaqEmprSetorDTO } from '../model/faqEmprSetorDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaFiltrosService {
 
  public headers: Headers = new Headers();

  public getHeaders(res): void {
    this.headers.delete('Authorization');
    this.headers.delete('Content-type');
    this.headers.append('Content-type', 'application/json');

  }

  constructor(
    private httpClient: HttpClient
  ) { }

  save(faqDuvidas: FaqDuvidas): Observable<FaqDuvidas> {
    return this.httpClient.post<FaqDuvidas>(environment.ACD_FAQ + `/faqDuvidas`, faqDuvidas);
  }

  findByUsuario(pagina: number, usuario: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.ACD_FAQ}/faqDuvidas/geral/pagina/${pagina}/usuario/${usuario}`);
  }

  findByIdFaqDuvidas(idFaqDuvidas: number): Observable<FaqDuvidas> {
    return this.httpClient.get<FaqDuvidas>(`${environment.ACD_FAQ}/faqDuvidas/${idFaqDuvidas}`);
  }

  updateFaq(faqDuvidas: FaqDuvidas) {
    return this.httpClient.put<FaqDuvidas>(environment.ACD_FAQ + `/faqDuvidas`, faqDuvidas);
  }

  findAllByCodEmprAndIdSetorAndIdFrequenciaAndCodInst(codEmpr: number, idSetor: number, frequencia: number, codInst: number): Observable<FaqDuvidas>  {
    return this.httpClient.get<FaqDuvidas>(`${environment.ACD_FAQ}/faqDuvidas/empresa/${codEmpr}/setor/${idSetor}/frequencia/${frequencia}/codInst/${codInst}`);
  }

  findSetorGeral(): Observable<Setor> {
    return this.httpClient.get<Setor>(`${environment.ACD_FAQ}/faqEmprSetor/geral/`);
  }

  findFaqSetor(): Observable<FaqSetor> {
    return this.httpClient.get<FaqSetor>(`${environment.ACD_FAQ}/faqSetor/`);
  }

  findUsuSetor(userName: string): Observable<FaqSetor> {
    return this.httpClient.get<FaqSetor>(`${environment.ACD_FAQ}/faqUsuSetor/setor/nome/${userName}`);
  }

  findAllEmpresasPorSetor(idSetor: number): Observable<FaqUsuSetor> {
    return this.httpClient.get<FaqEmprSetor>(`${environment.ACD_FAQ}/faqEmprSetor/empresaSetor/${idSetor}`);
  }

  findAllInstituicoesPorEmpresaESetor(idEmpresa: number,idSetor: number ): Observable<FaqEmprSetorDTO> {
    return this.httpClient.get<FaqEmprSetorDTO>(`${environment.ACD_FAQ}/faqEmprSetor/instituicaoEmpresa/${idEmpresa}/setor/${idSetor}`);
  }

}
