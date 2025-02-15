import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterRoutingModule } from './helpcenter-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { MainheaderModule } from "../../mainheader/mainheader.module";
import { FooterModule } from "../../footer/footer.module";
import { OurservicesModule } from 'src/app/ourservices/ourservices.module';
import { RfqComponent } from './rfq/rfq.component';
import { ReturnyourorderComponent } from './returnyourorder/returnyourorder.component';
import { AboutComponent } from './about/about.component';
import { OrderRelatedQuerryComponent } from './order-related-querry/order-related-querry.component';


@NgModule({
    declarations: [
        DeliveryComponent,
        RfqComponent,
        ReturnyourorderComponent,
        AboutComponent,
        OrderRelatedQuerryComponent
    ],
    imports: [
        CommonModule,
        HelpCenterRoutingModule,
        MainheaderModule,
        FooterModule,
        OurservicesModule
    ]
})
export class HelpcenterModule { }
