import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.scss']
})
export class HelpcenterComponent {
  sectionLoaded = 0;
  uid: string | null = null;

  constructor(private auth: AuthService,
    private titleService: Title,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService) { }

  ngOnInit() {

    const title = "Help Center | Negbuy.com";
    this.titleService.setTitle(title);
    
    window.scrollTo(0,0)
    this.findUserLogin()
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
      }
    }
    this.BuyerAddress()
  }

  BuyerAddressDelivery: any;
  profile_pic:any;

  BuyerAddress() {

    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.BuyerAddressDelivery = this.formDataService.getLogInResponse()
      let url = "https://negbuy.com:8080"
      this.profile_pic = url + this.BuyerAddressDelivery.imageUrl
    }
  }

  showcontent(value: number) {
    this.sectionLoaded = value;
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

  }
  
