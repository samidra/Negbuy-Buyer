import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderComponent } from './my-order.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';


const routes: Routes = [
    {
        path:"",
        component: MyOrderComponent
      },
      {
        path:"order-delivery-status", 
        component: DeliveryStatusComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MyOrderRoutingModule { }
