import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
  public letterPattern = /^([a-z])*$/;
  public numberPattern = /^([0-9])*$/;


  constructor(private http: HttpClient) { }

  validateImportDataClients(file: any): string[] {
    const errors: string[] = []
    const search=file.reduce((acc:any,client:any)=>{
      acc[client.dni]=++acc[client.dni] || 0
      return acc;
    },{})
    const duplicateDni=file.filter((client:any)=>{
      return search[client.dni]
    })
    if (duplicateDni.length>0){
      errors.push("In the file, there are duplicate DNIs, the DNI´s value must be unique")
    }
    for (let i = 0; i < file.length; i++) {
      if (!file[i].dni) {
        errors.push("In the line" + " " + (i + 1) + " " + "the dni's value is necessary")
      } else if (!this.numberPattern.test(file[i].dni) || file[i].dni.length < 8) {
        errors.push("In the line" + " " + (i + 1) + " " + "the dni's value:" + " " + file[i].dni + " " + "is incorrect, insert a valid dni")
      }
      if (!file[i].cellphone) {
        errors.push("In the line" + " " + (i + 1) + " " + "the cellphone's value is necessary")
      } else if (!this.numberPattern.test(file[i].cellphone) || file[i].cellphone.length < 8) {
        errors.push("In the line" + " " + (i + 1) + " " + "the cellphone's value:" + " " + file[i].cellphone + " " + "is incorrect, insert a valid cellphone's value, only numbers")
      }
      if (!file[i].name) {
        errors.push("In the line" + " " + (i + 1) + " " + "the name's value is necessary")
      } else if (!this.letterPattern.test(file[i].name)) {
        errors.push("In the line" + " " + (i + 1) + " " + "the name's value:" + " " + file[i].name + " " + "is incorrect, insert only letters")
      }
      if (!file[i].surname) {
        errors.push("In the line" + " " + (i + 1) + " " + "the surname's value is necessary")
      } else if (!this.letterPattern.test(file[i].surname)) {
        errors.push("In the line" + " " + (i + 1) + " " + "the surname's value:" + " " + file[i].surname + " " + "is incorrect, insert only letters")
      }
      if (file[i].email) {
        if (this.emailPattern.test(file[i].email)){
          errors.push("In the line" + " " + (i + 1) + " " + "the email's value:" + " " + file[i].email + " " + "is incorrect, insert a valid email")
        }
      }
    }
    return errors
  }

  validateUpdateDataClients(file: any): string[] {
    const errors: string[] = []
    for (let i = 0; i < file.length; i++) {
      if (!file[i].id) {
        errors.push("The dni's value of the line" + " " + (i + 1) + " " + "already exist, so id is necessary")
      }
    }
    return errors
  }

  validateImportDataProducts(file: any): string[] {
    const errors: string[] = []
    const search=file.reduce((acc:any,product:any)=>{
      acc[product.sku.toString()]=++acc[product.sku.toString()] || 0
      return acc;
    },{})
    const duplicateSku=file.filter((product:any)=>{
      return search[product.sku.toString()]
    })
    if (duplicateSku.length>0){
      errors.push("In the file, there are duplicate SKUs, the SKU´s value must be unique")
    }
    for (let i = 0; i < file.length; i++) {
      if (!file[i].sku) {
        errors.push("In the line" + " " + (i + 1) + " " + "the sku's value is necessary")
      }
      if (!file[i].description) {
        errors.push("In the line" + " " + (i + 1) + " " + "the description's value is necessary")
      }
      if (!file[i].price) {
        errors.push("In the line" + " " + (i + 1) + " " + "the price's value is necessary")
      } else if (!this.numberPattern.test(file[i].price)) {
        errors.push("In the line" + " " + (i + 1) + " " + "the price's value:" + " " + file[i].price + " " + "is incorrect, insert a valid price")
      }
      if (!file[i].stock && file[i].stock !== 0) {
        errors.push("In the line" + " " + (i + 1) + " " + "the stock's value is necessary")
      } else if (!this.numberPattern.test(file[i].stock)) {
        errors.push("In the line" + " " + (i + 1) + " " + "the stock's value:" + " " + file[i].stock + " " + "is incorrect, insert a valid stock")
      }
      if (file[i].descount) {
        if (!this.numberPattern.test(file[i].descount)) {
          errors.push("In the line" + " " + (i + 1) + " " + "the descount's value:" + " " + file[i].descount + " " + "is incorrect, insert a valid descount")
        } else if (file[i].descount < 0) {
          errors.push("In the line" + " " + (i + 1) + " " + "the descount's value:" + "must be bigger than zero")
        }
      }
    }
    return errors
  }

  validateUpdateDataProducts(file: any): string[] {
    const errors: string[] = []
    for (let i = 0; i < file.length; i++) {
      if (!file[i].id) {
        errors.push("The sku's value of the line" + " " + (i + 1) + " " + "already exist,so id is necessary")
      }
    }
    return errors
  }
}
