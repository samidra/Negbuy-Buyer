import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-flow',
  templateUrl: './payment-flow.component.html',
  styleUrls: ['./payment-flow.component.scss']
})
export class PaymentFlowComponent {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(){

    const title = "Payment Flow | Negbuy.com";
    this.titleService.setTitle(title);
    
}

}
