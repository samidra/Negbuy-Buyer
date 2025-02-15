import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private readonly apiurl = environment.apiurl;
  GlobalToken = '';
  user_id: string = '';
  constructor(private http: HttpClient) { }

  GetProfileData(body: any) {
    return this.http.post(this.apiurl + 'buyer_profile_page', body)
  }

  UpdateProfileData(ProfileUpdateBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'buyer_profile_update', ProfileUpdateBody, httpOptions)
  }

  VerifyEmail(emailBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'buyer_send_email_verification_email', emailBody, httpOptions)
  }

  MyOrder() {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'buyer_all_orders', httpOptions)
  }

  MyOrderDeliveryStatus(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'order_status', body, httpOptions)
  }

  exwork_order_delivery_status(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'exwork_order_delivery_status', body, httpOptions)
  }

  ddp_order_delivery_status(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'ddp_order_delivery_status', body, httpOptions)
  }

  ReturnProduct() {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'buyer_returned_products', httpOptions)
  }

  submitReturnRequest(returnRequestBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'buyer_submit_return_request', returnRequestBody, httpOptions)
  }

  MyRFQs() {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'get_all_rfq', httpOptions)
  }

  SubmitRFQs(formBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'homepage_add_rfq', formBody, httpOptions)
  }

  MyNotification() {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'buyer_notification', httpOptions)
  }

  NewsBlog() {
    return this.http.get(this.apiurl + 'detailed_homepage_news');
  }

  SubmitDocketDetails(DocketDetails: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'buyer_submit_docket_number', DocketDetails, httpOptions)
  }

  subscribeForNewsLetter(emailNewsletter: any) {
    return this.http.post(this.apiurl + 'newsletter_subscribe_email', emailNewsletter)
  }

  get_all_blog_comment(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'blog_like_comments', body, httpOptions)
  }


  save_blog_comment(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'blog_add_like_comment', body, httpOptions)
  }

}
