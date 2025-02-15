import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent {
  
  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Furniture'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    
    this.router.navigate([`/category/${'Furniture'}`],  { state: { search_data } } )
   }
}
