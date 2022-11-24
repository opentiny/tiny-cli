import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/tiny-pro';
import { ResourceGroupsComponent } from './widgets/resource-groups/resource-groups.component';
import { ConsoleHomeComponent } from './console-home.component';
import { UserInfoComponent } from './widgets/user-info/user-info.component';
import { UserInfoHeadComponent } from './widgets/user-info/user-info-head/user-info-head.component';
import { UserInfoPanelComponent } from './widgets/user-info/user-info-panel/user-info-panel.component';
import { MarketplaceComponent } from './widgets/marketplace/marketplace.component';
import { MarketplaceAllSvgComponent } from './widgets/marketplace/marketplace-all-svg/marketplace-all-svg.component';
import { SideAdvertiseComponent } from './widgets/side-advertise/side-advertise.component';
import { SideAnnouncementComponent } from './widgets/side-announcement/side-announcement.component';
import { BeginnerGuideComponent } from './widgets/beginner-guide/beginner-guide.component';

@NgModule({
  declarations: [
    ConsoleHomeComponent,
    ResourceGroupsComponent,
    UserInfoComponent,
    UserInfoHeadComponent,
    UserInfoPanelComponent,
    MarketplaceComponent,
    MarketplaceAllSvgComponent,
    SideAdvertiseComponent,
    SideAnnouncementComponent,
    BeginnerGuideComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ConsoleHomeModule {}
