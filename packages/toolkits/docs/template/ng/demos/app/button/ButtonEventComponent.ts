import { Component } from '@angular/core';

@Component({
  templateUrl: './button-event.html',
})
export class ButtonEventComponent {
  myLogs: Array<string> = [];
  onClick(event: MouseEvent): void {
    this.myLogs = [...this.myLogs, `onClick() event = ${event.type}`];
  }
}
