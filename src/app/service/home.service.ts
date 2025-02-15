import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpBackend} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly apiurl = environment.apiurl;
  errorData: {} | undefined;
  productbyId: number | undefined;
  user_id: string = '';

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.errorData = {};
    this.http = new HttpClient(handler);
  }

  ngOnInit() { }

  getdata() {
    return this.http.get(this.apiurl + 'homepage_news');
  }

  categoryDropdown() {
    return this.http.get(this.apiurl + 'show_category_dropdown_addnewproduct');
  }

  goToProductPage() {
    window.open('/product', '_blank');
  }


  // homepage_product_category_wise

  homepage_product_category_wise(body: any) {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post<any>(
      this.apiurl + 'homepage_single_category_products', body, httpOptions);
  }

    // homepage_product_category_wise

    homepage_product_slide_category_wise(body: any) {
      const user_id = this.user_id;
      let httpOptions = {
        headers: new HttpHeaders({ 'user-id': user_id })
      }
      return this.http.post<any>(
        this.apiurl + 'homepage_two_cat_products', body, httpOptions);
    }


  // hardware api

  // Method to send the POST request with JSON payload
  //  payload={"category":"Hardware","number":5}

  SimilarProduct(value: any) {
    const payload = { category: value, number: 20 }
    const payloadString = JSON.stringify(payload);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(
      this.apiurl + 'homepage_single_category_products',
      payloadString,
      { headers: headers }
    );
  }

  recommended_Products(value: any) {
    const body = { product_id: value }
    const user_id = this.user_id;

    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post<any>(
      this.apiurl + 'product_based_recommendations', body, httpOptions
    );
  }


  sendPostRequest(payload = { category: 'Electronics', number: 20 }) {
    const payloadString = JSON.stringify(payload);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(
      this.apiurl + 'homepage_single_category_products',
      payloadString,
      { headers: headers }
    );
  }


  // Search by Brand

  brand(payload = { choice: 'brand' }) {
    // Convert the payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Set the Content-Type header to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the JSON payload and headers
    return this.http.post<any>(
      this.apiurl + 'homepage_posters_brands',
      payloadString,
      { headers: headers }
    );
  }

  // Product APi
  product(payload = { product_id: 107 }) {
    // Convert the payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Set the Content-Type header to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the JSON payload and headers
    return this.http.post<any>(
      this.apiurl + 'product_details_page',
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




  suggest_for_search(search_query: any): Observable<any> {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + `suggest_for_search`, search_query, httpOptions);
  }

  getSearchSuggestions(searchBody: any): Observable<any> {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + `test_search_suggest`, searchBody, httpOptions);
  }

  getSearchSuggestionsByFind(searchBody: any): Observable<any> {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + `search_query_result`, searchBody, httpOptions);
  }

  update_searched_queries(searchBody: any): Observable<any> {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + `update_searched_queries`, searchBody, httpOptions);
  }

  navbar_numbers() {
    const user_id = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'navbar_numbers', httpOptions)
  }
}
