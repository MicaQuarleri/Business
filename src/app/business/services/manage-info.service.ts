import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Client } from '../interfaces/client';
import { ValidationsService } from './validations.service';

@Injectable({
  providedIn: 'root'
})
export class ManageInfoService {

  private dataSubject = new BehaviorSubject<any | null>(null);

  constructor(private validation: ValidationsService) { }

  export(data: any, item: string): void {
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    wb.SheetNames.push(item);
    var ws = XLSX.utils.json_to_sheet(data)
    wb.Sheets[item] = ws;

    /* save to file */
    XLSX.writeFile(wb, `${item}.xlsx`);
  }

  importData(file: any): Observable<any | []> {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file.target.files[0]);
    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' })
      let sheetNames = workBook.SheetNames;
      this.dataSubject.next(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]));
    }
    return this.dataSubject
  }
}
