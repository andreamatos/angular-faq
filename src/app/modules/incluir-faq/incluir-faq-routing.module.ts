import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncluirFaqComponent } from './incluir-faq.component';

const routes: Routes = [
  {
    path: '',
    component: IncluirFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IncluirFaqRoutingModule { }
