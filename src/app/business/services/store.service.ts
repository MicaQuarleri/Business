import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable } from 'rxjs';
import { ManageInfoService } from './manage-info.service';
import { ClientsService } from './clients.service';
import { Client } from '../interfaces/client';
import { Product } from '../interfaces/produc';
import { ProductsService } from './products.service';
import { ValidationsService } from './validations.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private data: any;
  public errors: string[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private valueFilter = new BehaviorSubject<string>("");

  public clientsSubject = new BehaviorSubject<Client[]>([]);
  public productsSubject = new BehaviorSubject<Product[] | []>([]);


  public loading$ = this.loadingSubject.asObservable()
  public clients$ = this.clientsSubject.asObservable()
  public products$ = this.productsSubject.asObservable()

  constructor(private manageInfoService: ManageInfoService, private clientsService: ClientsService, private productsService: ProductsService, private validation: ValidationsService) { }

  public importData(data: any) {
    this.loadingSubject.next(true)
    this.manageInfoService.importData(data).subscribe(data => {
      this.data = data
      this.loadingSubject.next(false)
    })
  }

  //Setters

  public setValueFilter(value: string) {
    this.valueFilter.next(value)
  }

  //Getters

  public getClients(): Observable<Client[]> {
    return combineLatest([this.clients$, this.getValue()]).pipe(
      map(([clients, value]) => this.filterClients(clients, value))
    )
  }

  public getProducts(): Observable<Product[]> {
    return combineLatest([this.products$, this.getValue()]).pipe(
      map(([products, value]) => this.filterProducts(products, value))
    )
  }

  private getValue(): Observable<string> {
    return this.valueFilter.asObservable()
  }

  //Functions

  //Clients

  public loadClients() {
    this.loadingSubject.next(true)
    this.clientsService.getClients().subscribe(clients => {
      this.clientsSubject.next(clients)
      this.loadingSubject.next(false)
    })
  }

  public createClient(client: Client) {
    this.loadingSubject.next(true)
    this.clientsService.creatClient(client).subscribe(() => this.loadingSubject.next(false))
  }

  public updateClient(client: Client) {
    this.loadingSubject.next(true)
    this.clientsService.updateClient(client).subscribe(() => this.loadingSubject.next(false))
  }

  private filterClients(clients: Client[], value: string): Client[] {
    const clientsFiltered = clients.filter(client => {
      return client.dni.toLowerCase().includes(value) || client.name.toLowerCase().includes(value) || client.surname.toLowerCase().includes(value)
    })
    return clientsFiltered
  }

  public exportClients(item: string) {
    this.manageInfoService.export(this.clientsSubject.value, item)
  }

  public importClients() {
    const errors: string[] = this.validation.validateImportDataClients(this.data)
    if (errors.length > 0) {
      this.errors = errors
    } else {
      const newData = this.data.filter((data: any) => (this.findClientData(data, "new")))
      const updateData = this.data.filter((data: any) => (this.findClientData(data, "update")))
      for (let i = 0; i < newData.length; i++) {
        this.loadingSubject.next(true)
        this.clientsService.creatClient(newData[i]).subscribe(() => this.loadingSubject.next(false))
      }
      const errors = this.validation.validateUpdateDataClients(updateData)
      if (errors.length > 0) {
        this.errors = errors
      } else {
        for (let i = 0; i < updateData.length; i++) {
          this.loadingSubject.next(true)
          this.clientsService.updateClient(updateData[i]).pipe(
            catchError(error => {
              this.errors=error
              this.loadingSubject.next(false)
              return EMPTY
            }))
          .subscribe(() => this.loadingSubject.next(false))
        }
      }
    }
  }

  private findClientData(data: any, action: string) {
    const clientsDni: string[] = []
    for (let i = 0; i < this.clientsSubject.value.length; i++) {
      clientsDni.push(this.clientsSubject.value[i].dni)
    }
    if (action === "new") {
      if (!clientsDni.includes(data.dni.toString())) {
        return data
      }
    } else {
      if (clientsDni.includes(data.dni.toString())) {
        return data
      }
    }
  }

  getOneClient(dni:string){
    this.clientsService.getOneClient(dni).subscribe(resp=>console.log(resp))
  }

  //Products


  public loadProducts() {
    this.loadingSubject.next(true)
    this.productsService.getProducts().subscribe(products => {
      this.productsSubject.next(products)
      this.loadingSubject.next(false)
    })
  }

  public createProduct(product: Product) {
    this.loadingSubject.next(true)
    this.productsService.creatProduct(product).subscribe(() => this.loadingSubject.next(false))
  }

  public updateProduct(product: Product) {
    this.loadingSubject.next(true)
    this.productsService.updateProduct(product).subscribe(() => this.loadingSubject.next(false))
  }

  private filterProducts(products: Product[], value: string): Product[] {
    const productsFiltered = products.filter(product => {
      return product.sku.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)
    })
    return productsFiltered
  }

  public exportProducts(item: string) {
    this.manageInfoService.export(this.productsSubject.value, item)
  }

  public importProducts() {
    let errors: string[]
    errors = this.validation.validateImportDataProducts(this.data)
    if (errors.length > 0) {
      this.errors = errors
    } else {
      const newData = this.data.filter((data: any) => (this.findProductData(data, "new")))
      const updateData = this.data.filter((data: any) => (this.findProductData(data, "update")))
      for (let i = 0; i < newData.length; i++) {
        this.loadingSubject.next(true)
        this.productsService.creatProduct(newData[i]).subscribe(() => this.loadingSubject.next(false))
      }
      const errors = this.validation.validateUpdateDataProducts(updateData)
      if (errors.length > 0) {
        this.errors = errors
      } else {
        for (let i = 0; i < updateData.length; i++) {
          this.loadingSubject.next(true)
          this.productsService.updateProduct(updateData[i]).subscribe(() => this.loadingSubject.next(false))
        }
      }
    }
  }

  private findProductData(data: any, action: string) {
    const productsSku: string[] = []
    for (let i = 0; i < this.productsSubject.value.length; i++) {
      productsSku.push(this.productsSubject.value[i].sku)
    }
    if (action === "new") {
      if (!productsSku.includes(data.sku.toString())) {
        return data
      }
    } else {
      if (productsSku.includes(data.sku.toString())) {
        return data
      }
    }
  }

  getOneProduct(sku:string){
    this.productsService.getOneProduct(sku).subscribe(resp=>console.log(resp))
  }

}
