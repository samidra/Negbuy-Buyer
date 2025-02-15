import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-electroni-equipment',
  templateUrl: './electroni-equipment.component.html',
  styleUrls: ['./electroni-equipment.component.scss']
})
export class ElectroniEquipmentComponent {

  constructor(private router:Router, private route: ActivatedRoute,){}

Subcategory:any = 'Electronics'
 RouteToProductPage(){

  const search_data = {
    ctgry: this.Subcategory,
  };
  this.router.navigate([`/category/${'Electronics'}`], { state: { search_data }} )
 }

}
