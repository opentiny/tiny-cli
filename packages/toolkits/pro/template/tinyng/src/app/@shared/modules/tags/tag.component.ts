import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

export type ITProBaseTagMode = 'default' | 'checkable' | 'closeable';

@Component({
  selector: 't-pro-base-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  exportAs: 'TProBaseTag',
  preserveWhitespaces: false,
})
export class TProBaseTagComponent {
  /**
   * 【必选】记录输入的标签
   */
  @Input() tag: string;

  @Input() labelStyle = '';

  @Input() customColor = '';

  // @deprecated
  @Input() deletable = false;

  @Input() titleContent: string;

  @Input() mode: ITProBaseTagMode = 'default';

  @Input() checked = false;

  @Input() customViewTemplate: TemplateRef<any>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter<any>();

  @Output() checkedChange = new EventEmitter<boolean>();

  deleteTag = false;

  colorMap = {
    'blue-w98': '#3383ff',
    'aqua-w98': '#39afcc',
    'olivine-w98': '#2fa898',
    'green-w98': '#4eb15e',
    'yellow-w98': '#b08d1a',
    'orange-w98': '#d47f35',
    'red-w98': '#f66f6a',
    'pink-w98': '#f3689a',
    'purple-w98': '#a97af8',
  };

  get isColorfulTag(): boolean {
    // eslint-disable-next-line no-undef
    return !!(this.colorMap[this.labelStyle as keyof typeof this.colorMap] || (this.customColor && this.customColor !== ''));
  }

  removeTag($event: any, tag: any) {
    this.deleteTag = true;
    this.tagDelete.emit({ tag: tag, event: $event });
  }

  getColor(): string {
    // eslint-disable-next-line no-undef
    return this.colorMap[this.labelStyle as keyof typeof this.colorMap] || this.customColor;
  }

  tagClick() {
    if (this.mode === 'checkable') {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
