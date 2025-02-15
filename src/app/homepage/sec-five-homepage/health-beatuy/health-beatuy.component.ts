import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-beatuy',
  templateUrl: './health-beatuy.component.html',
  styleUrls: ['./health-beatuy.component.scss']
})
export class HealthBeatuyComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

Subcategory:any = 'Health & Beauty'
 RouteToProductPage(){
  const search_data = {
    ctgry: this.Subcategory,
  };
  
  this.router.navigate([`/category/${'Health-&-Beauty'}`],{ state: { search_data } } )
 }
}
