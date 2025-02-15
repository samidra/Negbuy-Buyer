import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderRoutingModule } from './my-order-routing.module';
import { MainheaderModule } from "../../mainheader/mainheader.module";
import { FooterModule } from "../../footer/footer.module";
import { OurservicesModule } from 'src/app/ourservices/ourservices.module';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgRatingBarModule } from 'ng-rating-bar';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    DeliveryStatusComponent,
    ],
  imports: [
    CommonModule,
    MyOrderRoutingModule,
    MainheaderModule,
    FooterModule,
    OurservicesModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgRatingBarModule
  ]
})
export class MyOrderModule { }
