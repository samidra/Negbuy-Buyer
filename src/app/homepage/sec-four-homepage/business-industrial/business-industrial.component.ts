import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-industrial',
  templateUrl: './business-industrial.component.html',
  styleUrls: ['./business-industrial.component.scss']
})
export class BusinessIndustrialComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Business & Industrial'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    this.router.navigate([`/category/${'Business-&-Industrial'}`],  { state: { search_data } })
   }
}
