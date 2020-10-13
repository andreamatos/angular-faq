import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtualizarFaqRoutingModule } from './atualizar-faq-routing.module';
import { AtualizarFaqComponent } from './atualizar-faq.component';

@NgModule({
  declarations: [AtualizarFaqComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtualizarFaqRoutingModule,
    SharedModule,
    FormsModule,
    CollapseModule.forRoot()
  ],
  exports: [
    AtualizarFaqComponent
  ]
})
export class AtualizarFaqModule { }
