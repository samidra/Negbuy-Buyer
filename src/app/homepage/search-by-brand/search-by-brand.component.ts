import { Component } from '@angular/core';

@Component({
  selector: 'app-search-by-brand',
  templateUrl: './search-by-brand.component.html',
  styleUrls: ['./search-by-brand.component.scss']
})
export class SearchByBrandComponent {
  slides = [
    {
      path: 'assets/Search-By-Brands/Siemens.png',
      heading: 'Siemens'
    },
    {
      path: 'assets/Search-By-Brands/Mitsubishi.png',
      heading: 'Mitsubishi'
    },
    {
      path: 'assets/Search-By-Brands/A-B.png',
      heading: 'A-B'
    },
    {
      path: 'assets/Search-By-Brands/Cisco.png',
      heading: 'Cisco'
    },
    {
      path: 'assets/Search-By-Brands/su-1.png',
      heading: 'Siemens'
    },
    {
      path: 'assets/Search-By-Brands/Mitsubishi.png',
      heading: 'Mitsubishi'
    },
    {
      path: 'assets/Search-By-Brands/A-B.png',
      heading: 'A-B'
    },
    {
      path: 'assets/Search-By-Brands/Cisco.png',
      heading: 'Cisco'
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
