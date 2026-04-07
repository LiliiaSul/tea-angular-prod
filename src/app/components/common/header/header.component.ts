import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  search() {
    this.productService.searchProduct(this.query);
  }

  clear() {
    this.query = '';
    this.productService.searchProduct('');
  }

}
