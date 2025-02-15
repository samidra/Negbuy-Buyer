import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { ExWorkOrderConfirmComponent } from './ex-work-order-confirm/ex-work-order-confirm.component';
import { DdpPaymentConfirmComponent } from './ddp-payment-confirm/ddp-payment-confirm.component';
import { DocketDetailPageComponent } from './docket-detail-page/docket-detail-page.component';
import { OrderCancelledComponent } from './order-cancelled/order-cancelled.component';

const routes: Routes = [

  {
    path:'payment-details',
    component:PaymentModeComponent
  },
  {
    path:'ex-work-order-confirm',
    component:ExWorkOrderConfirmComponent
  },
  {
    path:'order-confirm-detail',
    component:DdpPaymentConfirmComponent
  },
  {
    path:'order-cancel-detail',
    component:OrderCancelledComponent
  },
  {
    path:'docket-detail-page',
    component: DocketDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
