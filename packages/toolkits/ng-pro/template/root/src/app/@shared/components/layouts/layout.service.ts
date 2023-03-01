import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TProLayoutConfig } from './layout.type';
import { DEFAULT_LAYOUT_CONFIG } from './default-layout.config';

@Injectable({
  providedIn: 'root',
})
export class TProLayoutService {
  private _config: TProLayoutConfig = DEFAULT_LAYOUT_CONFIG;
  private layoutSubject = new ReplaySubject<TProLayoutConfig>(1);

  constructor() {
    const layoutConfig = localStorage.getItem('t-pro-layout');
    if (layoutConfig) {
      this._config = JSON.parse(layoutConfig);
    }
    this.layoutSubject.next(this._config);
  }

  getLayoutConfig() {
    return this.layoutSubject.asObservable();
  }

  updateLayoutConfig(config: TProLayoutConfig) {
    localStorage.setItem('t-pro-layout', JSON.stringify(config));
    this.layoutSubject.next(config);
  }
}
