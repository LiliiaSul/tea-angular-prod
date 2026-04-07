import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare var bootstrap: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(true);
      }, 10000);
    });
  }

  ngOnInit(): void {
    this.subscription = this.observable
      .subscribe(
        {
          next: (param) => {
            const popUp = document.getElementById('popup');
            if (popUp && param == true) {
              const modal = new bootstrap.Modal(popUp);
              modal.show();
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
