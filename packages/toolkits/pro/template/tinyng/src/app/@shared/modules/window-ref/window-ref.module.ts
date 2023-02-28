import { NgModule } from '@angular/core';
import { TProBaseDocumentRef } from './document-ref.service';
import { TProBaseWindowRef } from './window-ref.service';

@NgModule({
  providers: [
    TProBaseWindowRef,
    TProBaseDocumentRef,
  ],
})
export class TProBaseWindowRefModule {
}
