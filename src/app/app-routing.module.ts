import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "business",
    loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
  },
  {
    path: "**",
    redirectTo: "business"
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
