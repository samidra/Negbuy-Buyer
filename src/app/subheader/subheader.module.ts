import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubheaderRoutingModule } from './subheader-routing.module';
import { SubheaderComponent } from './subheader.component';


@NgModule({
  declarations: [
    SubheaderComponent
  ],
  imports: [
    CommonModule,
    SubheaderRoutingModule
  ],
  exports:[
    SubheaderComponent
  ]
})
export class SubheaderModule { }
