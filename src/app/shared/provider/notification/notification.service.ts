import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) {}

  public publishMessageOfSuccess(msg: string): void {
    this.notifierService.notify('success', msg);
  }

  public publishMessageOfWarning(msg: string): void {
    this.notifierService.notify('warning', msg);
  }

  public publishMessageOfInfo(msg: string): void {
    this.notifierService.notify('info', msg);
  }

  public publishMessageOfError(msg: string): void {
    this.notifierService.notify('error', msg);
  }

  public publishMessageOfDefault(msg: string): void {
    this.notifierService.notify('default', msg);
  }
}
