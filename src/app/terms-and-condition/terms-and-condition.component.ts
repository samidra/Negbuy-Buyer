import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(){

    const title = "Terms And Conditons | Negbuy.com";
    this.titleService.setTitle(title);
    
}
}
