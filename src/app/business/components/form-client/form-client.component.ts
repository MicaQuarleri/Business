import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationsService } from '../../services/validations.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styles: [
  ]
})
export class FormClientComponent implements OnInit {

  formClient: FormGroup = this.fb.group({
    dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validation.numberPattern)]],
    name: ['', [Validators.required, Validators.pattern(this.validation.letterPattern)]],
    surname: ['', [Validators.required, Validators.pattern(this.validation.letterPattern)]],
    email: ['', [Validators.pattern(this.validation.emailPattern)]],
    cellphone: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validation.numberPattern)]],
    debt: [0],
    payment: [0, [Validators.min(0)]]
  })

  constructor(
    private fb: FormBuilder,
    private validation: ValidationsService,
    private store: StoreService,
    public dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formClient.reset({
      dni: this.data.client?.dni ? this.data.client.dni : '',
      name: this.data.client?.name ? this.data.client.name : "",
      surname: this.data.client?.surname ? this.data.client.surname : "",
      email: this.data.client?.email ? this.data.client.email : "",
      cellphone: this.data.client?.cellphone ? this.data.client.cellphone : "",
      debt: this.data.client?.debt ? this.data.client.debt : 0,
      payment: this.data.client?.payment ? this.data.client.payment : 0
    })
    if (this.data.action === "show") {
      this.formClient.get('dni')?.disable();
      this.formClient.get('name')?.disable();
      this.formClient.get('surname')?.disable();
      this.formClient.get('email')?.disable();
      this.formClient.get('cellphone')?.disable();
      this.formClient.get('debt')?.disable();
      this.formClient.get('payment')?.disable();
    } else if (this.data.action === "edit") {
      this.formClient.get('dni')?.disable();
      this.formClient.get('debt')?.disable();
    }
  }

  validateInput(value: string | number): boolean {
    return this.formClient.controls[value].touched && this.formClient.controls[value].invalid
  }

  save() {
    const client = {
      "id": this.data.client?.id ? this.data?.client.id : '',
      "dni": this.formClient.controls['dni'].value,
      "name": this.formClient.controls['name'].value,
      "surname": this.formClient.controls['surname'].value,
      "email": this.formClient.controls['email'].value,
      "cellphone": this.formClient.controls['cellphone'].value,
      "debt": this.formClient.controls['debt'].value,
      "payment": this.formClient.controls['payment'].value,
    }
    switch (this.data.action) {
      case "add":
        this.store.createClient(client);
        break;
      case "edit":
        this.store.updateClient(client);
        break;
    }
    this.formClient.reset()
  }

}
