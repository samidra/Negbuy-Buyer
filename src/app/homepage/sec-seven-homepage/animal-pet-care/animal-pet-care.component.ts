import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-pet-care',
  templateUrl: './animal-pet-care.component.html',
  styleUrls: ['./animal-pet-care.component.scss']
})
export class AnimalPetCareComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

Subcategory:any = 'Animals & Pet Supplies'
 RouteToProductPage(){
  const search_data = {
    ctgry: this.Subcategory,
  };
  
  this.router.navigate([`/category/${'Animals-&-Pet-Supplies'}`], { state: { search_data } })
 }
}
