import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Title } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonService } from 'src/app/service/common/common.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-ex-work-order-confirm',
  templateUrl: './ex-work-order-confirm.component.html',
  styleUrls: ['./ex-work-order-confirm.component.scss']
})
export class ExWorkOrderConfirmComponent {
  shippingMode: any;
  Order_id: any;
  uid: string | null = null;
  detailsData: any;
  dataLoading: boolean = false;

  imageUrl = 'https://negbuy.com:8080/media/';
  constructor(public PaymentGatewayService: PaymentGatewayService,
    private auth: AuthService,
    private router: Router,
    private formDataService: FormDataService,
    private titleService: Title,
    private comminservice: CommonService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    const title = "Ex-Work Order Confirmation | Negbuy.com";
    this.titleService.setTitle(title);

    this.shippingMode = this.route.snapshot.queryParamMap.get('shpMde');
    this.Order_id = this.route.snapshot.queryParamMap.get('ordrid');
    // alert(this.Order_id  + this.shippingMode)

    this.findUserLogin()

    window.scrollTo(0, 0)
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
      }
    }
    this.GetExWorkpaymentConfirmDetails()
  }

  GetExWorkpaymentConfirmDetails() {
    
    const DataSucessBody = {
      id: this.Order_id,
      shipment_type: this.shippingMode
    };

    this.PaymentGatewayService.GetDDPpaymentConfirmDetails(DataSucessBody).subscribe((response: any) => {
      this.detailsData = response.data;
      
      this.dataLoading = true;

      this.imageUrl = 'https://negbuy.com:8080' + this.detailsData.product_image
      if (this.detailsData.status) {

        
      } else {
        
      }
    });
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

  toProduct(product_id: any) {
    window.open(`./products/${product_id}`);
  }
  
  payNow() {
    
  
    const formBody1 = {
      quantity: this.detailsData.quantity,
      order_type: this.detailsData.delivery_option,
      payment_Mode: this.detailsData.payment_details,
      transport_mode: this.detailsData.delivery_option,
      delivery_address: this.detailsData.shipping_address,
      country: this.detailsData.country,
      state: this.detailsData.state,
      city: this.detailsData.city,
      pincode: this.detailsData.pincode,
    }

    this.formDataService.setFormData(formBody1)

    this.router.navigate([`../payment-details`], {
      relativeTo: this.route,
      queryParams: {
      instcid: this.detailsData.instance_id,
      ordrid: this.detailsData.order_id,
      shpMde: this.detailsData.delivery_option,
      pdctId: this.detailsData.product_id, 
      cnts:   this.detailsData.quantity
      }
    });
    window.scrollTo(0, 0);

  }
}
