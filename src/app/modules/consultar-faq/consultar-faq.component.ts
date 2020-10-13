import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultaFiltrosService } from 'src/app/shared/provider/services/consulta-filtros.service';
import { Subscription } from 'rxjs';
import { FaqDuvidas } from 'src/app/shared/provider/model/faqDuvidas';
import { Paginacao } from 'src/app/shared/provider/model/paginacao';
import { ActivatedRoute } from '@angular/router';
import { SingletonToken } from 'src/app/shared/provider/util/SingletonToken';

@Component({
  selector: 'app-consultar-faq',
  templateUrl: './consultar-faq.component.html',
  styleUrls: ['./consultar-faq.component.scss']
})
export class ConsultarFaqComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  inscricaoPagina:Subscription;
  dadosPaginacao:Paginacao = new Paginacao;
  pagina:number;
  listafaqDuvidas:FaqDuvidas[];
  returnedArray:string[];
  listaFaq=[];
  usuario: string;

  constructor(    
    private consultaFiltrosService: ConsultaFiltrosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const singletonToken = SingletonToken.getInstance();
    this.usuario = singletonToken.crUsuario;
    
    this.inscricaoPagina = this.route.params.subscribe((params: any) => {
    this.pagina = Number(params.pagina) - 1;
    this.buscarListaFaq();
    });
  }
  
  buscarListaFaq(){
    this.subscription = this.consultaFiltrosService.findByUsuario(this.pagina, 'jenildo')
    .subscribe(res => {
       this.listafaqDuvidas = res['content']; 
       this.dadosPaginacao = res;
      });
  }

  ngOnDestroy(): void {
    if (this.inscricaoPagina !== undefined && this.listafaqDuvidas !== undefined) {
      this.inscricaoPagina.unsubscribe();
      this.subscription.unsubscribe();
    }
  }
}