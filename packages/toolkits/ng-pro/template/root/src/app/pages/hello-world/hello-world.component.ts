import { Component, OnInit } from '@angular/core';
import { HwcClient } from '@opentiny/hwc-client';

@Component({
  selector: 't-pro-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {
  text: string | undefined = '';

  async ngOnInit(): Promise<void> {
    const res = await HwcClient.apigClient.exec('group_hello_world', 'apig_hello_world', {});

    this.text = await res?.text();
  }
}
