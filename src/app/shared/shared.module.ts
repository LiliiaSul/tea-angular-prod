import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProductComponent} from "./components/product/product.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NgbCollapseModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    SharedRoutingModule,
  ]
})
export class SharedModule {
}
