import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-reactive-forms.html',
})
export class ButtongroupReactiveFormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  buttonGroupForm: FormGroup;
  items: Array<TiButtonItem> = [
    {
      text: '1G',
      disabled: true,
    },
    {
      text: '2G',
    },
    {
      text: '3G',
    },
    {
      text: '4G',
    },
  ];

  ngOnInit(): void {
    this.buttonGroupForm = this.fb.group({
      selected: this.items[1],
    });
  }
}
