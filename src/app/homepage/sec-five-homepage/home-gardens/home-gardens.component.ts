import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-gardens',
  templateUrl: './home-gardens.component.html',
  styleUrls: ['./home-gardens.component.scss']
})
export class HomeGardensComponent {
  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Home & Garden'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    
    this.router.navigate([`/category/${'Home-&-Garden'}`], { state: { search_data } })
   }
}
