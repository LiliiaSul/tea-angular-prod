import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {ProductType} from "../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchSubject = new BehaviorSubject<string>('');
  products = this.searchSubject.pipe(
    switchMap(value => value === '' ? this.http.get<ProductType[]>('https://testologia.ru/tea')
      : this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${value}`))
  );

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`)
  }

  searchProduct(query: string) {
    this.searchSubject.next(query);
  }
}
