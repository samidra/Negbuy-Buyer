import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-ddp-payment-confirm',
  templateUrl: './ddp-payment-confirm.component.html',
  styleUrls: ['./ddp-payment-confirm.component.scss']
})
export class DdpPaymentConfirmComponent {

  shippingMode: any;
  Order_id: any;
  uid: string | null = null;
  detailsData: any;
  dataLoading: boolean = false;
  formData: any;
  constructor(public PaymentGatewayService: PaymentGatewayService,
    private auth: AuthService,
    private comminservice: CommonService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private formDataService: FormDataService,) {

  }

  ngOnInit(): void {
    this.formData = this.formDataService.getShipmodeOrderId();
    
    this.shippingMode = this.formData.shipment_type;
    const title = this.shippingMode+' '+"Order Confirmation | Negbuy.com";
    this.titleService.setTitle(title);
    

    // alert(this.productId + this.sizeId + this.count + this.shippingMode)

    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
        
      }
      this.BuyerAddress();
      if (this.formData.payWith == 'RazorPay') {
        this.Order_id = this.formData.order_id;
        this.GetDDPpaymentConfirmDetails()
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
          
          if (res.status) {
            this.Order_id = res.data.order_id
            this.GetDDPpaymentConfirmDetails()

            const bodyToCapturePayment = {
              access_token: this.formData.access_token,
              paypal_order_id: this.formData.paypal_order_id,
              paypal_request_id: this.formData.paypal_request_id,
            };

            this.PaymentGatewayService.paypal_payment_capture(bodyToCapturePayment).subscribe((res:any)=>{
            
            })

          }
        })
        
      }else{
        
        const DataSucessBody = {
          shipment_type: this.shippingMode
        };
        
        this.PaymentGatewayService.stripe_api_OrderId(DataSucessBody).subscribe((res:any)=>{
          
          this.Order_id = res.data.order_id;
         this.GetDDPpaymentConfirmDetails()
        })
        
      }
    });

    window.scrollTo(0, 0);
  }

  BuyerAddressDelivery: any;
  BuyerAddress() {
    const body = {
      user_id: this.uid
    }
    // alert( user_id)
    this.PaymentGatewayService.ProfileAddressData(body).subscribe((response: any) => {
      this.BuyerAddressDelivery = response.data;
      
    })
  }

  imageUrl = 'https://negbuy.com:8080/media/';

  GetDDPpaymentConfirmDetails() {
    const DataSucessBody = {
      id: this.Order_id,
      shipment_type: this.shippingMode
    };

    this.PaymentGatewayService.GetDDPpaymentConfirmDetails(DataSucessBody).subscribe((response: any) => {
      
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

  invoiceData: any;
  showButtonInvoice: boolean = true;

  generateInvoice() {
    const element = document.getElementById('content');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        });
        this.comminservice.displaySuccess('Your patience is appreciated; please hold for a moment.')
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, 446.46, 618.59632892804694);
        pdf.save('Invoice.pdf');
        this.spinnerInvoice = true;
      });
    } else {
      this.spinnerInvoice = true;
      console.error('Content not found!');
    }
  }


  spinnerInvoice: boolean= true
  downloadPDF2() {
    this.spinnerInvoice = false;
    const DataSucessBody = {
      shipment_type: this.shippingMode,
      order_id: this.Order_id
    };

    new Promise<void>((resolve, reject) => {
      this.PaymentGatewayService.getInvoiceDetails(DataSucessBody).subscribe(
        (res: any) => {
          this.invoiceData = res;

          if (this.invoiceData.status) {
            resolve();
          } else {
            reject("Invoice status is false");
            this.spinnerInvoice = true;
          }
        },
        (error) => {
          reject("Error fetching invoice details: " + error);
          this.spinnerInvoice = true;
        }
      );
    })
      .then(() => {
        // Use requestAnimationFrame to optimize DOM updates
        requestAnimationFrame(() => {
          this.generateInvoice();
        });
      })
      .catch(error => {
        console.error(error);
        this.spinnerInvoice = true;
      });

  }

  toProduct(product_id:any) {
    window.open(`./products/${product_id}`);
  }
  
}

