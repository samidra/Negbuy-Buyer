import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiurl = environment.apiurl;
  
  constructor(private http: HttpClient,
    private router: Router, private route: ActivatedRoute) { }

    chatBotPrimaryTags(){
      return  this.http.get(this.apiurl + `primary_tags`)
    }

    chatBotSeconadryTags(Chatbody:any){
      return  this.http.post(this.apiurl + `primary_tags/sub_tags/`, Chatbody)
    }
  
}
