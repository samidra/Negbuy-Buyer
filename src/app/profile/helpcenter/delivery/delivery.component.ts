import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {

  sectionLoaded = 0;
  uid: string | null = null;

  constructor(private auth: AuthService,
    private titleService: Title,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService) { }

  ngOnInit() {
    const title = "Delivery | Negbuy.com";
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
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

}
 