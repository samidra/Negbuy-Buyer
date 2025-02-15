import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-ourserices',
  templateUrl: './ourserices.component.html',
  styleUrls: ['./ourserices.component.scss']
})
export class OursericesComponent {

  constructor(private titleService: Title){  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    
    // Set the new title
    const title = "Services | Negbuy.com"
    this.titleService.setTitle(title);
    }
  
}
