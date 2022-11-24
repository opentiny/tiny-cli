import { NgModule } from '@angular/core';
import { SharedModule, TProLayoutModule, TProTranslatePipe } from '@shared/tiny-pro';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ConsoleHomeModule } from './console-home/console-home.module';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractsService } from './contracts/contracts.service';
@NgModule({
  imports: [PagesRoutingModule, SharedModule, TProLayoutModule, ConsoleHomeModule],
  declarations: [PagesComponent, HelloWorldComponent, ContractsComponent],
  providers: [TProTranslatePipe, ContractsService]
})
export class PagesModule {}
