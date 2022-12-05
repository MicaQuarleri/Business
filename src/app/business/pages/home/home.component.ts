import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalActionComponent } from '../../components/modal-action/modal-action.component';
import { Product } from '../../interfaces/produc';
import { StoreService } from '../../services/store.service';
import { ModalAccountComponent } from '../../components/modal-account/modal-account.component';
import { FormClientComponent } from '../../components/form-client/form-client.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  errors: string[] = [];
  products = this.store.productsSubject;
  properties = ["sku", "description", "creditCardPrice", "cashPrice","delete"];
  productsSelected:any[] = [];
  totalCashSale=0;
  totalCardSale=0;

  @ViewChild(MatTable) table!: MatTable<any[]>;

  constructor(private store: StoreService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.loadProducts()
  }

  findProduct(sku:string){
    const product=this.products.value.filter((product:Product)=>product.sku===sku)
    if (product.length===0){
      this.errors=["The Sku doesn´t exist"]
      this.openErrors()
    } else {
      this.productsSelected.push(product[0])
      this.totalCardSale+=product[0].price;
      this.totalCashSale+=product[0].descount? product[0].price*(100-product[0].descount)/100: product[0].price
      this.table.renderRows()
    }
  }

  delete(index:number,cardPrice:number,cashPrice:number){
    this.productsSelected.splice(index,1)
    this.totalCashSale-=cashPrice
    this.totalCardSale-=cardPrice;
    this.table.renderRows()
  }

  openErrors() {
    this.dialog.open(ModalActionComponent, {
      width: '400px',
      data: { errors: this.errors },
    });
  }

  sale(){
    this.productsSelected=[];
    this.totalCardSale=0;
    this.totalCashSale=0;
  }

  accountSale(){
    const dialogRef = this.dialog.open(ModalAccountComponent, {
      width: '400px',
      data: { totalSale: this.totalCardSale},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.clientExist && result.dni){
        this.productsSelected=[];
        this.totalCardSale=0;
        this.totalCashSale=0;
      } else if (!result.clientExist && result.dni){
          this.openClientForm(result.dni,"add")
          this.productsSelected=[];
          this.totalCardSale=0;
          this.totalCashSale=0;
      } else {
        console.log("close")
      }
    });
  }

  openClientForm(dni: string , action: string) {
    const client={dni:dni,debt:this.totalCardSale}
    const dialogRef = this.dialog.open(FormClientComponent, {
      width: '400px',
      data: { action: action, client: client },
    });
  }
}
