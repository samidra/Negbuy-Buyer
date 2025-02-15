import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apparel-accessories',
  templateUrl: './apparel-accessories.component.html',
  styleUrls: ['./apparel-accessories.component.scss']
})
export class ApparelAccessoriesComponent {
  constructor(private router:Router, private route: ActivatedRoute,){}

  Subcategory:any = 'Apparel & Accessories'
  
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    
    this.router.navigate([`/category/${'Apparel-&-Accessories'}`],  { state: { search_data } })
   }
}
