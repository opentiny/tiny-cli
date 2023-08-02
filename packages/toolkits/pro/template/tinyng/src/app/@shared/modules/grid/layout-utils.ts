import { ElementRef, Renderer2 } from '@angular/core';
import { TProBaseBreakpoint, TProBaseBreakpoints, TProBaseResponseParameter } from './layout.types';

function isResponseValue(value: TProBaseResponseParameter<any>) {
  let flag = false;
  if (typeof value === 'object') {
    TProBaseBreakpoints.forEach((point) => {
      if (value[point]) {
        flag = true;
      }
    });
  }
  return flag;
}

function runResponse(value: TProBaseResponseParameter<any>, func: (point: TProBaseBreakpoint, value: any) => void) {
  if (value || value === 0) {
    if (isResponseValue(value)) {
      TProBaseBreakpoints.forEach((point) => {
        if (value[point] || value[point] === 0) {
          func(point, value[point]);
        }
      });
    } else {
      func('ss', value); // 全局生效
    }
  }
}

function getDSpanClass(point: TProBaseBreakpoint, value: number | 'auto'): string {
  const classType = value === 0 ? 'd' : 'col';
  const classValue = value === 0 ? 'none' : value;

  return point ? `${classType}-${point}-${classValue}` : `${classType}-${classValue}`;
}

function transPoint(point: TProBaseBreakpoint) {
  if (point === 'ss') {
    return null;
  }

  return point;
}

function pointAndValueMapToClassName(paramName: string, classList: Array<string>, point: TProBaseBreakpoint, value: any) {
  const finalPonit = transPoint(point);

  const classPrefixMap: { [key: string]: any } = {
    tProBaseOffset: 'offset-',
    tProBaseAlign: 'align-items-',
    tProBaseJustify: 'justify-content-',
    tProBaseAlignSelf: 'align-self-',
    tProBaseOrder: 'order-',
    tProBaseSpan: getDSpanClass,
    tProBaseCols: 'row-cols-',
  };

  if (typeof classPrefixMap[paramName] === 'string') {
    classList.push(finalPonit ? `${classPrefixMap[paramName]}${finalPonit}-${value}` : `${classPrefixMap[paramName]}${value}`);
  } else if (typeof classPrefixMap[paramName] === 'function') {
    classList.push(classPrefixMap[paramName](finalPonit, value));
  }
}

export function updateClassList(context: any, elementRef: ElementRef, renderer: Renderer2) {
  /**
   * [tProBaseCols]作用在t-pro-base-row
   * [tProBaseSpan]、[tProBaseOffset]作用在t-pro-base-col
   * [tProBaseAlign]、[tProBaseJustify]、[tProBaseAlignSelf]、[tProBaseOrder]作用在[tProBaseFlex]
   */
  const classParamsName = ['tProBaseCols', 'tProBaseSpan', 'tProBaseOffset', 'tProBaseAlign', 'tProBaseJustify', 'tProBaseAlignSelf', 'tProBaseOrder'];

  const tempClassList: Array<string> = [];
  classParamsName.forEach((paramName) => {
    if (context[paramName] || context[paramName] === 0) {
      runResponse(context[paramName], pointAndValueMapToClassName.bind(context, paramName, tempClassList));
    }
  });

  if (context.classList) {
    context.classList.forEach((className: string) => {
      renderer.removeClass(elementRef.nativeElement, className);
    });
  }

  context.classList = tempClassList;
  context.classList.forEach((className: string) => {
    renderer.addClass(elementRef.nativeElement, className);
  });
}
