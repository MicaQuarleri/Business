import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../interfaces/client';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styles: [
  ]
})
export class ModalAccountComponent {

  @Output () dni=new EventEmitter<string>();

  clients=this.store.clientsSubject;
  clientExist=false;
  error=false;

  constructor(private store: StoreService,public dialogRef: MatDialogRef<ModalAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
    this.store.loadClients()
  }

  findDni(event:any){
    this.error=false;
    this.clientExist=false;
    if (event.keyCode===13){
      const client=this.clients.value.filter((client:Client)=>client.dni===event.target.value)
      if (client.length>0){
        client[0].debt+=this.data.totalSale;
        this.store.updateClient(client[0])
        this.clientExist=true;
      } else{
        this.error=true;
      }
    }
  }


}
