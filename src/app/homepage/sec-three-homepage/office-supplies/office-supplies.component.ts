import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-office-supplies',
  templateUrl: './office-supplies.component.html',
  styleUrls: ['./office-supplies.component.scss']
})
export class OfficeSuppliesComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}
  
  Subcategory:any = 'Office Supplies'
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };

   this.router.navigate([`/category/${'Office-Supplies'}`],  { state: { search_data } } )
  }
}
