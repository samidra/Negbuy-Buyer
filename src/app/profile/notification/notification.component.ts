import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  uid: string | null = null;
  loaderS: boolean = true;
  p: string|number|undefined;
  constructor(
    private auth: AuthService,
    private formDataService: FormDataService,
    private titleService: Title,
    private ProfileServiceService: ProfileServiceService,
  ) { }

  ngOnInit() {
    const title = "Notification | Negbuy.com";
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
      }
    }
    this.BuyerAddress()
    this.MyNotification()
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

  MyNotificationResponse: any
  MyNotification() {
    this.loaderS = true;
    this.ProfileServiceService.MyNotification().subscribe((response: any) => {
      this.MyNotificationResponse = response.data;
      console.log(this.MyNotificationResponse)
      this.loaderS = false;

    })
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }
}
