import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import firebase from 'firebase/compat/app';
firebase.initializeApp(environment.firebase);
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiurl = environment.apiurl

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  getCurrentUserUid(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }

  getCurrentUserPhoneNumber(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          // console.log("User Object:", user);
          // console.log("User Phone Number:", user.phoneNumber);
        } else {
          // console.log("User is null");
        }
      }),
      map(user => (user ? user.phoneNumber : null))
    );
  }

  user_id:string = '';
  login(body:any): Observable<any>{  
    const user_id = this.user_id;

    let httpOptions ={
      headers: new HttpHeaders({ 'user-id': user_id})  
    }
    
    return this.http.post(this.apiurl + 'buyer_login', body, httpOptions);
  }

  logout(): Promise<void> {
  return this.afAuth.signOut();   
    
  }

}
