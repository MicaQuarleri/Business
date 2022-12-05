import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-action',
  templateUrl: './modal-action.component.html',
  styles: [
  ]
})
export class ModalActionComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

}
