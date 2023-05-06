import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { TProBaseGlobalConfig, TProBaseGlobalConfigKey, TProBaseGlobalConfigToken, TProBaseGlobalInsideConfigKey } from './config';

const isDefined = function (value?: any): boolean {
  return value !== undefined;
};
@Injectable({
  providedIn: 'root',
})
export class DevConfigService {
  private configUpdated$ = new Subject<keyof TProBaseGlobalConfig>();
  private config: TProBaseGlobalConfig;
  constructor(@Optional() @Inject(TProBaseGlobalConfigToken) defaultConfig?: TProBaseGlobalConfig) {
    this.config = defaultConfig || {};
  }
  getConfigForComponent<T extends TProBaseGlobalConfigKey>(componentName: T): TProBaseGlobalConfig[T] {
    return this.config[componentName];
  }
  getConfigForApi<T extends TProBaseGlobalInsideConfigKey>(api: T): TProBaseGlobalConfig['global'][T] {
    const globalConfig = this.config['global'] || {};
    const apiConfig = globalConfig[api];
    return apiConfig;
  }
  getConfigChangeEventForComponent(componentName: TProBaseGlobalConfigKey): Observable<void> {
    return this.configUpdated$.pipe(
      filter((n) => n === componentName),
      mapTo(undefined)
    );
  }
  set<T extends TProBaseGlobalConfigKey>(componentName: T, value: TProBaseGlobalConfig[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
    this.configUpdated$.next(componentName);
  }
}

export function WithConfig<T>(propertyKey?: T | string) {
  return function ConfigDecorator(target: any, propName: any, originalDescriptor?: TypedPropertyDescriptor<T>): any {
    const privatePropName = `$$__assignedValue__${propName}`;
    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by withConfig decorator.`);
    }
    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
      enumerable: false,
    });
    return {
      get(): T | undefined {
        const originalValue = originalDescriptor?.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
        const assignedByUser = ((this.assignmentCount || {})[propName] || 0) > 1;
        if (assignedByUser && isDefined(originalValue)) {
          return originalValue;
        }
        if (JSON.stringify(this.devConfigService.config) === '{}') {
          return originalValue;
        }

        let name = this.constructor.name;
        name = name.replace('Directive', '');
        name = name.replace('Component', '');
        name = name.toLowerCase();

        const componentConfig = this.devConfigService.config[name] || {};
        const configValue = componentConfig[propName];
        const globalConfig = this.devConfigService.config['global'] || {};
        const apiConfig = globalConfig[propName];
        const ret = isDefined(configValue) ? configValue : isDefined(apiConfig) ? apiConfig : originalValue;
        return ret;
      },
      set(value?: T): void {
        this.assignmentCount = this.assignmentCount || {};
        this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(value as any);
        }
        this[privatePropName] = value;
      },
      configurable: true,
      enumerable: true,
    };
  };
}
