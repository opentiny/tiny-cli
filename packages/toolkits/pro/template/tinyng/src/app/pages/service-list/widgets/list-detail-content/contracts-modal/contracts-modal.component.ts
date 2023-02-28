import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TiValidators } from '@opentiny/ng';
import { TranslateService } from '@ngx-translate/core';
import { ContractsService } from 'src/app/@core/services/contracts.service';

@Component({
  selector: 't-pro-contracts-modal',
  templateUrl: './contracts-modal.component.html',
  styleUrls: ['./contracts-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractsModalComponent {
  @Input() operation: string = 'create';
  @Input() rowData: any;
  @Output() closeModal = new EventEmitter();
  @Output() openAlert = new EventEmitter();
  @Output() refreshTable = new EventEmitter();
  serviceForm: FormGroup;

  constructor(private translate: TranslateService, private contractsService: ContractsService, fb: FormBuilder, private elementRef: ElementRef) {
    this.serviceForm = fb.group({
      nameInput: new FormControl('', [TiValidators.required, this.nameValidation()]),
      customerInput: new FormControl(''),
      descInput: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['operation']?.currentValue == 'create') {
      this.serviceForm.controls.nameInput.setValue('');
      this.serviceForm.controls.customerInput.setValue('');
      this.serviceForm.controls.descInput.setValue('');
    }

    if (changes['rowData']) {
      this.serviceForm.controls.nameInput.setValue(this.rowData ? this.rowData.row.name : '');
      this.serviceForm.controls.customerInput.setValue(this.rowData ? this.rowData.row.customer : '');
      this.serviceForm.controls.descInput.setValue(this.rowData ? this.rowData.row.description : '');
    }
  }

  nameValidation = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ? control.value.trim() : control.value;
      let tiErrorMessage = '';
      const nameRe = /^([a-zA-Z0-9]|[\u4e00-\u9fa5])([a-zA-Z0-9._:()（）、：\/-]|[\u4e00-\u9fa5]){2,254}$/;
      if (!nameRe.test(value)) {
        tiErrorMessage = this.translate.instant('serviceList.contracts.modal.nameFormat');
      } else {
        return null;
      }

      return {
        nameValidation: {
          actualValue: control.value,
          tiErrorMessage: tiErrorMessage,
        },
      };
    };
  };

  testValidation() {
    let isValid = true;
    const errors: ValidationErrors | null = TiValidators.check(this.serviceForm);
    if (errors) {
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[formControlName=${firstError}]`).focus();
      isValid = false;
    }

    return isValid;
  }

  async createContract() {
    const serviceParam = {
      name: this.serviceForm.controls.nameInput.value,
      customer: this.serviceForm.controls.customerInput.value,
      description: this.serviceForm.controls.descInput.value,
    };

    const result = await this.contractsService.createContracts(serviceParam);

    if (result) {
      this.refreshTable.emit();
      this.closeModal.emit();
      this.openAlert.emit();
    }
  }

  async editContract() {
    const serviceParam = {
      id: this.rowData.row.id,
      name: this.serviceForm.controls.nameInput.value,
      customer: this.serviceForm.controls.customerInput.value,
      description: this.serviceForm.controls.descInput.value,
    };

    const result = await this.contractsService.editContracts(serviceParam);

    if (result) {
      this.refreshTable.emit();
      this.closeModal.emit();
      this.openAlert.emit();
    }
  }

  operateContract(): void {
    if (!this.testValidation()) {
      return;
    }

    if (this.operation === 'edit') {
      this.editContract();
    }

    if (this.operation === 'create') {
      this.createContract();
    }
  }

  cancel() {
    this.closeModal.emit();
  }
}
