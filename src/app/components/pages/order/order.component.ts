import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isDisabled = false;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private orderService: OrderService) {
  }

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: [{value: '', disabled: true}],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ0-9 \-/]+$')]],
    comment: ['']
  })

  get name() {
    return this.orderForm.get('name');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get product() {
    return this.orderForm.get('product');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get comment() {
    return this.orderForm.get('comment');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.patchValue({product: params['product']});
      }
    });
  }

  createOrder() {
    this.isDisabled = true;
    this.orderService.createOrder({
      name: this.name?.value || '',
      last_name: this.lastName?.value || '',
      phone: this.phone?.value || '',
      country: this.country?.value || '',
      zip: this.zip?.value || '',
      product: this.product?.value || '',
      address: this.address?.value || '',
      comment: this.comment?.value || '',
    })
      .subscribe({
        next: (response) => {
          this.isDisabled = false;
          if (response.success && !response.message) {
            const formHeader = document.querySelector('.form-header') as HTMLElement;
            formHeader.classList.add('d-none');
            const orderForm = document.getElementById('order-form') as HTMLElement;
            orderForm.classList.add('d-none');
            const hideBlock = document.getElementById('hide-block') as HTMLElement;
            hideBlock.classList.remove('d-none');
          }
        },
        error: (error) => {
          this.isDisabled = false;
          const btnError = document.getElementById('btn-error') as HTMLElement;
          btnError.classList.remove('d-none');
          setTimeout(() => {
            btnError.classList.add('d-none');
          }, 3000);
        }
      })
  }

}
