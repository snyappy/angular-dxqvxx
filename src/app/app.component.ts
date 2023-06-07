import { Component } from '@angular/core';
import {
  WindowService,
  WindowRef,
  WindowCloseResult,
} from '@progress/kendo-angular-dialog';

import { FormComponent } from './form.component';

@Component({
  selector: 'my-app',
  template: `
        <button *ngIf="isBtnVisible"
            kendoButton themeColor="primary"
            (click)="openWindow()"
        >
            Open window
        </button>

        <div kendoWindowContainer></div>
    `,
})
export class AppComponent {
  public isBtnVisible = true;

  constructor(private windowService: WindowService) {}

  public openWindow(): void {
    const windowRef: WindowRef = this.windowService.open({
      title: 'Custom window',
      content: FormComponent,
      width: 350,
      height: 350,
      preventClose: (ev, window) => {

        console.log('prevent close not triggered!');

        const myForm = window.content.instance.myForm;
        if (!myForm.valid) {
          myForm.get('name').markAsTouched();
        }
        return !myForm.valid;
      },
    });

    // windowRef.result.subscribe((result) => {
     // will be triggerd by windowRef.close() 
    //   this.isBtnVisible = true;
    //   if (result instanceof WindowCloseResult) {
    //     console.log('WindowCloseResult', result);
    //   }
    // });

    // windowRef.content.instance.submitForm.subscribe((formData) => {
    // will be triggerd by windowRef.close() 
    //   windowRef.close();
    // });

    this.isBtnVisible = false;
  }
}
