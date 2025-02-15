import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly apiurl = environment.apiurl;
  productbyId!: any;
  user_id: string | null = null;

  constructor(private http: HttpClient) {
  }

  AddWishListProduct(WishListAddBody: any) {
    const user_id: any = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'add_product_to_wishlist', WishListAddBody, httpOptions)
  }

  RemoveWishListProduct(WishListAddBody: any) {
    const user_id: any = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'remove_product_from_wishlist', WishListAddBody, httpOptions)
  }

  GetWishlistProduct() {
    const user_id: any = this.user_id;
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.get(this.apiurl + 'get_product_from_wishlist', httpOptions)
  }

  getAllChats() {
    const user_id: any = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }

    const body = {}
    return this.http.post(this.apiurl + 'buyer_all_chats', body, httpOptions)
  }

  startNewChats(startNewChatsBody: any) {
    const user_id: any = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'start_chat', startNewChatsBody, httpOptions)
  }

  sendMessage(send_messageBody: any) {
    const user_id: any = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'send_message', send_messageBody, httpOptions)
  }

  chat_history(chat_history_body: any) {
    const user_id: any = this.user_id;
  
    let httpOptions = {
      headers: new HttpHeaders({ 'user-id': user_id })
    }
    return this.http.post(this.apiurl + 'chat_history', chat_history_body, httpOptions)
  }



}
