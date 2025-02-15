import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-part',
  templateUrl: './vehicle-part.component.html',
  styleUrls: ['./vehicle-part.component.scss']
})
export class VehiclePartComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}
  
  Subcategory:any = 'Vehicles & Parts'
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
   this.router.navigate([`/category/${'Vehicles-&-Parts'}`],  { state: { search_data } } )
  }
}
