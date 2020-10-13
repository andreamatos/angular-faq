import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarFaqComponent } from './atualizar-faq.component';

const routes: Routes = [
  { path: ':id',
   component: AtualizarFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AtualizarFaqRoutingModule { }
