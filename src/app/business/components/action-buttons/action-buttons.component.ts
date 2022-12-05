import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styles: [
  ]
})
export class ActionButtonsComponent {

  @Output() clickAction = new EventEmitter<string>()
  @Input() item: string = ""

  fileLoad = false

  constructor(private store: StoreService) { }

  sendAction(event: string) {
    this.clickAction.emit(event)
  }

  loadData(event: any) {
    this.fileLoad = true
    this.store.importData(event)
  }
}
