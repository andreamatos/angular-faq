import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarFaqComponent } from './consultar-faq.component';

const routes: Routes = [

  {
      path: 'pagina/:pagina',
      component: ConsultarFaqComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultarFaqRoutingModule { }
