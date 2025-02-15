import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingRoutingModule } from './tracking-routing.module';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { FooterModule } from "../../footer/footer.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ExWorkOrderConfirmComponent } from './ex-work-order-confirm/ex-work-order-confirm.component';
import { OurservicesModule } from "../../ourservices/ourservices.module";
import { DdpPaymentConfirmComponent } from './ddp-payment-confirm/ddp-payment-confirm.component';
import { DocketDetailPageComponent } from './docket-detail-page/docket-detail-page.component';
import { MainheaderModule } from "../../mainheader/mainheader.module";
import { OrderCancelledComponent } from './order-cancelled/order-cancelled.component';


@NgModule({
    declarations: [
        PaymentModeComponent,
        ExWorkOrderConfirmComponent,
        DdpPaymentConfirmComponent,
        DocketDetailPageComponent,
        OrderCancelledComponent,
    ],
    imports: [
        CommonModule,
        TrackingRoutingModule,
        FooterModule,
        ReactiveFormsModule,
        FormsModule,
        OurservicesModule,
        MainheaderModule
    ]
})
export class TrackingModule { }
