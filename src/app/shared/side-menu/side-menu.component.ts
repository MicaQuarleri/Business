import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ['mat-sidenav{width:150px}']
})
export class SideMenuComponent {

  businessMenu: MenuItem[] = [
    {
      name: "Home",
      route: "./business/home",
      icon: "home"
    },
    {
      name: "Clients",
      route: "./business/clients",
      icon: "person"
    },
    {
      name: "Products",
      route: "./business/products",
      icon: "shopping_bag"
    }
  ]

}
