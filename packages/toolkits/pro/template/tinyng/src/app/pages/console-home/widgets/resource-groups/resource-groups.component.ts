import { Component } from '@angular/core';
interface FocusResourceItem {
  endpointId?: string;
  name: string;
}

@Component({
  selector: 't-pro-resource-groups',
  templateUrl: './resource-groups.component.html',
  styleUrls: ['./resource-groups.component.scss'],
})
export class ResourceGroupsComponent {
  public resourceItems: Array<FocusResourceItem> = [
    {
      endpointId: 'ecs',
      name: 'consoleHome.resourceGroup.ecs',
    },
    {
      endpointId: 'as',
      name: 'consoleHome.resourceGroup.as',
    },
    {
      endpointId: 'elb',
      name: 'consoleHome.resourceGroup.elb',
    },
    {
      endpointId: 'bigdata',
      name: 'consoleHome.resourceGroup.bigdata',
    },
    {
      endpointId: 'rds',
      name: 'consoleHome.resourceGroup.rds',
    },
  ];

  public rencentServiceList: Array<FocusResourceItem> = [
    {
      endpointId: 'ecs',
      name: 'consoleHome.resourceGroup.ecs',
    },
    {
      endpointId: 'rds',
      name: 'consoleHome.resourceGroup.rds',
    },
  ];
}
