import { Component, OnInit,  HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss']
})
export class MyBlogComponent implements OnInit {
  getData: any;
  newsID:any
  loaderS: boolean = true;
  
  ngOnInit(): void {
    window.scrollTo(0,0)

    // Set the new title
    const title = "Blogs | Negbuy.com"
    this.titleService.setTitle(title);
    }


  constructor(private router:Router,private titleService: Title){ }

  get_latest_blog = [
    {
      heading:'Export Opportunities in Emerging Markets for Small Businesses',
      path: 'assets/Blogs/main_blog_page/Export Opportunities in Emerging Markets for Small Businesses.webp',
      detail_para: 'In today’s interconnected world, small businesses have more opportunities than ever to exp...',
      blog_id: '01',
    },
    { heading:'Challenges and Solutions for small businesses in SCM',
      path: 'assets/Blogs/main_blog_page/Challenges and Solutions for small businesses in SCM.webp',
      detail_para: 'Supply chain management (SCM) is a critical element for any business, but it poses unique...',
      blog_id: '02',
    },
    { heading:'E-commerce Logistics Meets Retail Demands',
      path: 'assets/Blogs/main_blog_page/E-commerce Logistics Meets Retail Demands.webp',
      detail_para: 'In today’s fast-paced digital world, the fusion of e-commerce logistics with retail dema...',
      blog_id: '03',
    },
    { heading:'Government Initiatives for MSMEs in India: Nurturing Growth and Innovation',
      path: 'assets/Blogs/main_blog_page/Government Initiatives for MSMEs in India Nurturing Growth and Innovation.webp',
      detail_para: 'India’s Micro, Small, and Medium Enterprises (MSMEs) sector plays a critical role in...',
      blog_id: '04',
    },
    {
      heading:'Import Duty Increased by 5%',
      path: 'assets/Blogs/main_blog_page/Import Duty Increased by 5.webp',
      detail_para: 'Imagine you are about to purchase your favorite imported gadget or clothing brand...',
      blog_id: '05',
    },
    { heading:'An overview about IT industry in Trend',
      path: 'assets/Blogs/main_blog_page/An overview about IT industry in Trend.webp',
      detail_para: 'India has rapidly emerged as a global powerhouse in the Information Technology...',
      blog_id: '06',
    },
    
  ];

  popular_blog_data = [
    {
      heading:'Import Duty Increased by 5%',
      path: 'assets/Blogs/main_blog_page/Import Duty Increased by 5.webp',
      detail_para: 'Imagine you are about to purchase your favorite imported gadget or clothing brand...',
      blog_id: '05',
    },
    { heading:'An overview about IT industry in Trend',
      path: 'assets/Blogs/main_blog_page/An overview about IT industry in Trend.webp',
      detail_para: 'India has rapidly emerged as a global powerhouse in the Information Technology...',
      blog_id: '06',
    },
    {
      heading:'Export Opportunities in Emerging Markets for Small Businesses',
      path: 'assets/Blogs/main_blog_page/Export Opportunities in Emerging Markets for Small Businesses.webp',
      detail_para: 'In today’s interconnected world, small businesses have more opportunities than ever to exp...',
      blog_id: '01',
    },
    { heading:'Challenges and Solutions for small businesses in SCM',
      path: 'assets/Blogs/main_blog_page/Challenges and Solutions for small businesses in SCM.webp',
      detail_para: 'Supply chain management (SCM) is a critical element for any business, but it poses unique...',
      blog_id: '02',
    },
    { heading:'E-commerce Logistics Meets Retail Demands',
      path: 'assets/Blogs/main_blog_page/E-commerce Logistics Meets Retail Demands.webp',
      detail_para: 'In today’s fast-paced digital world, the fusion of e-commerce logistics with retail dema...',
      blog_id: '03',
    },
    { heading:'Government Initiatives for MSMEs in India: Nurturing Growth and Innovation',
      path: 'assets/Blogs/main_blog_page/Government Initiatives for MSMEs in India Nurturing Growth and Innovation.webp',
      detail_para: 'India’s Micro, Small, and Medium Enterprises (MSMEs) sector plays a critical role in...',
      blog_id: '04',
    }
    
  ];



  latest_blog = {
    "dots": true, // Enable dots/indicators
    "slidesToShow": 3, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 1600,
    "showArrow" : true,
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
      'breakpoint': 600,
      'settings': {
        'slidesToShow': 1
      }
    }
  ]
  };

  popular_blog = {
    "dots": true, // Enable dots/indicators
    "slidesToShow": 4, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 1800,
    "showArrow" : false,
    "responsive": [
    {
      'breakpoint': 1130,
      'settings': {
        'slidesToShow': 3
      }
    },
    {
      'breakpoint': 850,
      'settings': {
        'slidesToShow': 2
      }
    },
    {
      'breakpoint': 600,
      'settings': {
        'slidesToShow': 1
      }
    }
  ]
  };

  explore_by_category_blog = {
    "dots": true, // Enable dots/indicators
    "slidesToShow": 5, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 1800,
    "showArrow" : false,
    "responsive": [
      {
        'breakpoint': 1430,
        'settings': {
          'slidesToShow': 4
        }
      },
    {
      'breakpoint': 1130,
      'settings': {
        'slidesToShow': 3
      }
    },
    {
      'breakpoint': 850,
      'settings': {
        'slidesToShow': 2
      }
    },
    {
      'breakpoint': 600,
      'settings': {
        'slidesToShow': 1
      }
    }
  ]
  };
  
  slickInit(e:any) {  }
  
  breakpoint(e:any) {  }
  
  afterChange(e:any) {  }
  
  beforeChange(e:any) {  }

  DetailedBlog(news_id:any, i :any){

    const blog_title = this.get_latest_blog[i].heading.replace(/\s+/g, '-')
    this.router.navigate([`blogs/blog-detail/${blog_title}`],  { state: { news_id: news_id}} )
  }

}
