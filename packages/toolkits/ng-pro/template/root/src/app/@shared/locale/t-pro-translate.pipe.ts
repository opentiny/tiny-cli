import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'tProTranslate',
})
export class TProTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(items: any): any {
    const prop = ['label', 'text', 'displayName', 'title', 'name', 'time'];

    items.forEach((item: any) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (prop.includes(key)) {
            item[key] = this.translate.instant(item[key]);
          }
          if (item.options) {
            item.options.forEach((option: any) => {
              option.label = this.translate.instant(option.label);
            });
          }
        }
      }
    });
    return items;
  }
}
