import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';
import { PersonalizeComponent } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-personalize-config',
  templateUrl: './personalize-config.component.html',
  styleUrls: ['./personalize-config.component.scss'],
})
export class PersonalizeConfigComponent {
  constructor(private tiModal: TiModalService) {}

  personalizeConfig() {
    this.tiModal.open(PersonalizeComponent, {
      id: 'theme',
      close: (): void => {},
    });
  }
}
