import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { TrackerpageComponent } from './trackerpage/trackerpage.component';

const routes: Routes = [
  {
    path:"",
    component:ProductsComponent
  },
  {
    path:'buy-now',
    component:TrackerpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
