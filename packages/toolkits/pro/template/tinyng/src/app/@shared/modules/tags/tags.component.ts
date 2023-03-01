import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ITProBaseTagMode } from './tag.component';

@Component({
  selector: 't-pro-base-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  exportAs: 'TProBaseTags',
  preserveWhitespaces: false,
})
export class TProBaseTagsComponent {
  /**
   * 【必选】记录输入的标签
   */
  @Input() tags: Array<any> = [];
  /**
   * 【可选】使用的属性名
   */
  @Input() displayProperty = '';

  /**
   * @deprecated
   */
  @Input() deletable = false;

  @Input() mode: ITProBaseTagMode = 'default';

  @Input() titleProperty = '';

  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter<any>();

  removeTag($event: any, tag: any, index: number) {
    this.tagDelete.emit({ tag: tag, index: index, event: $event });
  }
}
