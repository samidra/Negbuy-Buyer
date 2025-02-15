import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class HardwareComponent {
  
  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Hardware'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };

    this.router.navigate([`/category/${'Hardware'}`], { state: { search_data }})
   }
}
