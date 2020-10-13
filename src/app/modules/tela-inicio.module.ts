import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TelaInicioComponent } from './tela-inicio.component';
import { TelaInicioRoutingModule } from './tela-inicio-rounting.module';


@NgModule({
  declarations: [TelaInicioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TelaInicioRoutingModule,
  ],
  exports: [
    TelaInicioComponent
  ]
})
export class TelaInicioModule { }
