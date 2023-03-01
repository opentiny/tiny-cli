import { Component, Input } from '@angular/core';

@Component({
  selector: 't-pro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() shrink: boolean = false;
}
