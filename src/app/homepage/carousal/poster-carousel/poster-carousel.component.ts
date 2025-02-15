import {Component,} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster-carousel',
  templateUrl: './poster-carousel.component.html',
  styleUrls: ['./poster-carousel.component.scss']
})

export class PosterCarouselComponent{
  
  constructor(private router:Router){}

  slides = [
    {
      heading:'ENGINEERING GOODS',
      path: 'assets/Carousel/new hopepage 4.webp',
      para: 'Find the related category products as below. Shop on Negbuy and find affordable items with the lowest price in the market.',
      category: 'Electronics',
      category_one: 'Electronics',
      alt: 'Engineering goods – precision tools, machinery, and equipment .'
    },
    { heading:'FABRIC AND TEXTILES',
      path: 'assets/Carousel/new hopepage 1.webp',
      para: 'Find the related category products as below. Shop on Negbuy and find affordable items with the lowest price in the market.',
      category: 'Apparel-&-Accessories',
      category_one: 'Apparel & Accessories',
      alt: 'Fabric and textiles – quality fabrics, textiles, and materials .'
    },
    { heading:'GEMS AND JEWELS',
      path: 'assets/Carousel/new hopepage 2.webp',
      para: 'Find the related category products as below. Shop on Negbuy and find affordable items with the lowest price in the market.',
      category: 'Apparel-&-Accessories',
      category_one: 'Apparel & Accessories',
      alt: 'Gems and jewels – exquisite jewelry and gemstones .'
    },
    { heading:'ELECTRONICS GOODS',
      path: 'assets/Carousel/new hopepage 3.webp',
      para: 'Find the related category products as below. Shop on Negbuy and find affordable items with the lowest price in the market.',
      category: 'Electronics',
      category_one: 'Electronics',
      alt: 'Electronic goods – gadgets, devices, and accessories available .'
    },
    
  ];
  slideConfig = {
   "slidesToShow": 2.3,
   "slidesToScroll": 1,
  //  vertical: true, // This makes the carousel vertical
  //  verticalSwiping: true, // This enables vertical swiping
  "autoplay": true,
  "autoplaySpeed": 1100,
  "showArrow" : false,
  "responsive": [
    {
      'breakpoint': 1130,
      'settings': {
        'slidesToShow': 1.8
      }
    },
    {
      'breakpoint': 850,
      'settings': {
        'slidesToShow': 1.6
      }
    },
    {
      'breakpoint': 740,
      'settings': {
        'slidesToShow': 1
      }
    }
  ]

};
  
  slickInit(e: any) { }
  
  breakpoint(e: any) { }
  
  afterChange(e: any) { }
  
  beforeChange(e: any) { }


  RouteToProductPage(category: any, category_one:any) {
    const search_data = {
      ctgry: category_one,
    };
    
    this.router.navigate([`/category/${category}`],{ state: { search_data } })
  }
  
}


