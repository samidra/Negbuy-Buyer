import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from 'src/app/service/common/common.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {


  news_id: any = '';
  loading: boolean = false;
  subscription!: Subscription;
  form!: FormGroup;
  submitted = false;
  uid: string | null = null;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private ProfileServiceService: ProfileServiceService,
    private formDataService: FormDataService,
    private commonService: CommonService,
    private auth: AuthService,
    private titleService: Title,
    public dialog: MatDialog,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(50)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    if (this.news_id === '') {
      this.news_id = history.state.news_id
      // this.loading = true;
    }
    this.subscription = interval(1000).subscribe(() => {
      this.loading = true;
    });

    const title = this.get_latest_blog[0].heading + ': Negbuy'
    this.titleService.setTitle(title);

    window.scrollTo(0, 0)
    this.findUserLogin()
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
      }
    }

    this.get_all_blog_comment()
  }

  all_comments: any
  get_all_blog_comment() {
    const body = {
      blog_id: this.news_id,
    }
    this.ProfileServiceService.get_all_blog_comment(body).subscribe((response: any) => {
      this.all_comments = response
    })

  }

  get_latest_blog = [
    {
      heading: 'Export Opportunities in Emerging Markets for Small Businesses',
      path: 'assets/Blogs/main_blog_page/Export Opportunities in Emerging Markets for Small Businesses.webp',
      blog_id: '01',
    },
    {
      heading: 'Challenges and Solutions for small businesses in SCM',
      path: 'assets/Blogs/main_blog_page/Challenges and Solutions for small businesses in SCM.webp',
      blog_id: '02',
    },
    {
      heading: 'E-commerce Logistics Meets Retail Demands',
      path: 'assets/Blogs/main_blog_page/E-commerce Logistics Meets Retail Demands.webp',
      blog_id: '03',
    },
    {
      heading: 'Government Initiatives for MSMEs in India: Nurturing Growth and Innovation',
      path: 'assets/Blogs/main_blog_page/Government Initiatives for MSMEs in India Nurturing Growth and Innovation.webp',
      blog_id: '04',
    },
    {
      heading: 'Import Duty Increased by 5%',
      path: 'assets/Blogs/main_blog_page/Import Duty Increased by 5.webp',
      blog_id: '05',
    },
    {
      heading: 'An overview about IT industry in Trend',
      path: 'assets/Blogs/main_blog_page/An overview about IT industry in Trend.webp',
      blog_id: '06',
    },

  ];

  exit() {
    window.scrollTo(0, 0);
  }

  DetailedBlog(i: any) {
    this.loading = false;
    this.subscription = interval(1000).subscribe(() => {
      this.loading = true;
    });

    this.news_id = this.get_latest_blog[i].blog_id;
    const title = this.get_latest_blog[i].heading + ': Negbuy'
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)
    this.get_all_blog_comment()
    
    const blog_title = this.get_latest_blog[i].heading.replace(/\s+/g, '-')
    this.router.navigate([`blogs/blog-detail/${blog_title}`],  { state: {  news_id: this.get_latest_blog[i].blog_id}} )
  
  }

  display = "none";
  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  more: any = 'more';
  less: any = 'less';
  selectedOrderIndex: string | null = null;
  toggleOrderDetails(item: string): void {
    if (this.selectedOrderIndex === item) {
      this.selectedOrderIndex = null; // Hide the details if already selected

      this.less = 'less';
      this.more = 'more';

    } else {
      this.selectedOrderIndex = item; // Show the details of the clicked order
      this.more = 'less';
      this.less = 'more';
    }
  }

  isOrderDetailsOpen(item: string): boolean {
    return this.selectedOrderIndex === item;
  }

  get comment() {
    return this.form.get('comment');
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  isbuttonloader: boolean = false
  submit_blog_comment() {
    if (this.uid != null) {
      this.submitted = true; // Mark form as submitted
      if (this.form.valid) {
        this.isbuttonloader = true
        const body = {
          blog_id: this.news_id,
          comment: this.form.value.comment,
          user_name: this.form.value.name,
          email: this.form.value.email,
        }
        this.ProfileServiceService.save_blog_comment(body).subscribe((response: any) => {
          this.commonService.displaySuccess('Your comment is under review and will appear shortly.')
          this.isbuttonloader = false
          this.get_all_blog_comment()
        })
      } else {
        this.form.markAllAsTouched();
        console.log('Form is invalid');
      }
    } else {
      this.commonService.displaySuccess('Please log in first before comment')
      const dialogRef = this.dialog.open(sign_in_from_blog, {
        width: '100%',
        data: { news_id: this.news_id, }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);

      });
    }

  }

  islike_dislike: { [productId: number]: boolean } = {};
  submit_blog_like(value: any) {
    if (this.uid != null) {

      this.islike_dislike[value === 'Yes' ? 1 : 2] = true;
      const body = {
        like: value,
        blog_id: this.news_id,
      }

      this.ProfileServiceService.save_blog_comment(body).subscribe((response: any) => {
        this.commonService.displaySuccess('Thanks for your feedback.')
        this.islike_dislike[value === 'Yes' ? 1 : 2] = false;
        this.get_all_blog_comment()
      })

    } else {
      this.commonService.displaySuccess('Please log in first before comment')
      const dialogRef = this.dialog.open(sign_in_from_blog, {
        width: '100%',
        data: { news_id: this.news_id, }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);

      });
    }

  }

}


// MODAL TS

import { Input } from '@angular/core';
import { countryCodes } from 'src/app/service/country';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
firebase.initializeApp(environment.firebase);
import { FormControl, } from '@angular/forms';

@Component({
  selector: 'sign_in_from_blog',
  templateUrl: 'sign_in_from_blog.html',
  styleUrls: ['./blog-detail.component.scss']
})

export class sign_in_from_blog {


  onNoClick(): void {
    this.dialogRef.close();
  }

  spinnerBuyNow: boolean = true;
  spinnerGetOtp: boolean = true;
  submitButton = 'submitbtn'
  buttonDisable: boolean = true;
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

  otpForm: any = new FormGroup({
    verificationCode: new FormControl(''),
  });


  constructor(
    public dialogRef: MatDialogRef<sign_in_from_blog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private auth: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private formDataService: FormDataService,
  ) { }

  ngOnInit() {

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
    this.buttonDisable = true;
    this.spinnerGetOtp = false;
    if (this.showRecaptcha) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
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

  btns() {
    if (!(this.phoneNumber.length < 7)) {
      this.submitButton = 'submit'
      this.buttonDisable = false;
      return false
    } else {
      return true
    }
  }

  loginRes: any
  uid: string | null = null;
  login() {
    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid
      if (this.uid != null) {
        this.auth.user_id = this.uid
      }

      const logBody = {
        country_code: this.countryCode,
        phone: this.selectedCountry.dial_code + this.phoneNumber
      }

      this.auth.login(logBody).subscribe((response: any) => {
        this.loginRes = response

        if (response.Authentication == true) {

          this.formDataService.setLogInResponse(this.loginRes)
          this.dialogRef.close();
          window.location.reload();
        } else {
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
