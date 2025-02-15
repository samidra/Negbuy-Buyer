import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {
  private readonly apiurl = environment.apiurl;
  GlobalToken = '';
  user_id: string = '';
  globePincodeMap: any;
  private razorpayDataSubject = new BehaviorSubject<any>({});
  public razorpayData$: Observable<any> = this.razorpayDataSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router, private route: ActivatedRoute) {

  }


  // ShipRocket API

  public shipRocketGenerateAuthToken() {
    return this.http.get(this.apiurl + 'generate_auth_token')
  }

  DomesticCouriersAvailable(body: any) {
    // const bodya = {
    //    token: this.GlobalToken,
    //    pickup_pin: '201301',
    //    delivery_pin: '246729',
    //    weight: 5,
    //    mode: 'Surface'
    //  }

    return this.http.post(this.apiurl + 'domestic_couriers_available', body)
  }

  delivery_courier_rate(body: any){
    return this.http.post(this.apiurl + 'fetch_delivery_charges', body)
  }

  CreateCustomOrder(body2: any) {
    // const body2 = {
    //   token: this.GlobalToken,
    //   pay_mode: 'Prepaid',
    //   order_id: 'DDP-123456'
    // }
    return this.http.post(this.apiurl + 'create_custom_order', body2)
  }

  GetCityState(pinBody: any) {
    const user_id = this.user_id;

    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }

    return this.http.post(this.apiurl + `get_city_state_country_with_pincode`, pinBody, httpOptions)
  }

  GetGlobeCoordinates(body:any) {
    const user_id = this.user_id;

    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + `get_coordinates_for_globe`,body, httpOptions)
  }

  Get_city_by_LatLon(body: any) {
    return this.http.post(this.apiurl + 'fetch_globe_city', body)
  }

  SendOrderDetail(formBody: any,) {
    const user_id = this.user_id;
    
    const url = this.apiurl + `tracker_page_data`
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }

    return this.http.post(url, formBody, httpOptions)
  }

  GetpaymentpageDetails(BillDetails: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'payment_page', BillDetails, httpOptions)
  }

  PayNowDDP(PayNowDDPBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'ddp_click_on_pay_now', PayNowDDPBody, httpOptions)
  }

  CallbackRazorpayDDP(CallbackRazorpayDDPBody: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'ddp_callbackrazor', CallbackRazorpayDDPBody, httpOptions)
  }

  ExWorkOrders(ExWorkOrders: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'create_exwork_order', ExWorkOrders, httpOptions)
  }

  PayNowEXWORK(PayNowEXWORKBody: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'exwork_click_on_pay_now', PayNowEXWORKBody, httpOptions)
  }

  CallbackRazorpayEXWORK(CallbackRazorpayEXWORKBody: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'exwork_callbackrazor', CallbackRazorpayEXWORKBody, httpOptions)
  }

  ProfileAddressData(body: any) {
    return this.http.post(this.apiurl + 'buyer_profile_page', body)
  }

  GetDDPpaymentConfirmDetails(SucessBillDetails: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'Payment_success', SucessBillDetails, httpOptions)
  }

  getInvoiceDetails(invoiceDetails: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'invoice_data', invoiceDetails, httpOptions)
  }


  paymentCancelledDetails(SucessBillDetails: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'Payment_failure', SucessBillDetails, httpOptions)
  }


  storeRazorpayData(data: any) {
    this.razorpayDataSubject.next(data);
  }

  // PAYPAL API INTEGRATION FOR DDP

  paypalToken() {
    return this.http.get(this.apiurl + 'generate_paypal_access_token')
  }

  paypalCheckoutUrl(body: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'paypal_create_checkout_order', body, httpOptions)
  }

  paypal_payment_details(body: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'paypal_payment_details', body, httpOptions)
  }

  paypal_payment_capture(body: any) {
    return this.http.post(this.apiurl + 'capture_paypal_payment', body)
  }

  // STRIPE API INTEGRATION FOR DDP

  stripe_payment(body: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'stripe_payment', body, httpOptions)
  }

  stripe_api_OrderId(body: any) {
    const user_id = this.user_id;
    
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + 'provide_stripe_order', body, httpOptions)
  }

}
