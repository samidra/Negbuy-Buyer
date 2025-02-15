import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from 'src/app/service/common/common.service';
import { Router } from '@angular/router';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import * as Aos from 'aos';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent {

    sectionLoaded = 0;
    uid: string | null = null;
  
  
    constructor(private auth: AuthService,
      private commonService:CommonService,
      private router:Router,
      private formDataService: FormDataService,
      private ProfileServiceService: ProfileServiceService) { }
  
    ngOnInit() {
      this.findUserLogin()
      window.scrollTo(0, 0)
      Aos.init();
    }

    userlogin = false;
    findUserLogin() {
  
      if (this.formDataService.getLogInResponse() != null){
        const data = this.formDataService.getLogInResponse()
        this.uid = data.user_id;
        this.auth.user_id = data.user_id
          this.ProfileServiceService.user_id = data.user_id
      }
      
    }

    lastScrollTop: number = 0;
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      const elementsTwo = document.querySelectorAll('.animate-on-scroll-two');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      elements.forEach((element: any) => {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (position < windowHeight - 100) {
          if (scrollTop > this.lastScrollTop) {
            // Scrolling down
            element.classList.add('scroll-down-animated');
            element.classList.remove('scroll-up-animated');
          } else {
            // Scrolling up
            element.classList.add('scroll-up-animated');
            element.classList.remove('scroll-down-animated');
          }
        } else {
          element.classList.remove('scroll-down-animated', 'scroll-up-animated');
        }
      });
  
      elementsTwo.forEach((elementTwo: any) => {
        const position = elementTwo.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (position < windowHeight - 100) {
          if (scrollTop > this.lastScrollTop) {
            // Scrolling down - opposite direction
            elementTwo.classList.add('scroll-up-animated');
            elementTwo.classList.remove('scroll-down-animated');
          } else {
            // Scrolling up - opposite direction
            elementTwo.classList.add('scroll-down-animated');
            elementTwo.classList.remove('scroll-up-animated');
          }
        } else {
          elementTwo.classList.remove('scroll-down-animated', 'scroll-up-animated');
        }
      });
  
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }

  RfqFormData : any = {
    yourRequirement: '',
    DeliveryDate: '',
    Quantity:'',
    TargetPrice:''
  }

  spinnerBuyNow: boolean = true;
  SubmitRfqs(ngform:NgForm){
    if (this.uid) {
      if(ngform.form.valid){
        const formBody = {
          requirement: this.RfqFormData.yourRequirement ,
          delivery_date: this.RfqFormData.DeliveryDate,
          quantity: this.RfqFormData.Quantity,
          target_price: this.RfqFormData.TargetPrice,
        }
        this.spinnerBuyNow = false;
        this.ProfileServiceService.SubmitRFQs(formBody).subscribe((response: any) => {
        
          if (response.status != 'Error') {
            this.spinnerBuyNow = true;
            this.commonService.displaySuccess('Request Sumbitted Succesfully');
            ngform.reset()
      }
       else {
        this.spinnerBuyNow = true;
        this.commonService.displayWarning('Please Fill Requirement First !!!');
      }
    })
      }
    }else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }
 
}
}