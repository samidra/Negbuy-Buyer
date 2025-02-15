import { Router } from '@angular/router';
import { Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  constructor(private router: Router) { }

  images = [

    {
      heading: 'Shop Your Favorite Products Easily',
      path: 'assets/Carousel/6.webp',
      para: 'Shop Now Across All Categories! at Negbuy',
      category: 'my-recommendation',
      category_one: 'my-recommendation',
      alt: 'Shop a wide variety of products across all categories on Negbuy – from electronics to apparel, healthcare, and more.',
    },
    {
      heading: 'Engineering Goods',
      path: 'assets/Carousel/5.webp',
      para: 'Empower Innovation: Explore Top-Quality Engineering Goods. ',
      para2: 'Advance Your Projects with Our Precision Equipment',
      category: 'Electronics',
      category_one: 'Electronics',
      alt: 'Browse engineering goods – tools, machinery, and industrial equipment on Negbuy',
    },
    {
      heading: 'Camera & Optics',
      path: 'assets/Carousel/3.webp',
      para: 'Capture Every Moment: Discover the Best in Camera & Optics. ',
      para2: 'Elevate Your Photography with Our Cutting-Edge Gear',
      category: 'Cameras-&-Optics',
      category_one: 'Cameras & Optics',
      alt: 'Discover camera and optics – cameras, lenses, and accessories on Negbuy',
    },
    {
      heading: 'Apparel & Accessories',
      path: 'assets/Carousel/1.webp',
      para: 'Step Into Style: Discover the Latest Trends in Apparel and Accessories.',
      para2: 'Elevate Your wardrobe with our exclusive collections',
      category: 'Apparel-&-Accessories',
      category_one: 'Apparel & Accessories',
      alt: 'Shop apparel and accessories – fashion, footwear, and accessories on Negbuy',
    },
    {
      heading: 'Furniture',
      path: 'assets/Carousel/2.webp',
      para: 'Transform Your Space: Explore Stylish and Comfortable Furniture. ',
      para2: 'Enhance Your Home with Our Exclusive Collections',
      category: 'Cameras-&-Optics',
      category_one: 'Cameras & Optics',
      alt: 'Quality furniture – home and office furniture solutions on Negbuy',
    },

    {
      heading: 'Animal & Petcare',
      path: 'assets/Carousel/4.webp',
      para: 'Pamper Your Pets: Discover Premium Animal & Petcare Products. ',
      para2: 'Give Your Pets the Best with Our Curated Selections',
      category: 'Animals-&-Pet-Supplies',
      category_one: 'Animals & Pet Supplies',
      alt: 'Animal and pet care products – food, grooming, and pet accessories on Negbuy',
    }
  ];

  RouteToProductPage(category: any, category_one: any) {
    const search_data = {
      ctgry: category_one,
    };
    this.router.navigate([`/category/${category}`], { state: { search_data } })
  }

  Route_to_recommendation() {
    this.router.navigate([`/my-recommendation`])
  }

  interval: any = [4000, 8000, 1200];

  imgurl = '../../assets/Carousel/4 Poster-01.jpg';
  ngOnInit(): void {
    $('.carousel').carousel();
  }

  get_latest_blog = [
    {
      heading: 'Export Opportunities in Emerging Markets for Small Businesses',
      path: 'assets/Blogs/main_blog_page/homepage_news1.webp',
      description: 'In today’s interconnected world, small businesses have more opportunities than ever to expand beyond their local markets.',
    },
    {
      heading: 'Challenges and Solutions for small businesses in SCM',
      path: 'assets/Blogs/main_blog_page/homepage_news2.webp',
      description: 'Supply chain management (SCM) is a critical element for any business, but it poses unique challenges for small businesses.',
    },
    {
      heading: 'E-commerce Logistics Meets Retail Demands',
      path: 'assets/Blogs/main_blog_page/homepage_news3.webp',
      description: 'In today’s fast-paced digital world, the fusion of e-commerce logistics with retail demands has become more than a trend—its an essential business strategy. ',
    },

  ];

  goToBlog() {
    this.router.navigate(['blogs']);
  }
}
