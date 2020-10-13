import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncluirFaqComponent } from './incluir-faq.component';
import { IncluirFaqRoutingModule } from './incluir-faq-routing.module';

@NgModule({
  declarations: [IncluirFaqComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncluirFaqRoutingModule,
    SharedModule,
    CollapseModule.forRoot()
  ],
  exports: [
    IncluirFaqComponent
  ]
})
export class IncluirFaqModule { }
