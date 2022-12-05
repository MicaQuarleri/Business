import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ModalAccountComponent } from './components/modal-account/modal-account.component';
import { ModalActionComponent } from './components/modal-action/modal-action.component';
import { SearchComponent } from './components/search/search.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { MaterialModule } from '../material/material.module';
import { BusinessRoutingModule } from './business-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ActionButtonsComponent,
    ClientsComponent,
    FormClientComponent,
    FormProductComponent,
    HomeComponent,
    ModalAccountComponent,
    ModalActionComponent,
    ProductsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule { }
