import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Client } from '../../interfaces/client';
import { MatDialog } from '@angular/material/dialog';
import { FormClientComponent } from '../../components/form-client/form-client.component';
import { ModalActionComponent } from '../../components/modal-action/modal-action.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  properties = ["dni", "name", "surname", "debt", "payment", "difference", "edit", "show"]
  loading$ = this.store.loading$
  clients$ = this.store.getClients()
  errors: string[] = []

  constructor(private store: StoreService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.loadClients()
  }

  filter(value: string) {
    this.store.setValueFilter(value)
  }

  clickAction(action: string) {
    this.errors= []
    if (action === "export") {
      this.store.exportClients("clients")
    } else if (action === "import") {
      this.store.importClients()
      this.store.loadClients()
      this.errors = this.store.errors
      if (this.errors.length > 0) {
        this.openErrors()
        this.store.loadClients()
      } else {
        this.store.loadClients()
      }
    } else {
      this.openForm(null, 'add')
      this.store.loadClients()
    }
  }

  openForm(client: Client | null, action: string) {
    const dialogRef = this.dialog.open(FormClientComponent, {
      width: '400px',
      data: { action: action, client: client },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.loadClients()
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
