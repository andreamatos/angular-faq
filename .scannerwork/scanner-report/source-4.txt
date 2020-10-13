import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './system/components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationModule } from './shared/provider/notification/notification.module';
import { AppService } from './shared/provider/services/app.service';
import { AuthGuard } from './shared/provider/guards/auth.guard';
import { TokenService } from './shared/provider/services/token.service';
import { Global } from './shared/provider/model/global';
import { AuthInterceptorService } from './shared/provider/services/auth-interceptor.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    ModalModule.forRoot()
 ],
  providers: [
    AppService, 
    AuthGuard,
    TokenService,
    Global,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
