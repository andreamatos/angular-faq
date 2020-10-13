import { Component, OnInit} from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { FaqDuvidas } from 'src/app/shared/provider/model/faqDuvidas';
import { ConsultaFiltrosService } from 'src/app/shared/provider/services/consulta-filtros.service';
import { catchError} from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/provider/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaqEmprSetorDTO } from 'src/app/shared/provider/model/faqEmprSetorDTO';
import { FaqUsuSetor } from 'src/app/shared/provider/model/faqUsuSetor';
import { SingletonToken } from 'src/app/shared/provider/util/SingletonToken';

@Component({
  selector: 'app-atualizar-faq',
  templateUrl: './atualizar-faq.component.html',
  styleUrls: ['./atualizar-faq.component.scss']
})
export class AtualizarFaqComponent implements OnInit {
  subscription:Subscription;
  inscricaoPagina:Subscription;
  faqDuvidas:FaqDuvidas;
  listaFaqDuvidas:FaqDuvidas;
  comboSetor:FaqUsuSetor;
  comboEmpresa:FaqUsuSetor;
  frequencia=[];
  status=[];
  formulario:FormGroup;
  comboInstituicao:FaqEmprSetorDTO;
  
  idFaqDuvidas: number;
  idStatus: number;
  resumo: string;
  empresa: number;
  setor: number;
  idUsuario: string;
  pergunta: string;
  resposta: string;
  idFrequencia: number;
  instituicao: number;
  usuario: string;
  primeiroStatus:number;

  constructor(
    private consultaFiltrosService: ConsultaFiltrosService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const singletonToken = SingletonToken.getInstance();
    this.usuario = singletonToken.crUsuario;
    
    this.inicializarFormulario();
    this.recuperaParametrosSessao();
    this.construirFormularioComDados();
    this.preencherSetores();
  }

  preencherSetores() {
    this.subscription = this.consultaFiltrosService.findUsuSetor(this.usuario)
    .subscribe(res => {this.comboSetor = res;});    
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

  consultarEmpresas() {
    this.subscription = this.consultaFiltrosService.findAllEmpresasPorSetor(this.formulario.value.setor)
      .subscribe(res => {this.comboEmpresa = res;} );
  }

  consultarEmpresasDadosDaSessao(setor:number) {
    this.subscription = this.consultaFiltrosService.findAllEmpresasPorSetor(setor)
      .subscribe(res => {this.comboEmpresa = res;} );
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      setor: [null],
      empresa: [null],
      instituicao: [null],
      resumo: [null],
      pergunta: [null],
      resposta:[null],
      idFrequencia:[null],
      idStatus:[null]
    });
  }
  
  recuperaParametrosSessao(){
    this.inscricaoPagina = this.route.params.subscribe((params: any) => {
      this.idFaqDuvidas = Number(params.id);
    });
  }


  preencherStatus(){
    this.status = [{codStatus: 1, descStatus: 'ATIVO'},
    {codStatus: 2, descStatus: 'INATIVO'}]
  }

  preencherFrequencia(){
    this.frequencia = [
      {codFrequencia: 0},{codFrequencia: 1},{codFrequencia: 2},
      {codFrequencia: 3},{codFrequencia: 4},
      {codFrequencia: 5}]
  }

  atualizaCadastro() {
    this.faqDuvidas = new FaqDuvidas();
    this.faqDuvidas.idUsuario = this.usuario;
    this.faqDuvidas.idFaqDuvidas = this.idFaqDuvidas;
    this.faqDuvidas.idSetor = this.formulario.value.setor;
    this.faqDuvidas.resumo = this.formulario.value.resumo;
    this.faqDuvidas.codEmpr = this.formulario.value.empresa;
    this.faqDuvidas.status  = this.formulario.value.idStatus;
    this.faqDuvidas.pergunta = this.formulario.value.pergunta;
    this.faqDuvidas.resposta = this.formulario.value.resposta;
    this.faqDuvidas.frequencia = this.formulario.value.idFrequencia;
    this.faqDuvidas.codInst = this.formulario.value.instituicao;
    
    this.atualizarFaq();
  }

  consultarInstituicoes() {
    this.subscription = this.consultaFiltrosService.findAllInstituicoesPorEmpresaESetor(
      this.formulario.value.empresa,this.formulario.value.setor)
      .subscribe(res => {this.comboInstituicao = res;} );
  }

  consultarInstituicoesDaSessao(empresa: number, setor: number) {
    this.subscription = this.consultaFiltrosService.findAllInstituicoesPorEmpresaESetor(empresa,setor)
      .subscribe(res => {this.comboInstituicao = res;} );
  }


  atualizarFaq() {
    this.subscription = this.consultaFiltrosService.updateFaq(this.faqDuvidas)
    .pipe(
      catchError(err => {
        this.notificationService.publishMessageOfWarning('Ocorreu um erro ao atualizar um FAQ');
        return throwError(err);
      }))
    .subscribe(() => {
      this.notificationService.publishMessageOfSuccess('FAQ atualizado com sucesso.');
      setTimeout(() => { }, 1000);
    });
    this.formulario.reset();
  }

  construirFormularioComDados(){
    this.faqDuvidas = new FaqDuvidas();

    this.subscription = this.consultaFiltrosService.findByIdFaqDuvidas(this.idFaqDuvidas)
      .subscribe(res => {
        this.preencheTelaEntrada(res);
        this.preencherStatus();
        this.preencherFrequencia();
      });
  }

  preencheTelaEntrada(res: FaqDuvidas) {
    this.empresa = res.codEmpr
    this.resumo = res.resumo
    this.idFaqDuvidas = res.idFaqDuvidas
    this.idStatus = res.status
    this.primeiroStatus = this.idStatus
    this.setor = res.idSetor
    this.idUsuario = res.idUsuario
    this.pergunta = res.pergunta
    this.resposta = res.resposta
    this.idFrequencia = res.frequencia
    this.instituicao = res.codInst
    this.consultarEmpresasDadosDaSessao(res.idSetor);
    this.consultarInstituicoesDaSessao(res.codEmpr, res.idSetor)
    this.construirFormulario(res)
  }

  construirFormulario(res: FaqDuvidas){
    this.formulario = this.formBuilder.group({
      setor: [res.idSetor, Validators.required],
      empresa: [res.codEmpr, Validators.required],
      instituicao: [res.codInst, Validators.required],
      resumo: [res.resumo, Validators.required],
      pergunta: [res.pergunta, Validators.required],
      resposta:[ res.resposta, Validators.required],
      idFrequencia:[res.frequencia, Validators.required],
      idStatus:[res.status, Validators.required]
    });
  }

  habilitaFrequencia(): boolean {
      return true;
    }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
