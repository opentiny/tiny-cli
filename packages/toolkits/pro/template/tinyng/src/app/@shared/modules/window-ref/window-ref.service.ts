import { ElementRef, Injectable } from '@angular/core';
import { TProBaseDocumentRef } from './document-ref.service';

@Injectable()
export class TProBaseWindowRef {

  constructor(private documentRef: TProBaseDocumentRef) {
  }

  get window(): Window | null {
    return this.document.defaultView;
  }

  get document(): any {
    return this.documentRef.document;
  }

  get pageXOffset() {
    return this.window && this.window.pageXOffset;
  }

  get pageYOffset() {
    return this.window && this.window.pageYOffset;
  }

  get innerHeight() {
    return this.window && this.window.innerHeight;
  }

  get innerWidth() {
    return this.window && this.window.innerWidth;
  }

  getComputedStyle(element: any) {
    return this.window && this.window.getComputedStyle(element);
  }

  getBoundingClientRect(elementRef: ElementRef) {
    return elementRef.nativeElement && elementRef.nativeElement.getBoundingClientRect();
  }

}
