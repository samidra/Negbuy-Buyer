import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurservicesComponent } from './ourservices.component';
import { OurservicesRoutingModule } from './ourservices-routing.module';


@NgModule({
  declarations: [
    OurservicesComponent
  ],
  imports: [
    CommonModule,
    OurservicesRoutingModule
  ],
  exports:[
    OurservicesComponent
    
  ]
  
})
export class OurservicesModule { }
