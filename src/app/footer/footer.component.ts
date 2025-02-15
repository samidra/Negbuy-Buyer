import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from '../service/common/common.service';
import { Router } from '@angular/router';
import { FormDataService } from '../service/TrackerPageFormData/form-data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private auth: AuthService,
    private commonService: CommonService,
    private router: Router,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService) {
  }

  ngOnInit() {
    this.findUserLogin()
  }


  userlogin = false;
  findUserLogin() {

    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.auth.user_id = data.user_id
      this.ProfileServiceService.user_id = data.user_id
      if (data.userType === "Buyer") {
        this.userlogin = true;
      }

    }
  }

  Categories = [
    'Electronics', 'Hardware', 'Office Supplies', 'Cameras & Optics', 'Sporting Goods', 'Furniture', 'Vehicles & Parts'
  ]

  RouteToCategoryPage(category: any) {

    window.scrollTo(0, 0)
    const category_value = category;
    const category_value_one = category.replace(/\s+/g, '-');
    const search_data = {
      ctgry: category_value,
    };
    this.router.navigate(['/category', category_value_one], { state: { search_data }});
    
  }

  GoToProfile() {
    this.findUserLogin()

    if (this.userlogin === true) {
      this.router.navigate(['/profile-page']);
      window.scrollTo(0, 0)
    } else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }
  }


  emailNewsletter: any
  joinButtonSpinner: boolean = true
  subscribeForNewsLetter() {
    
    this.joinButtonSpinner = false;
    const body = {
      email_address: this.emailNewsletter
    }
    this.ProfileServiceService.subscribeForNewsLetter(body).subscribe((res: any) => {
      this.joinButtonSpinner = true
      
      if (this.emailNewsletter != undefined) {

        if (res.status != 'error') {
          this.commonService.displaySuccess('You have been successfully subscribed!')
        } else {
          this.commonService.displayWarning('Please attempt it once more.')
        }

      } else {
        this.commonService.displayWarning('To continue, please provide your email address.')
      }

    })
  }

}
