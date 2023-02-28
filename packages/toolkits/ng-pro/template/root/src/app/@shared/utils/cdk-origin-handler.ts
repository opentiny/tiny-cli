import { ElementRef } from '@angular/core';

export function formWithDropDown(ele: ElementRef): ElementRef['nativeElement'] {
  if (ele) {
    if (!ele.nativeElement.classList.contains('t-pro-base-dropdown-origin')) {
      const parentEle = ele.nativeElement.parentElement;
      if (parentEle && parentEle.classList.contains('t-pro-base-dropdown-origin')) {
        return ele.nativeElement.parentElement;
      } else {
        return;
      }
    } else {
      return ele.nativeElement;
    }
  }
}

export function addClassToOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && !originEle.classList.contains('t-pro-base-dropdown-origin-open')) {
    originEle.classList.add('t-pro-base-dropdown-origin-open');
  }
}

export function removeClassFromOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && originEle.classList.contains('t-pro-base-dropdown-origin-open')) {
    originEle.classList.remove('t-pro-base-dropdown-origin-open');
  }
}
