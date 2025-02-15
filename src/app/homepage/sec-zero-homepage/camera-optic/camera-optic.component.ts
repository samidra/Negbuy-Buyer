import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-camera-optic',
  templateUrl: './camera-optic.component.html',
  styleUrls: ['./camera-optic.component.scss']
})
export class CameraOpticComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Cameras & Optics'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    // this.router.navigate([`/category/${'Cameras-&-Optics'}`],  { queryParams: { ctgry: this.Subcategory}} )
    this.router.navigate([`/category/${'Cameras-&-Optics'}`], { state: { search_data } } )
   }
   
}
