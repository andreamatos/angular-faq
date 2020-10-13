import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/tela-inicio.module').then(mod => mod.TelaInicioModule)},
  { path: 'incluir-faq', loadChildren: () => import('./modules/incluir-faq/incluir-faq-module').then(mod => mod.IncluirFaqModule)},
  { path: 'consultar-faq', loadChildren: () => import('./modules/consultar-faq/consultar-faq-module').then(mod => mod.ConsultarFaqModule)},
  { path: 'atualizar-faq', loadChildren: () => import('./modules/atualizar-faq/atualizar-faq-module').then(mod => mod.AtualizarFaqModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
