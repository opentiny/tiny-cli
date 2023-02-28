import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
export class filterInterface {
  type: '' | undefined;
  value: '' | undefined;
}
 
@Injectable({
  providedIn: 'root',
})
export class Filter {
  defaultFilter: filterInterface = { type: '', value: '' };
  FilterEventer: EventEmitter<filterInterface> = new EventEmitter();
  constructor() {}
}