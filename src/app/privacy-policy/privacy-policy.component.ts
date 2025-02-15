import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(){

    const title = "Privacy Policy | Negbuy.com";
    this.titleService.setTitle(title);
    
}

}
