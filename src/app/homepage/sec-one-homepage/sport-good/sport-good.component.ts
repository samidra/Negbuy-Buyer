import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sport-good',
  templateUrl: './sport-good.component.html',
  styleUrls: ['./sport-good.component.scss']
})
export class SportGoodComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}
  
  Subcategory:any = 'Sporting Goods'
  RouteToProductPage(){
    const search_data = {
      ctgry: this.Subcategory,
    };
    
   this.router.navigate([`/category/${'Sporting-Goods'}`], { state: { search_data } })
  }
}
