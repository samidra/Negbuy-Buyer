// form-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataKey = 'myFormDataKey';

  getFormData(): any {
    const formDataString = localStorage.getItem(this.formDataKey);
    return formDataString ? JSON.parse(formDataString) : null;
  }

  setFormData(formData: any): void {
    localStorage.setItem(this.formDataKey, JSON.stringify(formData));
  }

  clearFormData(): void {
    localStorage.removeItem(this.formDataKey);
  }

  private currentUrlKey = 'url'
  setUrlData(urlData:any):void{
    localStorage.setItem(this.currentUrlKey, JSON.stringify(urlData));
  }

  getUrlData(): any {
    const url = localStorage.getItem(this.currentUrlKey);
    return url ? JSON.parse(url) : null;
  }

  clearUrlData(): void {
    localStorage.removeItem(this.currentUrlKey);
  }

  private setShipmodeOrderIdKey = 'mysetShipmodeOrderIdKey';
  setShipmodeOrderId(data:any){
    localStorage.setItem(this.setShipmodeOrderIdKey , JSON.stringify(data))
  }

  getShipmodeOrderId(){
    const data = localStorage.getItem(this.setShipmodeOrderIdKey);
    return data ? JSON.parse(data) : null;
  }

  clearShipmodeOrderId(): void {
    localStorage.removeItem(this.setShipmodeOrderIdKey);
  }

  
  // Sign In 
  private setLogInResponseKey = 'myLogInResponseKey';
  setLogInResponse(data:any){
    localStorage.setItem(this.setLogInResponseKey , JSON.stringify(data))
  }

  getLogInResponse(){
    const data = localStorage.getItem(this.setLogInResponseKey);
    return data ? JSON.parse(data) : null;
  }

  clearLogInResponse(): void {
    localStorage.removeItem(this.setLogInResponseKey);
  }
}
