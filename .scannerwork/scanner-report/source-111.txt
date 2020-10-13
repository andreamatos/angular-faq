import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationModule } from 'src/app/shared/provider/notification/notification.module';
import { NotifierService } from 'angular-notifier';
import { AtualizarFaqComponent } from './atualizar-faq.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('AtualizarFaqComponent', () => {
    let component: AtualizarFaqComponent;
    let fixture: ComponentFixture<AtualizarFaqComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AtualizarFaqComponent],
            
            providers: [NotifierService],
            
            imports: [ReactiveFormsModule, 
                      HttpClientModule, 
                      HttpClientTestingModule, 
                      NotificationModule, RouterTestingModule, FormsModule]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AtualizarFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('consultarEmpresas', () => {
        expect(component).toBeTruthy();
        expect(component.consultarEmpresas).toBeDefined();
    });

    it('consultarEmpresasDadosDaSessao', () => {
        expect(component).toBeTruthy();
        expect(component.consultarEmpresasDadosDaSessao(1)).toBeDefined();
    });

    it('ngOnInit', () => {
        expect(component).toBeTruthy();
        expect(component.ngOnInit()).toBeDefined();
    });
});
