import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { countryCodes } from 'src/app/service/country';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from 'src/app/service/common/common.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  countries: any[] = []
  faQBtn = 'black-text'
  uid: string | null = null;

  constructor(private PaymentGatewayService: PaymentGatewayService,
    private auth: AuthService,
    private commonService: CommonService,
    private titleService: Title,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService) { }

  ngOnInit() {
    const title = "My Profile | Negbuy.com";
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)
    this.findUserLogin()
    this.countries = countryCodes.countries;
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
  dataLoader:boolean = false;
  BuyerAddress() {
    this.dataLoader = false
    const body = {
      user_id: this.uid
    }
    
    this.ProfileServiceService.GetProfileData(body).subscribe((response: any) => {
      this.BuyerAddressDelivery = response.data;
      this.profilePicUrl = this.BuyerAddressDelivery.profile_pic
      this.dataLoader = true

      if (response.status) {
        this.ProfileFormData.FirstName = this.BuyerAddressDelivery.first_name
        this.ProfileFormData.LastName = this.BuyerAddressDelivery.last_name
        this.ProfileFormData.Email = this.BuyerAddressDelivery.email
        this.ProfileFormData.ContactNumber = this.BuyerAddressDelivery.phone
        this.ProfileFormData.Gender = this.BuyerAddressDelivery.gender
        this.ProfileFormData.Address.pincode = this.BuyerAddressDelivery.pincode
        this.ProfileFormData.Address.city = this.BuyerAddressDelivery.city
        this.ProfileFormData.Address.state = this.BuyerAddressDelivery.state
        this.ProfileFormData.Address.country = this.BuyerAddressDelivery.country
        this.ProfileFormData.Address.FullAddress = this.BuyerAddressDelivery.address_line1
        
      }
    })
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  profilePicUrl: any
  profilePic_upload !: File
  // Method to trigger the hidden file input
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Method to handle file selection

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.profilePic_upload = input.files[0];

      this.profilePicUrl = URL.createObjectURL(this.profilePic_upload);
    }
  }

  UpdateApires: any
  spinnerSubmit:boolean= false
  UpdateProfileData() {
    
    const ProfileUpdateBody = new FormData();
    ProfileUpdateBody.append('profile_pic', this.profilePic_upload);
    ProfileUpdateBody.append('first_name', this.ProfileFormData.FirstName);
    ProfileUpdateBody.append('last_name', this.ProfileFormData.LastName);
    ProfileUpdateBody.append('gender', this.ProfileFormData.Gender);
    ProfileUpdateBody.append('pincode', this.ProfileFormData.Address.pincode);
    ProfileUpdateBody.append('city', this.ProfileFormData.Address.city);
    ProfileUpdateBody.append('state', this.ProfileFormData.Address.state);
    ProfileUpdateBody.append('country', this.ProfileFormData.Address.country);
    ProfileUpdateBody.append('address_line1', this.ProfileFormData.Address.FullAddress);

  ProfileUpdateBody.forEach((value, key) => {
    console.log(key + ': ' + value);
  });
  
    this.spinnerSubmit= true;
    this.ProfileServiceService.UpdateProfileData(ProfileUpdateBody).subscribe((response: any) => {
      this.UpdateApires = response.status;
      if (response.status) {
  
        this.BuyerAddress()
        this.clear_update_user_data()
        this.commonService.displaySuccess('Profile updated sucessfully');
        this.spinnerSubmit= false;
        window.scrollTo(0, 0)
      }
      
    })
  }

  loginRes:any
  clear_update_user_data() {
    this.formDataService.clearLogInResponse();
    const loginBody = {
      phone: this.ProfileFormData.ContactNumber
    };
    this.auth.login(loginBody).subscribe((res: any) => {
      this.loginRes = res
      this.formDataService.setLogInResponse(this.loginRes)
    })
  }

  emailres: any;
  spinnerVerifyEmail:boolean = false
  VerifyEmail() {
    this.spinnerVerifyEmail = true
    const emailBody = {
      new_email: this.ProfileFormData.Email
    }
   
    this.ProfileServiceService.VerifyEmail(emailBody).subscribe((response: any) => {
      this.emailres = response;
      if(this.emailres.status != "Error"){
        this.commonService.displaySuccess('Please check your mail for verification link')
        this.spinnerVerifyEmail = false
      }else{
        this.commonService.displayWarning(response.message)
        this.spinnerVerifyEmail = false
      }
    })
  }

  Pincodew: any
  spinneraddpin: boolean = true;
  getAddByPin() {

    const pinBody = {
      pincode: Number(this.ProfileFormData.Address.pincode)
    }

    if (pinBody.pincode > 99) {
      this.spinneraddpin = false;
      this.PaymentGatewayService.GetCityState(pinBody).subscribe((response: any) => {
        this.Pincodew = response.data
        this.spinneraddpin = true;
        if (this.Pincodew.city == null) {
          this.ProfileFormData.Address.city = 'Please Enter City'
        } else {
          this.ProfileFormData.Address.city = this.Pincodew.city
        }

        if (this.Pincodew.state == null) {
          this.ProfileFormData.Address.state = 'Please Enter State'
        } else {
          this.ProfileFormData.Address.state = this.Pincodew.state
        }

        if (this.Pincodew.state == null) {
          this.ProfileFormData.Address.country = 'Please Enter Country'
        } else {
          this.ProfileFormData.Address.country = this.Pincodew.country
        }


        
      })
    } else {
      this.commonService.displayWarning('Please Enter valid Pincode');
    }

  }

  ProfileFormData: any = {
    FirstName: '',
    LastName: '',
    Gender: '',
    Email: '',
    ContactNumber: '',


    Address: {
      pincode: '',
      city: '',
      state: '',
      country: '',
      FullAddress: ''
    }
  }

  GenderArray: any[] = [
    { gender: 'Male', value: 'Male' },
    { gender: 'Female', value: 'Female' },
  ]


  SaveData(ngform: NgForm) {
    if (ngform.form.valid) {
      if(this.BuyerAddressDelivery.email_verified === false){
        this.commonService.displayWarning('Please verify your mail first!')
      }else{
        this.UpdateProfileData();
      }
    } else {
      this.commonService.displayWarning('Please fill all details!')
    }

  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

}
