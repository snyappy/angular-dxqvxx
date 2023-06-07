import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  WindowService,
  WindowRef,
  WindowCloseResult,
} from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-custom-window',
  template: `
        <form class="k-form" [formGroup]="myForm">
            <fieldset class="k-form-fieldset">
            <legend class="k-form-legend">User Information</legend>
                <kendo-formfield>
                    <label for="name">Name*</label>
                    <input id="name" formControlName="name" kendoTextBox />
                    <kendo-formerror>Error: Name is required</kendo-formerror>
                </kendo-formfield>
                <kendo-formfield>
                    <label for="age">Age</label>
                    <input id="age" formControlName="age" type="number" kendoTextBox />
                </kendo-formfield>
            </fieldset>
        </form>

        <button kendoButton
          (click)="onConfirmAction()"
          themeColor="primary"
          [disabled]="!myForm.valid"
          style="margin-top:30px"
        >
            Submit
        </button>
    `,
})
export class FormComponent {
  @Input() public set age(value: number) {
    this.myForm.controls.age.setValue(value);
    this._age = value;
  }

  public get age(): number {
    return this._age;
  }

  @Input() public set name(value: string) {
    this.myForm.controls.name.setValue(value);
    this._name = value;
  }

  public get name(): string {
    return this._name;
  }

  @Output() public submitForm: EventEmitter<FormGroup> = new EventEmitter();

  public myForm: FormGroup = this.fb.group({
    age: [this.age],
    name: [this.name, Validators.required],
  });

  private _age: number;
  private _name: string;

  constructor(private fb: FormBuilder, private windowRef: WindowRef) {}

  public onConfirmAction(): void {
    // window close should not check preventClose

    this.windowRef.close();
  }
}
