import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

const defaultHeader = 'Наши чайные коллекции';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  loader: boolean = false;
  header: string = defaultHeader;
  nothingFound: boolean = false;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.loader = true;
    this.productService.products
      .subscribe({
        next: (data) => {
          this.loader = false;
          this.products = data;
          this.nothingFound = data.length === 0;
        },
        error: (error) => {
          this.loader = false;
          console.log(error);
          this.router.navigate(['/']);
        }
      })

    this.productService.searchSubject.subscribe({
      next: (value) => {
        if (value === '') {
          this.header = defaultHeader;
        } else {
          this.header = `Результаты поиска по запросу: ${value}`;
        }
      }
    });
  }

}
