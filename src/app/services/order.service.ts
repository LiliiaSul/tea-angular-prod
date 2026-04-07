import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormValues} from "../types/formValues";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: FormValues) {
    return this.http.post<{success: boolean, message?: string}>('https://testologia.ru/order-tea', data);
  }

}
