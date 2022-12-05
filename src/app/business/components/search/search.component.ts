import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @Input() item: string = ""
  @Output() valueSearch = new EventEmitter<string>();
  @Output() valueEnter = new EventEmitter<string>();
  value="";

  search(event: any) {
    if (event.keyCode===13){
      event.preventDefault();
      this.valueEnter.emit(event.target?.value);
    } else{
      this.valueSearch.emit(event.target?.value);
    }
  }

}
