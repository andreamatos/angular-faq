import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultarFaqComponent } from './consultar-faq.component';
import { ConsultarFaqRoutingModule } from './consultar-faq-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [ConsultarFaqComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConsultarFaqRoutingModule,
    SharedModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    ConsultarFaqComponent]
})
export class ConsultarFaqModule { }
