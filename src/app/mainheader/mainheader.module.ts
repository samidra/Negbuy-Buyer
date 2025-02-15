import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainheaderRoutingModule } from './mainheader-routing.module';
import { MainheaderComponent } from './mainheader.component';
import { HomepageModule } from '../homepage/homepage.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MainheaderComponent
  ],
  imports: [
    CommonModule,
    MainheaderRoutingModule,
    HomepageModule,
    FormsModule
    
  ],
  exports:[
    MainheaderComponent
  ]
})
export class MainheaderModule { }
