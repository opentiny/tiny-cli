import { Component, OnInit } from '@angular/core';
import { TiHalfmodalService } from '@opentiny/ng';
import { SideSettingsComponent } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-multi-settings',
  templateUrl: './multi-settings.component.html',
  styleUrls: ['./multi-settings.component.scss'],
})
export class MultiSettingsComponent implements OnInit {
  constructor(private tiHalfmodalservice: TiHalfmodalService) {}

  ngOnInit(): void {}

  openSettingDrawer() {
    this.tiHalfmodalservice.open(SideSettingsComponent, {
      backdrop: true,
      closeIcon: true,
      clientRectTop: '0',
      width: '310px',
    });
  }
}
