import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-order-cancelled',
  templateUrl: './order-cancelled.component.html',
  styleUrls: ['./order-cancelled.component.scss']
})
export class OrderCancelledComponent {

  
  shippingMode: any;
  Order_id: any;
  uid: string | null = null;
  detailsData: any;
  dataLoading: boolean = false;
  formData: any;
  constructor(public PaymentGatewayService: PaymentGatewayService,
    private auth: AuthService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private formDataService: FormDataService,) {

  }

  ngOnInit(): void {
    this.formData = this.formDataService.getShipmodeOrderId();
    
    this.shippingMode = this.formData.shipment_type;
    const title = this.shippingMode+' '+"Order Cancelled | Negbuy.com";
    this.titleService.setTitle(title);
    

    // alert(this.productId + this.sizeId + this.count + this.shippingMode)

    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
        
      }
      // this.BuyerAddress();
      if (this.formData.payWith == 'RazorPay') {
        this.Order_id = this.formData.order_id;
        this.paymentCancelledDetails()
      } else if (this.formData.payWith == 'Paypal') {
        

        let bodyToSend;
        if (this.shippingMode === 'DDP') {
          bodyToSend = {
            access_token: this.formData.access_token,
            paypal_order_id: this.formData.paypal_order_id,
            paypal_request_id: this.formData.paypal_request_id,
            instance_id: this.formData.instance_id,
            shipment_type: this.shippingMode
          };
        } else {
          bodyToSend = {
            access_token: this.formData.access_token,
            paypal_order_id: this.formData.paypal_order_id,
            paypal_request_id: this.formData.paypal_request_id,
            order_id: this.formData.order_id,
            shipment_type: this.shippingMode
          };
        }

        this.PaymentGatewayService.paypal_payment_details(bodyToSend).subscribe((res: any) => {
          
          if (res.status === false) {
            this.Order_id = res.data.order_id
            this.paymentCancelledDetails()
          }
        })
      }else{
        
        const DataSucessBody = {
          shipment_type: this.shippingMode
        };
        
        this.PaymentGatewayService.stripe_api_OrderId(DataSucessBody).subscribe((res:any)=>{
          
          this.Order_id = res.data.order_id;
         this.paymentCancelledDetails()
        })
        
      }
    });

    window.scrollTo(0, 0);
  }

  // BuyerAddressDelivery: any;
  // BuyerAddress() {
  //   const body = {
  //     user_id: this.uid
  //   }
  //   // alert( user_id)
  //   this.PaymentGatewayService.ProfileAddressData(body).subscribe((response: any) => {
  //     this.BuyerAddressDelivery = response.data;
      
  //   })
  // }

  imageUrl = 'https://negbuy.com:8080/media/';

  paymentCancelledDetails() {
    const DataSucessBody = {
      id: this.Order_id,
      shipment_type: this.shippingMode
    };

    

    this.PaymentGatewayService.paymentCancelledDetails(DataSucessBody).subscribe((response: any) => {
      
      this.detailsData = response.data;
      this.dataLoading = true;
      this.imageUrl = 'https://negbuy.com:8080' + this.detailsData.product_image
      if (this.detailsData) {
        
      } else {
        
      }
    });
  }

  private readonly apiurl = environment.apiurl2;
  imageSrc(value: any) {
    
    return this.apiurl + value
  }

  downloadPdf() {
    const pdfUrl =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    // const pdfUrl =
    //   "https://staging.safegold.com/display/sales-invoice/da771e90-aa8f-4147-bc7c-805b73bb1283";
    const pdfName = "invoice.pdf";
    FileSaver.saveAs(pdfUrl, pdfName);
  }


  toProduct(product_id:any) {
    window.open(`./products/${product_id}`);
  }

}
