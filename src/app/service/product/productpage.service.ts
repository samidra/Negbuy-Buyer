import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpBackend, } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductpageService {
  private readonly apiurl = environment.apiurl;
  errorData: {} | undefined;
  productbyId!: number;
  shippingMode = '';
  user_id: string = '';
  constructor(private http: HttpClient, handler: HttpBackend) {
    this.errorData = {};
    this.http = new HttpClient(handler);
  }

  getProductById(productId: number): Observable<any> {
    
    this.productbyId = productId
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }

    return this.http.get(
      this.apiurl + 'product_details_page?product_id=' + productId , httpOptions
    );
   
  }

  getProductimageDesbyProductId(imageDescBody: any) {
    const product_id = this.productbyId
    let httpParams = new HttpParams().set('product_id', product_id.toString());
    let httpOptions = {
      params: httpParams
    }
    

    // Send the POST request with the JSON payload and headers
    return this.http.post(
      this.apiurl + 'product_details_page_img_desc', imageDescBody, httpOptions);

  }

  SelectedProductData: any = {}

  // getProductimageDesbyProductId(productId: number): Observable<any> {
  //   

  //   // const payload = { product_id: productId };
  //   return this.http.post(
  //     this.apiurl + 'product_details_page_img_desc?product_id=' , productId
  //   );
  //   // return this.http.get("https://jsonplaceholder.typicode.com/users"+productId)
  // }

  productReviewSection(payload = { product_id: this.productbyId }) {
    

    // Convert the payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Set the Content-Type header to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the JSON payload and headers
    return this.http.post<any>(
      this.apiurl + 'product_details_page_review_section',
      payloadString,
      { headers: headers }
    );
  }

  productReviewAnalysis(payload = { product_id: this.productbyId }) {
    

    // Convert the payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Set the Content-Type header to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the JSON payload and headers
    return this.http.post<any>(
      this.apiurl + 'product_details_page_review_analysis',
      payloadString,
      { headers: headers }
    );
  }

  productBasicInfo(payload = { product_id: this.productbyId }) {
    

    // Convert the payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Set the Content-Type header to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the JSON payload and headers
    return this.http.post<any>(
      this.apiurl + 'product_details_page_head_desc_details',
      payloadString,
      { headers: headers }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.',
    };
    return throwError(this.errorData);
  }


  clickOnBuyNow(bodyByNow: any) {
    const user_id = this.user_id;
    const url = this.apiurl + `click_on_buy_now`;
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }

    return this.http.post(url, bodyByNow, httpOptions)
  }

  getProductDataByCategory(CategoryBody: any) {
    return this.http.post(this.apiurl + `homepage_single_category_products`, CategoryBody)
  }


  getProductDataBySubCategory(CategoryBody: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }

    return this.http.post(this.apiurl + `category_specific_products`, CategoryBody, httpOptions)
  }

  get_product_data_by_my_recommendation() {
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    
    return this.http.get(this.apiurl + `buyer_recommended_products`, httpOptions)
  }

  messageToSeller(MessageBody: any) {
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + `send-message`, MessageBody, httpOptions)     
  }

  productReviewSubmittion(ReviewBody: any) {
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + `client-review`, ReviewBody, httpOptions)

  }

  save_screen_time(save_screen_timeBody: any) {
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + `update_product_screen_time`, save_screen_timeBody, httpOptions)

  }

  order_feedback(order_feedback_body: any) {
    const user_id = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'User-id': user_id })
    }
    return this.http.post(this.apiurl + `order_feedback`, order_feedback_body, httpOptions)

  }
  
  dealsOfTheDay(){
    return this.http.get(this.apiurl + 'deals-of-the-day/');
  }

  warehouseDetail(){
    return this.http.get(this.apiurl + 'warehouse-details');
  }

}
