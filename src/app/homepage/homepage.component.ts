import { Component, HostListener, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  constructor(private titleService: Title) { }

  defaultTitle!: string;
  ngOnInit() {
    window.scrollTo(0, 0)
    const title = "Negbuy: Online Marketplace For Wholesale Buyers & Suppliers | Latest Products";
    this.titleService.setTitle(title);
    this.defaultTitle = this.titleService.getTitle();
    window.scrollTo(0, 0)
  }

  show_section_zero_slide: boolean = false;
  show_section_first_slide: boolean = false;
  show_section_second_slide: boolean = false;
  show_section_third_slide: boolean = false;
  show_section_forth_slide: boolean = false;
  show_section_fifth_slide: boolean = false;
  show_section_sixth_slide: boolean = false;
  show_section_seventh_slide: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility('.show_section_zero', 'show_section_zero_slide');
    this.checkVisibility('.show_section_first', 'show_section_first_slide');
    this.checkVisibility('.show_section_second', 'show_section_second_slide');
    this.checkVisibility('.show_section_third', 'show_section_third_slide');
    this.checkVisibility('.show_section_forth', 'show_section_forth_slide');
    this.checkVisibility('.show_section_fifth', 'show_section_fifth_slide');
    this.checkVisibility('.show_section_sixth', 'show_section_sixth_slide');
    this.checkVisibility('.show_section_seventh', 'show_section_seventh_slide');
  }

  private checkVisibility(selector: string, flag: string) {
    const scrollElements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;

    scrollElements.forEach((element: any) => {
      const position = element.getBoundingClientRect().top;
      if (position < windowHeight - 100) {
        (this as any)[flag] = true;  // Use type assertion here
      } 
      // else {
      //   (this as any)[flag] = false; // Use type assertion here
      // }
    });
  }


}
