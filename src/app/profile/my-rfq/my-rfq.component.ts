import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/service/common/common.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-my-rfq',
  templateUrl: './my-rfq.component.html',
  styleUrls: ['./my-rfq.component.scss']
})
export class MyRfqComponent {

  sectionLoaded = 0;
  loaderS: boolean = true;
  uid: string | null = null;
p: string|number|undefined;

  constructor(private auth: AuthService,
    private commonService:CommonService,
    private titleService: Title,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService) { }

  ngOnInit() {
    const title = "Request for Quotation | Negbuy.com";
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
      this.MyRFQs()
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
    window.scrollTo(0, 0)
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }


  MyRFQsData:any
  MyRFQs(){
    this.loaderS = true;
    this.ProfileServiceService.MyRFQs().subscribe((res:any)=>{
    this.MyRFQsData = res.data
    this.loaderS = false;
    
    })
  }

  
  display = "none";
  openModal() {
    this.display = "flex";
  }

  onCloseHandled() {
    this.display = "none";
  }


  RfqFormData : any = {
    yourRequirement: '',
    DeliveryDate: '',
    Quantity:'',
    TargetPrice:''
  }

  spinnerBuyNow: boolean = true;
  SubmitRfqs(ngform:NgForm){
    
    if(ngform.form.valid){
      const formBody = {
        requirement: this.RfqFormData.yourRequirement ,
        delivery_date: this.RfqFormData.DeliveryDate,
        quantity: this.RfqFormData.Quantity,
        target_price: this.RfqFormData.TargetPrice,
      }
      
      this.spinnerBuyNow = false;
      this.ProfileServiceService.SubmitRFQs(formBody).subscribe((response: any) => {
        if (response.status) {
          this.spinnerBuyNow = true;
          this.commonService.displaySuccess('Request Sumbitted Succesfully');
          this.display = "none";
          window.location.reload();
        } else {
          
        }
      })
    }
  }
}

