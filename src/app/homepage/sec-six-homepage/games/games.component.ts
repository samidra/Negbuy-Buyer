import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

Subcategory:any = 'Toys & Games'
 RouteToProductPage(){
  const search_data = {
    ctgry: this.Subcategory,
  };

  this.router.navigate([`/category/${'Toys-&-Games'}`], { state: { search_data } })
 }
}
