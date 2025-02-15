import { NgModule } from '@angular/core';

import { ServiceforyouComponent } from './serviceforyou/serviceforyou.component';
import { FooterModule } from "../../footer/footer.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TrackingRoutingModule } from 'src/app/products/trackerpage/tracking-routing.module';


@NgModule({
    declarations: [
        ServiceforyouComponent,
    ],
    imports: [
        TrackingRoutingModule,
        FooterModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ProfileModule { }
