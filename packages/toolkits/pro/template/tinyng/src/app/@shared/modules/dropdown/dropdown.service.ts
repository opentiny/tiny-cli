import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TProBaseDropDownDirective } from './dropdown.directive';

@Injectable()
export class TProBaseDropDownService {
  private openScope: TProBaseDropDownDirective | null;
  private documentClickTimeOut: any = null;
  private closeDropdownBind: any = this.closeDropdown.bind(this);
  document: Document;
  constructor(@Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  public open(dropdownScope: TProBaseDropDownDirective) {
    if (!this.openScope) {
      // 延时绑定document事件，防止事件冒泡导致立即触发
      this.documentClickTimeOut = setTimeout(() => {
        this.document.addEventListener('click', this.closeDropdownBind);
      });
    }
    this.openScope = dropdownScope;
  }

  public close(dropdownScope: TProBaseDropDownDirective) {
    if (this.openScope !== dropdownScope) {
      return;
    }
    this.openScope = null;
    clearTimeout(this.documentClickTimeOut);
    this.document.removeEventListener('click', this.closeDropdownBind);
  }

  private closeDropdown(event: MouseEvent): void {
    if (!this.openScope) {
      return;
    }
    const menuEl = this.openScope.menuEl?.nativeElement;
    if (
      event &&
      this.openScope.menuEl &&
      ((/input|textarea/i.test((<any>event.target).tagName) && menuEl.contains(event.target)) ||
        this.openScope.closeScope === 'none' ||
        (menuEl.contains(event.target) && this.openScope.closeScope === 'blank') ||
        this.openScope.dropdownChildren.some((children) => children.toggleEl.nativeElement.contains(event.target)))
    ) {
      return;
    }
    this.openScope.isOpen = false;
  }
}
