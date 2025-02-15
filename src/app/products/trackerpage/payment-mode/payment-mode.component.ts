import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { ProductpageService } from 'src/app/service/product/productpage.service';
import { WindowRefService } from 'src/app/service/razorpay/window-ref.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { Title } from '@angular/platform-browser';
import { timeThursday } from 'd3';



@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss']
})
export class PaymentModeComponent implements OnInit {
  // statusClass = 'selectpaymentmethod-box';   
  sectionLoaded = 0;
  shippingMode: any;
  ButtonmodeShow = '';
  token = ''
  tokenID = ''
  GetOrderDetail: any;
  order_id: any;
  instance_id: any;
  productDeliveryMode: any;
  RazorpayKeyOutput: any;
  RazorpayKeyOutputExwork: any;
  uid: string | null = null;
  spinnerBuyNow: boolean = true
  // showError: boolean = false;
  private unsubscriber: Subject<void> = new Subject<void>();
  productId: any;
  sizeId: any;
  count: any;
  ProductWeight: any;
  OrderAddressDetails: any

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private winRef: WindowRefService, 
    private formDataService: FormDataService,
    private auth: AuthService, 
    private PaymentGatewayService: PaymentGatewayService, 
    private ProductpageService: ProductpageService,
    private titleService: Title,) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {


    const title = "Make Payment | Negbuy.com";
    this.titleService.setTitle(title);
    this.loadRazorpayScript();
    this.formDataService.clearShipmodeOrderId();

    this.instance_id = this.route.snapshot.queryParamMap.get('instcid');
    this.shippingMode = this.route.snapshot.queryParamMap.get('shpMde');
    this.productId = this.route.snapshot.queryParamMap.get('pdctId') || 0;;
    this.sizeId = this.route.snapshot.queryParamMap.get('szid') || 0;;
    this.count = this.route.snapshot.queryParamMap.get('cnts') || 0;;
    this.ProductWeight = this.route.snapshot.queryParamMap.get('wtg') || 0;;

    // alert(this.productId + this.sizeId + this.count + this.shippingMode +  this.ProductWeight)

    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProductpageService.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
      }
      // this.PayDDP();
      this.GetBillDetail();
      this.shipRocketToken();
    });

    this.token = this.PaymentGatewayService.GlobalToken
    

    if (this.formDataService.getFormData() != null) {
      this.OrderAddressDetails = this.formDataService.getFormData();
      this.shippingMode = this.OrderAddressDetails.order_type;
      
    }

    if (this.shippingMode == 'DDP' && this.OrderAddressDetails.country != 'India') {
      window.scrollTo(0, 0);
      this.selectedPaymentOption = 'Paypal';
      this.selected_payment_type = 2
    }else if(this.shippingMode == 'DDP' && this.OrderAddressDetails.country == 'India'){
      window.scrollTo(0, 0);
      this.selectedPaymentOption = 'RazorPay';
      this.selected_payment_type = 3
    } else if (this.OrderAddressDetails.payment_Mode === 'Pay Later' && this.OrderAddressDetails.country == 'India') {
      window.scrollTo(0, 0);
      this.selectedPaymentOption = 'RazorPay';
      this.selected_payment_type = 3
    }else if (this.OrderAddressDetails.payment_Mode === 'Pay Later' && this.OrderAddressDetails.country != 'India') {
      window.scrollTo(0, 0);
      this.selectedPaymentOption = 'RazorPay';
      this.selected_payment_type = 3
    } else {
      window.scrollTo(0, 0);
      this.selected_payment_type = 1
      this.selectedPaymentOption = 'Pay later at Delivery';
    }

    history.pushState(null, '');
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
        alert("You can't go back at this time.!")
      });

  }

   // Method to dynamically load the Razorpay script
   private razorpayScriptId = 'razorpay-script';  // Unique ID for the script
   loadRazorpayScript() {
    if (!document.getElementById(this.razorpayScriptId)) {
      const script = document.createElement('script');
      script.id = this.razorpayScriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  val: any
  data: any

  shipRocketToken() {
    
    this.PaymentGatewayService.shipRocketGenerateAuthToken().subscribe((res: any) => {
      if (res.status) {
        res.data.token;
        this.token = res.data.token;
        this.tokenID = res.data.id;
        
        this.CreateCustomOrder()

      }
    });
  }

  CreateCustomOrder() {
    const body2 = {
      token: this.token,
      pay_mode: 'Prepaid',
      order_id: this.tokenID
    }

    this.PaymentGatewayService.CreateCustomOrder(body2).subscribe((response: any) => {
      this.GetOrderDetail = response.data;
      if (this.GetOrderDetail.status) {
        this.order_id = this.GetOrderDetail.order_id
        
      }
    })
  }

  BillDetail: any;
  loadingBillDetails: boolean = false
  resCreateExworkOrder: any
  GetBillDetail() {
    const BillDetails = {
      instance_id: this.instance_id,
    }
    
    this.PaymentGatewayService.GetpaymentpageDetails(BillDetails).subscribe((response: any) => {
      
      if (response.status) {
        this.BillDetail = response.data;
        this.loadingBillDetails = true
        
        if (this.shippingMode == 'Ex-work') {
          this.BillDetail.delivery_charge = 0

        }
      }
      else {

        this.loadingBillDetails = false
        
      }
    })
  }

  PayNowDDPBody: any
  PayDDP() {
    
    const DDPpayBody = {
      instance_id: this.instance_id,
    }
    

    this.PaymentGatewayService.PayNowDDP(DDPpayBody).subscribe((response: any) => {
      this.PayNowDDPBody = response.data;
      
      if (response.status) {
        
      }
      else {
        
      }
    })
  }

  CallbackRazorpayData: any;
  CallbackRazorpayDDP() {
    const CallbackRazorpayDDPBody = {
      instance_id: this.instance_id,
      razorpay_payment_id: this.RazorpayKeyOutput.razorpay_payment_id,
      razorpay_order_id: this.RazorpayKeyOutput.razorpay_order_id,
      razorpay_signature: this.RazorpayKeyOutput.razorpay_signature,
    }
    

    this.PaymentGatewayService.CallbackRazorpayDDP(CallbackRazorpayDDPBody).subscribe((response: any) => {
      this.CallbackRazorpayData = response.data;
      if (this.CallbackRazorpayData) {
        this.formDataService.clearFormData();

        const data = {
          shipment_type: this.shippingMode,
          order_id: this.CallbackRazorpayData.order_id,
          payWith: this.selectedPaymentOption
        }
        this.formDataService.setShipmodeOrderId(data)

        this.router.navigate(['../order-confirm-detail'], {
          queryParams: {
            shpMde: this.shippingMode,
            ordrid: this.CallbackRazorpayData.order_id
          }, relativeTo: this.route
        })
        
        this.spinnerBuyNow = true
      }
      else {
        const data = {
          shipment_type: this.shippingMode,
          order_id: this.CallbackRazorpayData.order_id,
          payWith: this.selectedPaymentOption
        }
        this.formDataService.setShipmodeOrderId(data)
        
        
      }
    })
  }

  payWithRazor() {
    this.spinnerBuyNow = false
    
    const DDPpayBody = {
      instance_id: this.instance_id,
    }
    

    this.PaymentGatewayService.PayNowDDP(DDPpayBody).subscribe((response: any) => {
      this.PayNowDDPBody = response.data;
      
      if (response.status) {
        

        if (this.order_id != undefined) {
          const options: any = {
            key: 'rzp_live_dSX7NwKGB9y6Fp',
            amount: this.PayNowDDPBody.amount, // amount should be in paise format to display Rs 1255 without decimal point
            currency: this.PayNowDDPBody.currency,
            name: 'Negbuy', // company name or product name
            description: 'Test Transaction',  // product description
            image: '../../assets/header/trial_img/Icon_Logo-removebg-preview 1.png', // company logo or product image
            order_id: this.PayNowDDPBody.order_id, // order_id created by you in backend
            modal: {
              // We should prevent closing of the form when esc key is pressed.
              escape: false,
            },
            notes: {
              "address": "Razorpay Corporate Office"
            },
            theme: {
              color: '#F54646'
            }
          };
          options.handler = ((response: any, error: any) => {
            options.response = response;
            this.RazorpayKeyOutput = response;
            
            if (this.RazorpayKeyOutput.razorpay_payment_id.length) {
              
              this.CallbackRazorpayDDP();

            } else {
              
              this.spinnerBuyNow = true
            }
            
            // call your backend api to verify payment signature & capture transaction
          });
          options.modal.ondismiss = (() => {
            // handle the case when user closes the form while transaction is in progress
            this.spinnerBuyNow = true
            
          });
          const rzp = new this.winRef.nativeWindow.Razorpay(options);
          rzp.open();
          this.spinnerBuyNow = true
        }
        else {
          
          this.spinnerBuyNow = true
        }

      }
      else {
        
        this.spinnerBuyNow = true
      }
    })

  }

  order_id_Ex_work!: string;
  CallbackRazorpayDatas: any;
  PayNowEXWORKBodyData: any;
  CallbackRazorpayEXWORK() {
    const CallbackRazorpayEXWORKBody = {
      id: this.order_id_Ex_work,
      razorpay_payment_id: this.RazorpayKeyOutputExwork.razorpay_payment_id,
      razorpay_order_id: this.RazorpayKeyOutputExwork.razorpay_order_id,
      razorpay_signature: this.RazorpayKeyOutputExwork.razorpay_signature,
    };

    

    this.PaymentGatewayService.CallbackRazorpayEXWORK(CallbackRazorpayEXWORKBody).subscribe((response: any) => {
      this.CallbackRazorpayDatas = response;
      if (this.CallbackRazorpayDatas.status) {

        const data = {
          shipment_type: 'Ex-work',
          order_id: this.order_id_Ex_work,
          payWith: this.selectedPaymentOption
        }
        this.formDataService.setShipmodeOrderId(data)

        this.router.navigate(['../order-confirm-detail'], {
          queryParams: {
            shpMde: 'Ex-work',
            ordrid: this.order_id_Ex_work
          }, relativeTo: this.route
        })
        
        this.spinnerBuyNow = true
      } else {

        const data = {
          shipment_type: 'Ex-work',
          order_id: this.order_id_Ex_work,
          payWith: this.selectedPaymentOption
        }
        this.formDataService.setShipmodeOrderId(data)

        
      }
    });
  }

  payWithRazorEXWORK() {
    this.spinnerBuyNow = false;

    let bodyExWorkOrder;
    if (this.OrderAddressDetails.payment_Mode != 'Pay Later') {
      bodyExWorkOrder = {
        instance_id: this.instance_id, // Make sure this is defined
      };
    } else {

      bodyExWorkOrder = {
        order_id: this.route.snapshot.queryParamMap.get('ordrid'), // Make sure this is defined
      };
    }
    

    this.PaymentGatewayService.ExWorkOrders(bodyExWorkOrder).subscribe((response: any) => {
      
      this.resCreateExworkOrder = response


      if (this.resCreateExworkOrder.status) {

        this.order_id_Ex_work = response.data.id;

        const PayNowEXWORKBody = {
          order_id: this.order_id_Ex_work, // Use the correct variable name
        };

        

        this.PaymentGatewayService.PayNowEXWORK(PayNowEXWORKBody).subscribe((res: any) => {
          this.PayNowEXWORKBodyData = res.data;
          

          if (res.status) {
            const options: any = {
              key: 'rzp_live_dSX7NwKGB9y6Fp',
              amount: this.PayNowEXWORKBodyData.total_amount * 100,
              currency: this.PayNowEXWORKBodyData.currency,
              name: 'Negbuy',
              description: 'Test Transaction',
              image: '../../assets/header/trial_img/Icon_Logo-removebg-preview 1.png',
              order_id: this.PayNowEXWORKBodyData.order_id,
              modal: {
                escape: false,
              },
              notes: {
                address: 'Razorpay Corporate Office',
              },
              theme: {
                color: '#F54646',
              },
            };

            options.handler = (response: any) => {
              
              this.RazorpayKeyOutputExwork = response
              if (response.razorpay_payment_id) {
                
                this.CallbackRazorpayEXWORK();
                this.router.navigate([`ex-work-payment-confirm`]);
              } else {
                console.error('Payment Failed');
                this.spinnerBuyNow = true
              }
            };

            options.modal.ondismiss = () => {
              this.spinnerBuyNow = true
              
            };
            this.spinnerBuyNow = true
            const rzp = new this.winRef.nativeWindow.Razorpay(options);
            rzp.open();
            this.spinnerBuyNow = true
          } else {
            
            this.spinnerBuyNow = true
          }
        });
      } else {
        
        this.spinnerBuyNow = true
      }

    });



  }

  Tobuynow() {
    this.router.navigate(['../buy-now'], { queryParams: { instcid: this.instance_id, product_id: this.productId, count: this.count, sizeId: this.sizeId, wgt: this.ProductWeight }, relativeTo: this.route })
    window.scrollTo(0, 0);
  }

  ExWorkConfirm() {
    this.spinnerBuyNow = false;
    
    let bodyExWorkOrder;
    if (this.OrderAddressDetails.payment_Mode != 'Pay Later') {
      bodyExWorkOrder = {
        instance_id: this.instance_id, // Make sure this is defined
      };
    } else {

      bodyExWorkOrder = {
        order_id: this.route.snapshot.queryParamMap.get('ordrid'), // Make sure this is defined
      };
    }
    

    this.PaymentGatewayService.ExWorkOrders(bodyExWorkOrder).subscribe((response: any) => {
      
      this.resCreateExworkOrder = response
      if (this.resCreateExworkOrder.status) {
        this.order_id_Ex_work = response.data.id;
        this.router.navigate(['../ex-work-order-confirm'], {
          queryParams: {
            shpMde: 'Ex-work',
            ordrid: this.order_id_Ex_work
          }, relativeTo: this.route
        })

      } else {
        this.spinnerBuyNow = true
      }

    });


  }

  toProduct() {
    window.open(`./products/${this.productId}`);
  }

  selectedPaymentOption = "";
  selected_payment_type: any
  logSelectedOption(num: any) {
   this.selected_payment_type = num
    
  }

  // PAYPAL INTEGRATION FOR PAYMENT 

  payWithPaypal() {
    this.spinnerBuyNow = false
    this.PaymentGatewayService.paypalToken().subscribe((res1: any) => {
      if (res1 && this.shippingMode == 'DDP') {

        const paypalBody = {
          access_token: res1.access_token,
          instance_id: this.instance_id,
          quantity: this.BillDetail.quantity,
          amount: this.BillDetail.total_amount,
          shipment_type: this.shippingMode,
        }

        this.PaymentGatewayService.paypalCheckoutUrl(paypalBody).subscribe((res: any) => {
          if (res) {

            const data = {
              access_token: res1.access_token,
              instance_id: this.instance_id,
              paypal_order_id: res.paypal_order_id,
              paypal_request_id: res.paypal_request_id,
              shipment_type: this.shippingMode,
              payWith: this.selectedPaymentOption
            }

            this.formDataService.setShipmodeOrderId(data)
            window.open(res.checkout_url, "_self");
            this.spinnerBuyNow = true

          }
        })
      } else if (res1 && this.shippingMode != 'DDP') {

        let bodyExWorkOrder;
        if (this.OrderAddressDetails.payment_Mode != 'Pay Later') {
          bodyExWorkOrder = {
            instance_id: this.instance_id, // Make sure this is defined
          };
        } else {

          bodyExWorkOrder = {
            order_id: this.route.snapshot.queryParamMap.get('ordrid'), // Make sure this is defined
          };
        }

        

        this.PaymentGatewayService.ExWorkOrders(bodyExWorkOrder).subscribe((response: any) => {
          
          this.resCreateExworkOrder = response

          if (this.resCreateExworkOrder.status) {

            this.order_id_Ex_work = response.data.id;

            const paypalBody = {
              access_token: res1.access_token,
              order_id: this.order_id_Ex_work,
              quantity: this.BillDetail.quantity,
              amount: this.BillDetail.total_amount,
              shipment_type: this.shippingMode,
            }

            this.PaymentGatewayService.paypalCheckoutUrl(paypalBody).subscribe((res: any) => {
              
              if (res) {

                const data = {
                  access_token: res1.access_token,
                  order_id: this.order_id_Ex_work,
                  paypal_order_id: res.paypal_order_id,
                  paypal_request_id: res.paypal_request_id,
                  shipment_type: 'Ex-Work',
                  payWith: this.selectedPaymentOption
                }

                this.formDataService.setShipmodeOrderId(data)
                window.open(res.checkout_url, "_self");
                this.spinnerBuyNow = true
              }
            })


          } else {
            this.spinnerBuyNow = true
          }

        });

      }
    })
  }

}
