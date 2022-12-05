import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { ModalActionComponent } from '../../components/modal-action/modal-action.component';
import { Product } from '../../interfaces/produc';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  properties = ["sku", "description", "creditCardPrice", "cashPrice", "descount", "stock", "edit", "show"]
  loading$ = this.store.loading$
  products$ = this.store.getProducts()
  errors: string[] = []

  constructor(private store: StoreService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.loadProducts()
  }

  filter(value: string) {
    this.store.setValueFilter(value)
  }

  clickAction(action: string) {
    if (action === "export") {
      this.store.exportProducts("products")
    } else if (action === "import") {
      this.store.importProducts()
      this.store.loadProducts()
      this.errors = this.store.errors
      if (this.errors.length > 0) {
        this.openErrors()
        this.store.loadProducts()
      } else {
        this.store.loadProducts()
      }
    } else {
      this.openForm(null, 'add')
      this.store.loadProducts()
    }
  }

  openForm(product: Product | null, action: string) {
    const dialogRef = this.dialog.open(FormProductComponent, {
      width: '400px',
      data: { action: action, product: product },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.loadProducts()
      }
    });
  }

  openErrors() {
    this.dialog.open(ModalActionComponent, {
      width: '400px',
      data: { errors: this.errors },
    });
  }
}
