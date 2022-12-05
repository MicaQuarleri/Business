import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/produc';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/products`
    return this.http.get<Product[]>(url)
  }

  public getOneProduct(sku: string): Observable<Product> {
    const url = `${this.baseUrl}/products`
    return this.http.get<Product>(`${url}?sku=${sku}`)
  }


  creatProduct(product: Product): Observable<Product> {
   product.sku=product.sku.toString();
    if (!product.descount){
      product.descount=0;
    }
    const url = `${this.baseUrl}/products`
    return this.http.post<Product>(url, product)
  }

  updateProduct(product: Product): Observable<Product> {
    product.sku=product.sku.toString();
    const url = `${this.baseUrl}/products`
    return this.http.put<Product>(`${url}/${product.id}`, product)
  }
}
