import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpcenterComponent } from './helpcenter.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { RfqComponent } from './rfq/rfq.component';
import { ReturnyourorderComponent } from './returnyourorder/returnyourorder.component';
import { AboutComponent } from './about/about.component';
import { OrderRelatedQuerryComponent } from './order-related-querry/order-related-querry.component';


const routes: Routes = [
    {
        path:"",
        component:HelpcenterComponent
      },
      
      {
        path:'delivery',
        component:DeliveryComponent
      },
      {
        path:'rfq',
        component:RfqComponent
      },
      {
        path:'return-your-order',
        component:ReturnyourorderComponent
      },
      {
        path:'about-us',
        component:AboutComponent
      },
      {
        path:'order-related-querry',
        component:OrderRelatedQuerryComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpCenterRoutingModule { }
