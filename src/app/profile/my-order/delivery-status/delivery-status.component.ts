import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { interval, Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { NgForm } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonService } from 'src/app/service/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductpageService } from 'src/app/service/product/productpage.service';
@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss']
})
export class DeliveryStatusComponent {
  sectionLoaded = 0;
  loaderS: boolean = true;
  uid: string | null = null;

  constructor(private auth: AuthService,
    private titleService: Title,
    private formDataService: FormDataService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private productPage: ProductpageService,
    private PaymentGatewayService: PaymentGatewayService,
    private ProfileServiceService: ProfileServiceService) { }

  ngOnInit() {

    const title = "Order Delivery Status | Negbuy.com";
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)
    this.findUserLogin()
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
        this.productPage.user_id = this.uid
      }
    }
    this.BuyerAddress()
      this.MyOrderDeliveryStatus()
      this.order_delivery_status_breakpoint()
  }

  BuyerAddressDelivery: any;
  profile_pic: any;

  BuyerAddress() {

    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.BuyerAddressDelivery = this.formDataService.getLogInResponse()
      let url = "https://negbuy.com:8080"
      this.profile_pic = url + this.BuyerAddressDelivery.imageUrl
    }
  }

  myOrderRes: any

  MyOrderDeliveryStatus() {
    const formData = this.formDataService.getShipmodeOrderId();

    this.loaderS = true;
    const body = {
      shipment_type: formData.shipment_type,
      order_id: formData.order_id
    }
    this.ProfileServiceService.MyOrderDeliveryStatus(body).subscribe((response: any) => {
      this.myOrderRes = response.data;

      if(response.data.ask_for_docket == true){
        this.onClick('docket_number_submit_to_be')
       
      }else{
        window.scrollTo(0, 0)
      }
      
      this.loaderS = false;

      const dateObj = new Date(this.myOrderRes.ordered_on);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}T00:00:00`;

      // Set the target start date to August 25, 2024
      this.targetDate = new Date(formattedDate);

      // Set the end date to one day after the target date
      this.endDate = new Date(this.targetDate.getTime() + 6 * 24 * 60 * 60 * 1000);

      this.subscription = interval(1000).subscribe(() => {
        this.updateRemainingTime();
      });
      // this.formDataService.clearShipmodeOrderId();
    })
  }

  onClick(elementId: string): void {
    // this.viewportScroller.scrollToAnchor(elementId);

    const scrollTarget = document.getElementById(elementId);
    const scrollDistance = scrollTarget!.offsetTop - (window.innerHeight / 2) + 625;

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });

  }

  BreakpointRes: any
  order_delivery_status_breakpoint() {

    const formData = this.formDataService.getShipmodeOrderId();
    this.loaderS = true;
    const body = {
      order_id: formData.order_id
    }

    if(formData.shipment_type === 'ExWork'){
      this.ProfileServiceService.exwork_order_delivery_status(body).subscribe((response: any) => {
        this.BreakpointRes = response.data;
        this.loaderS = false;
        // this.formDataService.clearShipmodeOrderId();
      })
    }else{
      this.ProfileServiceService.ddp_order_delivery_status(body).subscribe((response: any) => {
        this.BreakpointRes = response.data;
        this.loaderS = false;
        // this.formDataService.clearShipmodeOrderId();
      })
    }
    
  }

  getOrderKeys(order: any): string[] {
    return Object.keys(order);
  }

  showcontent(value: number) {
    this.sectionLoaded = value;
    window.scrollTo(0, 0)
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

  private targetDate!: Date;
  private endDate!: Date;
  private subscription!: Subscription;

  remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private previousHours!: number | null;
  private previousMinutes!: number | null;
  private previousSeconds!: number | null;

  public flipHours = false;
  public flipMinutes = false;
  public flipSeconds = false;
  timeLeft: any;
  isTime_up:boolean = false;
  private updateRemainingTime(): void {
    const now = new Date().getTime();
    this.timeLeft = this.endDate.getTime() - now;

    const newTime = {
      days: Math.floor(this.timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((this.timeLeft % (1000 * 60)) / 1000)
    };

    // Trigger flip animations on value changes
    if (newTime.hours !== this.previousHours) {
      this.flipHours = true;
      setTimeout(() => this.flipHours = false, 500);
    }

    if (newTime.minutes !== this.previousMinutes) {
      this.flipMinutes = true;
      setTimeout(() => this.flipMinutes = false, 500);
    }

    if (newTime.seconds !== this.previousSeconds) {
      this.flipSeconds = true;
      setTimeout(() => this.flipSeconds = false, 500);
    }

    // Update previous values
    this.previousHours = newTime.hours;
    this.previousMinutes = newTime.minutes;
    this.previousSeconds = newTime.seconds;

    if (this.timeLeft <= 0) {
      // Time is up
      this.remainingTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      this.isTime_up = true; // Ensure the flag is set when time is up
    } else {
      if (newTime.days < 1) {
        // Show time only if less than 1 day remaining
        this.remainingTime = {
          days: 0,
          hours: newTime.hours,
          minutes: newTime.minutes,
          seconds: newTime.seconds
        };
      } else if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        // If exactly at midnight, mark time as up
        this.isTime_up = true;
      } else {
        // Show only the number of days remaining if more than 1 day
        this.remainingTime = {
          days: newTime.days,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
    }
    
  }


  submitDocketDetailsLoader: boolean = false
  OrderDocketNumber: any;
  DocketFile = {
    show:  '',
    upload: '',
  }
  file!: File;

  getFormattedDateTime(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Save the formatted date in the formattedDateTime variable
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  SubmitDocketDetails(ngform: NgForm) {

    const currentDate = this.getFormattedDateTime();

    const DocketDetailsBody: FormData = new FormData();
    DocketDetailsBody.append('docket_number', this.OrderDocketNumber?.toString());
    DocketDetailsBody.append('docket_file', this.DocketFile.upload);
    DocketDetailsBody.append('order_id', this.myOrderRes.order_id);
    DocketDetailsBody.append('docket_upload_date', currentDate);

    // Log all values in the FormData
    DocketDetailsBody.forEach((value, key) => {
     console.log(`${key}: ${value}`);
     });

    if (ngform.form.valid) {
      this.submitDocketDetailsLoader = true
      this.ProfileServiceService.SubmitDocketDetails(DocketDetailsBody).subscribe((response: any) => {
        
        if (response.status != 'Error') {

          this.submitDocketDetailsLoader = false;
          this.commonService.displaySuccess('Docket Details Submited Successfully');
          this.MyOrderDeliveryStatus()
          this.order_delivery_status_breakpoint()
        } else {
          this.submitDocketDetailsLoader = false;
          this.commonService.displayWarning('Please try again');
        }
      });
    } else {
      this.commonService.displayWarning('Please  provide docket number & file before proceed');
    }
  }


  CheckI(event: any) {

    let file = event.target.files[0];

    if (file) {
      this.DocketFile.upload = file

      const reader = new FileReader();
        reader.onload = (e: any) => {
          this.DocketFile =
          {
            'show': e.target.result,
            'upload': file,
          }
  
        };
        reader.readAsDataURL(file);

    }

    
  }


  docketFileInput(a: any, b: any) {

    return a + b.toString()
  }
  

  subject_message = '';
  text_message = '';
  isproblemSubmit : boolean  = true
  submitproblemForm(){
    if(this.subject_message != '' && this.text_message != ''){
      this.isproblemSubmit  = false
      const order_feedback_body= {
        order_type : this.myOrderRes.order_type,
        order_id : this.myOrderRes.order_id ,
        subject : this.subject_message,
        desc : this.text_message,
      }
      
      
      this.productPage.order_feedback(order_feedback_body).subscribe((response: any) => {
        
        if (response.status != 'Error') {
          this.isproblemSubmit  = true
          this.commonService.displaySuccess('Issue received. We will get back to you shortly.');
          this.MyOrderDeliveryStatus()
          this.order_delivery_status_breakpoint()
        } else {
          this.isproblemSubmit  = true
          this.commonService.displayWarning('Please try again');
        }
      });
     
    }else{
      this.commonService.displayWarning('Kindly enter your message before you submit.')
    }

    }

  selectedDataForPayNow: any;
  spinnerBuyNow: boolean = true
  payNow() {

    this.spinnerBuyNow = false;

    const formBody1 = {
      quantity: this.myOrderRes.quantity,
      order_type: this.myOrderRes.order_type,
      payment_Mode: 'Pay Later',
      transport_mode: 'By Air',
      delivery_address: this.myOrderRes.shipping_address,
      country: this.myOrderRes.country,
      state: this.myOrderRes.state,
      city: this.myOrderRes.city,
      pincode: this.myOrderRes.pincode,
    }

    this.formDataService.setFormData(formBody1)

    this.router.navigate([`../../products/${this.myOrderRes.size_id}/payment-details`], {
      relativeTo: this.route,
      queryParams: {
        instcid: this.myOrderRes.instance_id,
        ordrid: this.myOrderRes.order_id,
        shpMde: this.myOrderRes.order_type,
        pdctId: this.myOrderRes.product_id, 
        cnts: this.myOrderRes.quantity,
      }
    });
    window.scrollTo(0, 0);

  }


  invoiceData:any;
  showButtonInvoice:boolean = true;
  downloadPDF2() {
    this.showButtonInvoice = false
    const DataSucessBody = {
      shipment_type: this.myOrderRes.order_type,
      order_id: this.myOrderRes.order_id
    }

    new Promise<void>((resolve, reject) => {
      this.PaymentGatewayService.getInvoiceDetails(DataSucessBody).subscribe((res: any) => {
          this.invoiceData = res;
          if (this.invoiceData.status) {
            resolve();
          } else {
            reject("Invoice status is false");
          }
        },
        (error) => {
          reject("Error fetching invoice details: " + error);
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
        this.showButtonInvoice = true
      });
  }

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
        this.showButtonInvoice = true
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, 446.46, 618.59632892804694);
        pdf.save('Invoice.pdf');
        this.showButtonInvoice = true
      });
    } else {
      console.error('Content not found!');
      this.showButtonInvoice = true
    }
  }

  scrollPaynow(elementId: string): void {
    const scrollTarget = document.getElementById(elementId);
    const scrollDistance = scrollTarget!.offsetTop - (window.innerHeight / 2) + 905;

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });

  }
  
  ratingCount!: number;
  SubmitYourReview = {
    ReviewDetail: '',
    ReviewHeadling: '',
    starvalue: 0,
  }

  showReviewBoxIndex: number | null = null;
  rateAndReviewBox(index: any) {
    this.showReviewBoxIndex = (this.showReviewBoxIndex === index) ? null : index
  }

  submitReviewLoader: Boolean = false;
  invalidAlert: boolean = false
  submitReview() {

    this.submitReviewLoader = true
    const ReviewBody: FormData = new FormData();
    ReviewBody.append('main_product_id', this.myOrderRes.product_id);
    ReviewBody.append('review_title', this.SubmitYourReview.ReviewDetail);
    ReviewBody.append('review_description', this.SubmitYourReview.ReviewDetail);
    ReviewBody.append('rating', this.SubmitYourReview.starvalue.toString());

    if (this.SubmitYourReview.starvalue !== 0 && this.SubmitYourReview.ReviewDetail !== '') {
      this.invalidAlert = false
      this.productPage.productReviewSubmittion(ReviewBody).subscribe((res: any) => {
        if (res) {

          this.commonService.displaySuccess('Review submitted sucessfully');
          this.MyOrderDeliveryStatus()
          this.order_delivery_status_breakpoint()
          this.submitReviewLoader = false
          this.SubmitYourReview.starvalue = 0;
          this.SubmitYourReview.ReviewDetail = "";
        } else {

          this.submitReviewLoader = false
        }

      })
    } else {
      this.submitReviewLoader = false
      this.invalidAlert = true
    }
  }
}
