import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicioComponent } from './tela-inicio.component';
import { AuthGuard } from '../shared/provider/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: TelaInicioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TelaInicioRoutingModule { }