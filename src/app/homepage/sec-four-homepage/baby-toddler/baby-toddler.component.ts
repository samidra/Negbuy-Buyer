import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-baby-toddler',
  templateUrl: './baby-toddler.component.html',
  styleUrls: ['./baby-toddler.component.scss']
})
export class BabyToddlerComponent {
  
  constructor(private router:Router, private route: ActivatedRoute,){}
  
  Subcategory:any = 'Baby & Toddler'
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    
   this.router.navigate([`/category/${'Baby-&-Toddler'}`], { state: { search_data } } )
  }
}
