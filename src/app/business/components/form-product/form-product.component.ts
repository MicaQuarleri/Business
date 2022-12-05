import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from '../../services/store.service';
import { ValidationsService } from '../../services/validations.service';
import { FormClientComponent } from '../form-client/form-client.component';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styles: [
  ]
})
export class FormProductComponent implements OnInit {

  formProduct: FormGroup = this.fb.group({
    sku: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0), Validators.pattern(this.validation.numberPattern)]],
    descount: [0, [Validators.min(0), Validators.pattern(this.validation.numberPattern)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(this.validation.numberPattern)]],
  })

  get idErrorMsg(): string {
    const errors = this.formProduct.get('sku')?.errors
    if (errors?.['required']) {
      return 'SKU is necessary'
    } else if (errors?.['skuExist']) {
      return 'The sku already exists'
    }
    return ''
  }

  constructor(
    private fb: FormBuilder,
    private validation: ValidationsService,
    private store: StoreService,
    public dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formProduct.reset({
      sku: this.data.product?.sku ? this.data.product.sku : '',
      description: this.data.product?.description ? this.data.product.description : "",
      price: this.data.product?.price ? this.data.product.price : "",
      descount: this.data.product?.descount ? this.data.product.descount : 0,
      stock: this.data.product?.stock ? this.data.product.stock : ""
    })
    if (this.data.action === "show") {
      this.formProduct.get('sku')?.disable();
      this.formProduct.get('description')?.disable();
      this.formProduct.get('price')?.disable();
      this.formProduct.get('descount')?.disable();
      this.formProduct.get('stock')?.disable();
    } else if (this.data.action === "edit") {
      this.formProduct.get('sku')?.disable();
    }
  }

  validateInput(value: string | number): boolean {
    return this.formProduct.controls[value].touched && this.formProduct.controls[value].invalid
  }

  save() {
    const product = {
      "sku": this.formProduct.controls['sku'].value,
      "description": this.formProduct.controls['description'].value,
      "price": this.formProduct.controls['price'].value,
      "descount": this.formProduct.controls['descount'].value ? this.formProduct.controls['descount'].value : 0,
      "stock": this.formProduct.controls['stock'].value,
      "id":this.data.product?.id
    }
    switch (this.data.action) {
      case "add":
        this.store.createProduct(product);
        break;
      case "edit":
        this.store.updateProduct(product);
        break;
    }
    this.formProduct.reset()
  }

}
