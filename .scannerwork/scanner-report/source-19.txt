import { Component, OnInit } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Empresa } from 'src/app/shared/provider/model/empresa';
import { FaqDuvidas } from 'src/app/shared/provider/model/faqDuvidas';
import { ConsultaFiltrosService } from 'src/app/shared/provider/services/consulta-filtros.service';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/provider/notification/notification.service';
import { FaqUsuSetor } from 'src/app/shared/provider/model/faqUsuSetor';
import { FaqEmprSetor } from 'src/app/shared/provider/model/faqEmprSetor';
import { FaqEmprSetorDTO } from 'src/app/shared/provider/model/faqEmprSetorDTO';
import { SingletonToken } from 'src/app/shared/provider/util/SingletonToken';

@Component({
  selector: 'app-incluir-faq',
  templateUrl: './incluir-faq.component.html',
  styleUrls: ['./incluir-faq.component.scss']
})
export class IncluirFaqComponent implements OnInit {
  private subscription:Subscription;
  faqDuvidas:FaqDuvidas;
  listaFaqDuvidas:FaqDuvidas;
  formulario:FormGroup;
  empresa:Empresa;
  comboSetor:FaqUsuSetor;
  comboEmpresa:FaqEmprSetor;
  comboInstituicao:FaqEmprSetorDTO;
  frequencia=[];
  status=[];
  usuario: string;

  constructor(
    private formBuilder: FormBuilder,
    private consultaFiltrosService: ConsultaFiltrosService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.faqDuvidas = new FaqDuvidas();
    this.listaFaqDuvidas = new FaqDuvidas();

    const singletonToken = SingletonToken.getInstance();
    this.usuario = singletonToken.crUsuario;
    
    this.formulario = this.formBuilder.group({
      empresa: [null],
      setor: [null],
      resumo: [null],
      pergunta: [null],
      resposta:[null],
      status:[null],
      frequencia:[null],
      instituicao:[null]
    });

    this.preencherStatus();
    this.preencherFrequencia();
    this.preencherSetores();
  }
  preencherSetores() {
    this.subscription = this.consultaFiltrosService.findUsuSetor('jenildo')
    .subscribe(res => {this.comboSetor = res;});    
  }

  consultarEmpresas() {
    this.subscription = this.consultaFiltrosService.findAllEmpresasPorSetor(this.formulario.value.setor)
      .subscribe(res => {this.comboEmpresa = res;} );
  }

  consultarInstituicoes() {
    this.subscription = this.consultaFiltrosService.findAllInstituicoesPorEmpresaESetor(
      this.formulario.value.empresa,this.formulario.value.setor)
      .subscribe(res => {this.comboInstituicao = res;} );
  }

  onChangeSetor(){
    this.comboInstituicao = null;
    if (this.formulario.value.setor !== ""){
        this.consultarEmpresas();
    }else{
      this.comboEmpresa = null;
      this.comboInstituicao = null;
    }
  }

  onChangeEmpresa(){
    if (this.formulario.value.empresa !== ""){
      this.consultarInstituicoes();
    }else{
      this.comboInstituicao = null;
    }
  }

  preencherStatus(){
    this.status = [{idStatus: 1, descStatus: 'ATIVO'},
    {idStatus: 2, descStatus: 'INATIVO'}]
  }

  preencherFrequencia(){
    this.frequencia = [
      {idFrequencia: 0},{idFrequencia: 1},{idFrequencia: 2},
      {idFrequencia: 3},{idFrequencia: 4},{idFrequencia: 5}]
  }

  habilitaBotao(): boolean {
    if (this.formulario.value.empresa !== 'null' && this.formulario.value.empresa !== '' &&
        this.formulario.value.setor !== 'null' && this.formulario.value.setor !== '' &&
        this.formulario.value.status !== 'null' && this.formulario.value.status !== '') {
      return false;
    } else {
      return true;
    }
  }
  
  salvaCadastro() {
    console.log(this.faqDuvidas.codEmpr);

    this.faqDuvidas.idFaqDuvidas = 0;
    this.faqDuvidas.idUsuario = this.usuario;
    this.faqDuvidas.codInst = this.formulario.value.instituicao;
    this.faqDuvidas.idSetor = this.formulario.value.setor;
    this.faqDuvidas.resumo = this.formulario.value.resumo;
    this.faqDuvidas.codEmpr = this.formulario.value.empresa;
    this.faqDuvidas.pergunta = this.formulario.value.pergunta;
    this.faqDuvidas.resposta = this.formulario.value.resposta;
    this.faqDuvidas.frequencia = this.formulario.value.frequencia;
    this.faqDuvidas.status  = this.formulario.value.status;

    if(this.formulario.value.frequencia !== '0'){
      this.consultarFaqDuvidasPorEmprAndIdSetor();
    }else{
      this.salvarFaqDuvidas();
    }
  }
  
  consultarFaqDuvidasPorEmprAndIdSetor(){
    this.subscription = this.consultaFiltrosService.findAllByCodEmprAndIdSetorAndIdFrequenciaAndCodInst
    (this.faqDuvidas.codEmpr, this.faqDuvidas.idSetor, this.faqDuvidas.frequencia, this.faqDuvidas.codInst)
      .pipe(
        catchError(err => {
          this.notificationService.publishMessageOfWarning('Ocorreu um erro ao cadastrar um FAQ');
          return throwError(err);
        }))
      .subscribe(res => {
        this.listaFaqDuvidas = res;
        if (Object.keys(this.listaFaqDuvidas).length == 0) {
          this.salvarFaqDuvidas();
        }else{
          this.notificationService.publishMessageOfWarning('Esta Frequencia já existe para Empresa e Setor e Frequência');
        }
        setTimeout(() => { }, 1000); 
      });
  }

  salvarFaqDuvidas() {
    this.subscription = this.consultaFiltrosService.save(this.faqDuvidas)
    .pipe(
      catchError(err => {
        this.notificationService.publishMessageOfWarning('Ocorreu um erro ao cadastrar um FAQ');
        return throwError(err);
      }))
    .subscribe(() => {
      this.notificationService.publishMessageOfSuccess('FAQ cadastrado com sucesso.');
      setTimeout(() => { }, 1000);
      this.formulario.reset();
    });
  }


  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
