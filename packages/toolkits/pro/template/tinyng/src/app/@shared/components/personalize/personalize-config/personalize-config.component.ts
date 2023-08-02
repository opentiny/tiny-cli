import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';
import { PersonalizeComponent } from '@shared/tiny-pro';
import { PersonalizeService } from '@core/personalize';

@Component({
  selector: 't-pro-personalize-config',
  templateUrl: './personalize-config.component.html',
  styleUrls: ['./personalize-config.component.scss'],
})
export class PersonalizeConfigComponent {
  constructor(
    private tiModal: TiModalService,
    private personalizeService: PersonalizeService
  ) {}
  ngOnInit() {
    this.personalizeService.changeTheme('tiny-hws-theme');
  }
  
  personalizeConfig() {

    this.tiModal.open(PersonalizeComponent, {
      id: 'theme',
      close: (): void => {},
      // modalClass接口：接收弹窗的自定义样式
      modalClass: 'modal-class-personalize'
    });
  }
}
