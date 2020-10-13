import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';



@NgModule({
  declarations: [],
  imports: [
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        }
      }
    })
  ],
  exports : [
    NotifierModule
  ]
})
export class NotificationModule { }
