import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-art-craft',
  templateUrl: './art-craft.component.html',
  styleUrls: ['./art-craft.component.scss']
})
export class ArtCraftComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

Subcategory:any = 'Arts & Entertainment'
 RouteToProductPage(){
  const search_data = {
    ctgry: this.Subcategory,
  };
  
  this.router.navigate([`/category/${'Arts-&-Entertainment'}`], { state: { search_data } })
 }
}
