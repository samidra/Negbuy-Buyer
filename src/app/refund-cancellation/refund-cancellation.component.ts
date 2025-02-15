import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-refund-cancellation',
  templateUrl: './refund-cancellation.component.html',
  styleUrls: ['./refund-cancellation.component.scss']
})
export class RefundCancellationComponent {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {

    const title = "Refund Cancellation | Negbuy.com";
    this.titleService.setTitle(title);

  }
}
