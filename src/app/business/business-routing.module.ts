import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "clients",
        component: ClientsComponent
      },
      {
        path: '**', redirectTo: 'home'
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
