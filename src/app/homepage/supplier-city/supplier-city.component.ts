import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-city',
  templateUrl: './supplier-city.component.html',
  styleUrls: ['./supplier-city.component.scss']
})
export class SupplierCityComponent {

  slides = [
    {
      path: 'assets/Supplier-city/Agra.png',
      heading: 'Agra'
    },
    {
      path: 'assets/Supplier-city/Delhi.png',
      heading: 'Delhi'
    },
    {
      path: 'assets/Supplier-city/Bangalore.png',
      heading: 'Bangalore'
    },
    {
      path: 'assets/Supplier-city/punjab.png',
      heading: 'punjab'
    },
    {
      path: 'assets/Supplier-city/Mumbai.png',
      heading: 'Mumbai'
    },
    {
      path: 'assets/Supplier-city/Mumbai.png',
      heading: 'kerala'
    },
    {
      path: 'assets/Supplier-city/Bangalore.png',
      heading: 'Hyderabad'
    },
    
  ];
  slideConfig = {
   "slidesToShow": 7,
   "slidesToScroll": 1,
  "autoplay": true,
  "autoplaySpeed": 900,
  "showArrow" : false,
  "responsive": [
    {
      'breakpoint': 1130,
      'settings': {
        'slidesToShow': 4
      }
    },
    {
      'breakpoint': 750,
      'settings': {
        'slidesToShow': 3
      }
    },
    {
      'breakpoint': 750,
      'settings': {
        'slidesToShow': 2.1
      }
    }
  ]

};
  
  slickInit(e: any) { }
  
  breakpoint(e: any) { }
  
  afterChange(e: any) { }
  
  beforeChange(e: any) { }
}

