import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { countryCodes } from 'src/app/service/country';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonService } from 'src/app/service/common/common.service';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import firebase from 'firebase/compat/app';
firebase.initializeApp(environment.firebase);
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  spinnerBuyNow: boolean = true;
  spinnerGetOtp: boolean = true;
  submitButton = 'submitbtn'
  buttonDisable:boolean = true;
  incompleteOtp = false;
  showResend: boolean = false;
  otpSent: boolean = false;
  loading: boolean = false;
  @Input() invalidOtp = false;
  countries = countryCodes.countries;
  selectedCountry: any;
  phoneNumber = '';
  // verificationCode = '';
  confirmationResult: firebase.auth.ConfirmationResult | null = null;
  verificationCompleted = false;
  verificationInProgress = false;
  reCaptchaVerified = false; // Flag for showing reCAPTCHA verified status
  showRecaptcha = true;
  loadingHoleScreen = false;
  
  otpForm: any = new FormGroup({
    verificationCode: new FormControl(''),
  });


  constructor(
    private afAuth: AngularFireAuth,
    private _ActivatedRoute: ActivatedRoute,
    private ProfileServiceService: ProfileServiceService,
    private router: Router,
    private auth:AuthService,
    private fb: FormBuilder,
    private commonService:CommonService,
    private titleService: Title,
    private formDataService: FormDataService,
  ) { }

  ngOnInit(){

    const title = "Sign In | Negbuy.com";
    this.titleService.setTitle(title);
    
    this.countries.forEach(country => {
      country.flag = environment.countryFlagUrl + country.code.toLowerCase() + '.svg';
      if (country.code === 'IN') {
        this.selectedCountry = country;
      }
    });

    this.showResend = false;
    setTimeout(() => {
      this.showResend = true;
    }, 15000);

    this.otpForm = this.fb.group({
      verificationCode: ['', Validators.required], // Initialize with an empty value and set required validation
    });
    
  }

 get verificationCode() {
    return this.otpForm.get('verificationCode');
  }

  sendVerificationCode() {
    this.buttonDisable =  true;
    this.spinnerGetOtp = false;
    if (this.showRecaptcha) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response:any) => {
          console.log(response)
          this.buttonDisable = false;
          this.reCaptchaVerified = true;
          setTimeout(() => {
            this.reCaptchaVerified = false; // Hide the div by changing its display style
          }, 2000);
          this.commonService.displaySuccess('OTP sent'); // 10000 milliseconds = 10 seconds
          this.showRecaptcha = false; // Hide the reCAPTCHA
          this.sendVerificationCode();
          this.otpSent = true
          
        },
        'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    console.log('Recaptcha expired, please solve it again.');
  }
      });
      firebase.auth().signInWithPhoneNumber(this.selectedCountry.dial_code + this.phoneNumber, appVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          
        })
        .catch((error) => {
          console.error('Error sending verification code:', error);
        });
    } else {
      if (this.confirmationResult) {
        const verification = this.verificationCode.value;
        this.confirmationResult.confirm(verification)
          .then((result) => {
            this.verificationCompleted = true;
          })
          .catch((error) => {
            console.error('Error verifying code:', error);
          })
          .finally(() => {
            this.showRecaptcha = true; // Show reCAPTCHA again for the next verification
            this.reCaptchaVerified = false; // Reset reCAPTCHA verified status

          });
      }
    }
  }

  verifyCode() {
    this.spinnerBuyNow = false
    const verification = this.verificationCode.value;
    if (this.confirmationResult) {
      this.confirmationResult.confirm(verification)
        .then((result) => {
          console.log(result)
          this.commonService.displaySuccess('OTP verified');
          this.otpSent = true;
          this.spinnerGetOtp = true;
          // this.commonService.displaySuccess('Login Successfull');
          this.login()
          
       })
        .catch((error) => {
          if (error.code === 'auth/code-expired') {
           
            this.commonService.displayWarning('Please Enter Correct OTP');
            this.spinnerBuyNow = true
            console.error('Verification code has expired. Resending code...');
            this.sendVerificationCode(); // Request a new verification code
          } else {
            console.error('Error verifying code:', error);
            this.commonService.displayWarning('Please Enter Correct OTP');
            this.spinnerBuyNow = true
           
            this.reCaptchaVerified = false;
          }
        });
    }
  }

  countryCode = "IN"
  selectCountry(event: any) {
    this.selectedCountry = event;
    this.countryCode = event.code
    
  }

  btns(){
    if(!(this.phoneNumber.length<7)){
      this.submitButton = 'submit'
      this.buttonDisable = false;
      return false
        } else {
          return true
        }
      }
    
  loginRes:any
  uid: string | null = null;
  login(){
    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid
      if(this.uid != null){
        this.auth.user_id = this.uid
    
      }
      
      const logBody = {
        country_code: this.countryCode,
        phone: this.selectedCountry.dial_code + this.phoneNumber
      }
  

      this.auth.login(logBody).subscribe((response: any) => {
      this.loginRes = response
  
      if(response.Authentication == true){

        this.formDataService.setLogInResponse(this.loginRes)
        this.loadingHoleScreen = true;
        
        if (this.formDataService.getUrlData() != null){
          setTimeout(() => {
            const url = this.formDataService.getUrlData();
            
            this.loadingHoleScreen = false;
            window.location.href = url;
          }, 3000);
        }else{
          setTimeout(() => {
            this.loadingHoleScreen = false;
            this.router.navigate(['']);
          }, 3000);
        }
      }else{
        this.spinnerGetOtp = true;
        this.otpSent = false;
        this.commonService.displayWarning('This Number is already register as seller please try again with other number');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    
      }
      })
    });
  }

}
