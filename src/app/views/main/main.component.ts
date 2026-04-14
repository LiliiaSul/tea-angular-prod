import {AfterViewInit, Component, ElementRef, inject, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, AfterViewInit {
  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  private modalService = inject(NgbModal);
  public observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(true);
      }, 10000);
    });
  }


  ngAfterViewInit(): void {
    this.subscription = this.observable
      .subscribe(
        {
          next: (param) => {
            if (param == true) {
              this.modalService.open(this.popup);
            }
          },
          error: (error: string) => {
            console.log(error);
          }
        })
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
