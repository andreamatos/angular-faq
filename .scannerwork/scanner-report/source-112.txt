import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationModule } from 'src/app/shared/provider/notification/notification.module';
import { NotifierService } from 'angular-notifier';
import { ConsultarFaqComponent } from './consultar-faq.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('ConsultarFaqComponent', () => {
    let component: ConsultarFaqComponent;
    let fixture: ComponentFixture<ConsultarFaqComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConsultarFaqComponent],
            
            providers: [NotifierService],
            
            imports: [ReactiveFormsModule, 
                      HttpClientModule, 
                      HttpClientTestingModule, 
                      NotificationModule, RouterTestingModule, FormsModule]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsultarFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('buscarListaFaq', () => {
        expect(component).toBeTruthy();
        expect(component.buscarListaFaq()).toBeDefined();
    });

    it('ngOnInit', () => {
        expect(component).toBeTruthy();
        expect(component.ngOnInit()).toBeDefined();
    });
    
});
