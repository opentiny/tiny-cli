import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 't-pro-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
})
export class HeaderLogoComponent implements OnInit {
  @Input() shrink = false;
  @Input() config: any = {
    id: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
