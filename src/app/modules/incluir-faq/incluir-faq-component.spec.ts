import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IncluirFaqComponent } from './incluir-faq.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationModule } from 'src/app/shared/provider/notification/notification.module';
import { NotifierService } from 'angular-notifier';


describe('IncluirFaqComponent', () => {
    let component: IncluirFaqComponent;
    let fixture: ComponentFixture<IncluirFaqComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IncluirFaqComponent],
            providers: [NotifierService],
            imports: [ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NotificationModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IncluirFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('consultarEmpresas', () => {
        expect(component).toBeTruthy();
        expect(component.consultarEmpresas()).toBeDefined();
    });

    it('consultarInstituicoes', () => {
        expect(component).toBeTruthy();
        expect(component.consultarInstituicoes()).toBeDefined();
    });
});
