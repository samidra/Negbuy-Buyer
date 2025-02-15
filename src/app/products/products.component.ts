import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductpageService } from '../service/product/productpage.service';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from 'src/app/service/common/common.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HomeService } from '../service/home.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormDataService } from '../service/TrackerPageFormData/form-data.service';
import { countryCodes } from 'src/app/service/country';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { Title } from '@angular/platform-browser';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export let browserRefresh = false;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent {


  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  // Chat related variables
  chat_imagesfile!: File;
  chat_images: Array<{ show: string, upload: File }> = [];
  showImage: any;
  sendMsgBtn: boolean = true;
  userInput: string = '';
  userInputValue: boolean = false;
  reply: any = null;
  messages: { text: string; fromUser: boolean; imageUrl?: string; }[] = [];
  messagesChat: { msg_text: string; msg_sender: string; imageUrl?: string; }[] = [];
  displaysendIcon: string = 'none';
  selectedOrderIndex: string | null = null;
  openChatNow = 'chatNowModal';
  startChatResponse: any;
  startChatResponseChatid: any;
  chatHistoryData: any;
  showFirstmsg: boolean = false;
  showFirstBtn: boolean = true;

  // Profile Form Data
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
  };

  // Gender options
  GenderArray: any[] = [
    { gender: 'Male', value: 'Male' },
    { gender: 'Female', value: 'Female' }
  ];

  // UI and Spinner related variables
  spinneraddpin: boolean = true;
  ShowMinimumAlert: boolean = false;
  color: boolean = true;
  colorsss: number = 1;
  buyBtnClass = 'disabled';
  loaderS: boolean = true;
  spinnerBuyNow: boolean = true;
  spinnerWishlist: boolean = true;
  spinnerSellerMessage: boolean = true;
  spinnerBuyNowz: boolean = true;
  loader = true;
  SkeletonLoads = Array(12).fill({ name: '', StartDate: '', EndDate: '' });
  display = "none";

  // Email and API responses
  emailres: any;
  UpdateApires: any;
  loginRes: any;
  dealsOfTheDayData: any;

  // Address verification and user details
  private readonly apiurl = environment.apiurl2;
  addressVerification = 'addressDetailModal';
  BuyerAddressDelivery: any;
  UserPhoneNumber: string | null = null;
  userlogin = false;
  useraddress_verified!: Boolean;

  // Product details and variables
  productId: any;
  productdata: any = [];
  variants: any = [];
  productReview: any = [];
  productReviewRating: any;
  reviewImage: any = [];
  imgDesc: any = [];
  basicInfo: any = [];
  basicInfoPart1: any = [];
  basicInfoPart2: any = [];
  reviewAnalysis: any = [];
  selectedImageSrc: string | undefined;
  products: any = [];
  bulkPurchaseDetails: any = [];
  productDetails: any = [];
  productCategoryName: any;
  avaliableProductStock!: number;
  ProductWeight!: number;
  uid: string | null = null;

  // Review variables
  SubmitYourReview = {
    ReviewDetail: '',
    ReviewHeadling: '',
    starvalue: 0
  };
  starOne!: number;
  starTwo!: number;
  starThree!: number;
  starFour!: number;
  starFive!: number;
  starRate!: number;
  StarratePercent!: number;
  starvalidtext: boolean = false;

  // Image and file handling
  file!: File;
  fileName: string = '';
  attached_rfq_file: any;
  proof_images = Array(5).fill({ show: '', upload: this.file });

  // Variants and indexes
  variantIndex = 0;
  sizeIndex = 0;
  bulkPurchaseIndex = 0;
  extraImage = 0;
  count: number = 1;
  count_quantity: number = 1;
  limite = false;
  sizeId!: number;

  // Miscellaneous variables
  countries: any[] = [];
  currentUrl: string = '';
  getSlider: any = [];
  getSliderOne: any = [];

  // Timing and subscriptions
  private unsubscriber: Subject<void> = new Subject<void>();
  startTime!: number;
  timeSpent: number = 0;
  subscription!: Subscription;
  p: string | number | undefined;

  formData = {
    message: '',
    proceed: false
  };

  // Pincode and other variables
  Pincodew: any;

  constructor(
    private myservice: HomeService,
    private PaymentGatewayService: PaymentGatewayService,
    private auth: AuthService,
    private titleService: Title,
    private productPage: ProductpageService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    private WishlistService: WishlistService,
    private imageCompress: NgxImageCompressService,
    private formDataService: FormDataService,
    private commonService: CommonService,
    private ProfileServiceService: ProfileServiceService
  ) {
    this.productId = this._ActivatedRoute;

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        this.stopTracking()
      }

    });
  }

  ngOnInit() {

    this.countries = countryCodes.countries;
    this.findUserLogin()
    this.auth.getCurrentUserUid().subscribe(uid => {
      this.uid = uid;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.productPage.user_id = this.uid
        this.WishlistService.user_id = this.uid
        this.myservice.user_id = this.uid
        this.BuyerAddress()

      } else {
        this.currentUrl = window.location.href;
        this.formDataService.setUrlData(this.currentUrl)
        this.buyBtnClass = 'notDisabled'
      }
      this.getProductDetails();
    });

    this.startTime = Date.now();


    this.productId = this._ActivatedRoute.snapshot.paramMap.get('productId');
    this.dealsOfTheDay()
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        this.stopTracking();
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  stopTracking() {

    const timeSpentInMs = Date.now() - this.startTime;
    this.timeSpent += timeSpentInMs / 1000;


    const body_screen_time = {
      product_id: this.productId,
      screen_time: this.timeSpent,
    }

    this.productPage.save_screen_time(body_screen_time).subscribe((res) => {

    })
  }


  findUserLogin() {

    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.buyBtnClass = 'notDisabled'

      if (data.userType === "Buyer") {
        this.userlogin = true;
        this.useraddress_verified = data.address_verified
        setTimeout(() => {
          this.formDataService.clearUrlData();
        }, 3000);
      }
    } else {

    }
  }


  BuyerAddress() {
    const body = {
      user_id: this.uid
    }

    this.ProfileServiceService.GetProfileData(body).subscribe((response: any) => {
      this.BuyerAddressDelivery = response.data;
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

  getProductDetails() {
    this.loaderS = true;

    this.productPage.getProductById(this.productId).pipe(takeUntil(this.unsubscriber)).subscribe(
      (res) => {
        // Handle the API response here
        this.productdata = res.data;
        const title = this.productdata.product_title + " | Negbuy.com";
        this.titleService.setTitle(title);

        this.variants = this.productdata.variants;
        this.sizeId = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].size_id;

        if (this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].min_order_quantity != null) {
          this.count = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].min_order_quantity;
          this.count_quantity = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].min_order_quantity;
        }

        this.ProductWeight = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].weight;
        this.avaliableProductStock = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].stock;


        // Split the string by ">"
        const subcategories = this.productdata.subcategory.split(">")
        this.productCategoryName = subcategories[0].trimEnd();
        this.recommended_Products();
        this.similar_Products()

        this.selectedImageSrc =
          this.productdata.variants[this.variantIndex].extra_images[0];
        this.productPage.SelectedProductData = res.data
        this.loaderS = false;
      },
    );
    const imageDescBody = {
      product_id: this.productId
    }
    // imageDescription API
    this.productPage.getProductimageDesbyProductId(imageDescBody).pipe(takeUntil(this.unsubscriber)).subscribe((res: any) => {

      // Handle the API response here
      this.imgDesc = res.data;
    }
    );

    this.productPage.productReviewSection().pipe(takeUntil(this.unsubscriber)).subscribe((res) => {
      // Handle the API response here
      this.productReview = res.data.reverse();

      this.productReviewRating = this.productReview.filter((item: { rating: number; }) => item.rating > 3);
    }
    );

    this.productPage.productReviewAnalysis().pipe(takeUntil(this.unsubscriber)).subscribe((res) => {
      this.reviewAnalysis = res.data;
      this.starOne = res.data.star1.number;
      this.starTwo = res.data.star2.number;
      this.starThree = res.data.star3.number;
      this.starFour = res.data.star4.number;
      this.starFive = res.data.star5.number;
      this.starRate = (this.starOne + this.starTwo * 2 + this.starThree * 3 + this.starFour * 4 + this.starFive * 5) / (this.starOne + this.starTwo + this.starThree + this.starFour + this.starFive);
      this.starRate = Math.round(this.starRate);
      this.StarratePercent = (this.starRate / 5) * 100;
      // alert(this.StarratePercent);
    });
    this.productPage.productBasicInfo().pipe(takeUntil(this.unsubscriber)).subscribe((res) => {
      this.basicInfo = res.data;

      const midPoint = Math.ceil(this.basicInfo.length / 2);
      this.basicInfoPart1 = this.basicInfo.slice(0, midPoint);
      this.basicInfoPart2 = this.basicInfo.slice(midPoint);
    }
    );
  }

  getsize() { }

  // color

  selectColor(value: any) {
    this.variantIndex = value;
    this.sizeIndex = 0
    this.extraImage = 0

    if (this.productdata.variants[this.variantIndex].size_variants[0].min_order_quantity != null) {
      this.count = this.productdata.variants[this.variantIndex].size_variants[0].min_order_quantity;
      this.count_quantity = this.productdata.variants[this.variantIndex].size_variants[0].min_order_quantity;
      this.avaliableProductStock = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].stock;

    } else {
      this.count = 1
    }
  }


  CheckSizeColor() {
    if (this.productdata.variants[this.variantIndex].color == null || this.productdata.variants[this.variantIndex]
      .size_variants[this.sizeIndex].size == null) {
      return true
    }
    return false
  }

  selectSizeIndex(value: number) {
    this.sizeIndex = value;
    if (this.productdata.variants[this.variantIndex].size_variants[value].min_order_quantity != null) {
      this.count = this.productdata.variants[this.variantIndex].size_variants[value].min_order_quantity;
      this.count_quantity = this.productdata.variants[this.variantIndex].size_variants[value].min_order_quantity;
      this.avaliableProductStock = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].stock;
      this.sizeId = this.productdata.variants[this.variantIndex].size_variants[value].size_id
      this.ProductWeight = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].weight;
    } else {
      this.count = 1
    }

  }

  setImageSrc(i: number) {
    this.extraImage = i;

  }

  increase() {
    this.count++;
  }

  descrease() {
    const minOrderQuantity = this.productdata.variants[this.variantIndex].size_variants[this.sizeIndex].min_order_quantity;

    if ((this.count > minOrderQuantity)) {
      this.count--;
    } else {
      this.ShowMinimumAlert = true;
      setTimeout(() => {
        this.ShowMinimumAlert = false;
      }, 1000);
    }

  }

  BuyNow() {
    if (this.count >= this.count_quantity) {
      if (this.buyBtnClass != 'disabled') {


        this.spinnerBuyNow = false;
        const bodyByNow = {
          product_id: this.sizeId,
          quantity: this.count,
        }
        this.productPage.clickOnBuyNow(bodyByNow).subscribe((response: any) => {

          if (this.userlogin === true) {

            if (this.useraddress_verified === true && response.status) {

              this.router.navigate([`/products/${this.productId}/buy-now`], { queryParams: { product_id: this.productId, count: this.count, sizeId: this.sizeId, wgt: this.ProductWeight } });
              this.formDataService.clearFormData();

            } else if (this.useraddress_verified === true && response.status === false) {
              this.commonService.displayWarning(response.message);
              this.spinnerBuyNow = true;
            } else {
              this.spinnerBuyNow = true;
              this.commonService.displayWarning('Before placing order please fill all details');
              this.addressVerification = 'addressDetailModalShow'
            }
          } else {
            this.spinnerBuyNow = true;
            this.commonService.displaySuccess('Please Login First!!!!');
            this.router.navigate([`/signin`]);
          }

        })

      } else {
        this.commonService.displayWarning('Please wait momentarily while we process.');
      }
    } else {
      this.commonService.displayWarning(`The order quantity must be equal to or greater than ${this.count_quantity}, which is the minimum order quantity.`);
    }

  }

  wishListstatus = 'Add to wishlist';
  add_remove_wishlist() {
    this.spinnerWishlist = false
    if (this.userlogin === true) {
      const wishlist_Body = {
        product_id: this.productId,
      }

      if (this.productdata.wishlisted === false) {
        this.productdata.wishlisted = !this.productdata.wishlisted
        this.WishlistService.AddWishListProduct(wishlist_Body).subscribe((res: any) => {
          this.commonService.displaySuccess('Your product has been added to your wishlist successfully.');
          this.spinnerWishlist = true
        })
      } else {
        this.productdata.wishlisted = !this.productdata.wishlisted
        this.WishlistService.RemoveWishListProduct(wishlist_Body).subscribe((res: any) => {
          this.commonService.displayWarning('The product has been successfully removed from your wishlist.')
          this.spinnerWishlist = true
        })
      }
    } else {
      this.spinnerWishlist = true
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }

  }

  RemoveWishListProduct(productId: number) {
    this.spinnerWishlist = false
    const RemoveWishlistBody = {
      product_id: productId,
    }
    this.WishlistService.RemoveWishListProduct(RemoveWishlistBody).subscribe((res: any) => {

      if (res.status) {
        this.commonService.displayWarning('The product has been successfully removed from your wishlist.')
        this.wishListstatus = 'Add to wishlist'
        this.spinnerWishlist = true
      }
    })
  }

  recommended_Products() {

    this.loader = true;
    this.myservice.recommended_Products(this.productId).pipe(takeUntil(this.unsubscriber)).subscribe((res) => {

      this.getSlider = res;
      this.SkeletonLoads = res.data

      this.loader = false;
    });
  }

  similar_Products() {
    const category = this.productCategoryName;

    this.loader = true;
    this.myservice.SimilarProduct(category).pipe(takeUntil(this.unsubscriber)).subscribe((res) => {

      this.getSliderOne = res;
      this.SkeletonLoads = res.data

      this.loader = false;
    });
  }

  goToProduct(productId: number) {
    window.open(`/products/${productId}`, '_blank');
  }

  show_review_image = 'show_review_image_hide'
  selected_review_image: any
  selected_review_image_rating = 0;
  selected_image = 0
  show_selected_review_image(a:any, i:any){
    this.selected_review_image = this.productReview[a]
    this.selected_review_image.rating = this.selected_review_image_rating
    this.selected_image = i
    this.show_review_image = "show_review_image_show";
  }

  hide_selected_review_image(){
    this.show_review_image = "show_review_image_hide";
  }
  modal_main_image(i:any){
    this.selected_image = i
  }

  openModal() {
    this.display = "flex";
  }

  onCloseHandled(ngform: NgForm) {
    this.display = "none";
    if (this.display == "none") {

      this.SubmitYourReview.starvalue = 0;
      this.starvalidtext = false;
      for (let i = 0; i <= 4; i++) {
        this.proof_images[i] =
        {
          show: '', upload: this.file,
        }
      }
    }
    ngform.reset();
  }

  submitReview(ngform: NgForm) {

    if (this.userlogin === true) {
      const ReviewBody: FormData = new FormData();
      ReviewBody.append('main_product_id', this.productId);
      ReviewBody.append('review_title', this.SubmitYourReview.ReviewHeadling);
      ReviewBody.append('review_description', this.SubmitYourReview.ReviewDetail);
      ReviewBody.append('rating', this.SubmitYourReview.starvalue.toString());
      ReviewBody.append('file', this.proof_images[0].upload);
      ReviewBody.append('file', this.proof_images[1].upload);
      ReviewBody.append('file', this.proof_images[2].upload);
      ReviewBody.append('file', this.proof_images[3].upload);
      ReviewBody.append('file', this.proof_images[4].upload);

      if (ngform.form.valid && this.SubmitYourReview.starvalue !== 0) {
        this.spinnerBuyNowz = false;
        this.productPage.productReviewSubmittion(ReviewBody).subscribe((res) => {
          if (res) {
            this.spinnerBuyNowz = true;
            this.commonService.displaySuccess('Review submitted sucessfully');
            this.display = "none";
            if (this.display == "none") {

              this.SubmitYourReview.starvalue = 0;
              this.starvalidtext = false;
              for (let i = 0; i <= 4; i++) {
                this.proof_images[i] =
                {
                  show: '', upload: this.file,
                }
              }
            }
            ngform.reset();
          }

          this.productPage.productReviewSection().pipe(takeUntil(this.unsubscriber)).subscribe((res) => {
            this.productReview = res.data.reverse();
            this.productReviewRating = this.productReview.filter((item: { rating: number; }) => item.rating > 3);
          })

        })

      } else {
        this.starvalidtext = true;
      }

    } else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }

  }

  async compressImageToBlob(dataUrl: string): Promise<Blob> {
    const compressedImage: string = await this.imageCompress.compressFile(
      dataUrl,
      1, // Compression quality (1 is the highest)
      60,
      60 // Maximum size in KB
    );

    return this.dataURItoBlob(compressedImage);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' }); // Adjust the MIME type accordingly
  }

  onSelectImage(event: any, index: any) {
    const file: File = event.target.files[0];

    if (file) {
      const imgSize = file.size;
      const minimumImgSize = 2097152;
      const reader = new FileReader();
      if (imgSize > minimumImgSize) {

        reader.onload = async (e: any) => {
          const compressedImageBlob: Blob = await this.compressImageToBlob(e.target.result);
          const compressedImageFile: File = new File([compressedImageBlob], file.name);

          this.proof_images[index].upload = compressedImageFile;
          this.proof_images[index].show = e.target.result;

        }
      } else {

        reader.onload = (e: any) => {
          this.proof_images[index].upload = file;
          this.proof_images[index].show = e.target.result;
        }

      }
      reader.readAsDataURL(file);
    }
  }


  RemoveImage(index: any) {
    this.proof_images[index] =
    {
      show: '', upload: this.file,
    }

  }

  imageSrc(value: any) {
    return this.apiurl + value
  }

  showcontent(elementId: string): void {
    const scrollTarget = document.getElementById(elementId);
    const scrollDistance = scrollTarget!.offsetTop - (window.innerHeight / 2) + 325;

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });

  }

  CheckI(event: any) {
    let file = event.target.files[0];

    if (file) {
      this.fileName = file.name; // Store the file name

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // const file_rfq1 = e.target.result;
        this.attached_rfq_file = file;
      };
      reader.readAsDataURL(file);
    }

    // You can use this console.log for debugging purposes.
    // console.log(this.fileName);
  }

  messageToSellerSubmitForm(ngform: NgForm) {
    if (this.userlogin === true) {
      if (ngform.form.valid) {
        this.spinnerSellerMessage = false;
        const capitalizedValue = this.formData.proceed ? 'True' : 'False';
        const MessageBody: FormData = new FormData();
        MessageBody.append('message ', this.formData.message);
        MessageBody.append('checkbox', capitalizedValue);
        MessageBody.append('message_file', this.attached_rfq_file);

        this.productPage.messageToSeller(MessageBody).subscribe((res: any) => {
          if (res.status === 'success') {
            this.commonService.displaySuccess('Message sent sucessfully to Negbuy');
            this.spinnerSellerMessage = true;
            this.fileName = ''
            ngform.reset();
          } else {
            this.spinnerSellerMessage = true;
          }
        })
      }
    } else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }

  }

  dealsOfTheDay() {
    this.productPage.dealsOfTheDay().pipe(takeUntil(this.unsubscriber)).subscribe((res: any) => {
      this.dealsOfTheDayData = res.data

    })
  }

  UpdateProfileData() {
    const ProfileUpdateBody = {
      first_name: this.ProfileFormData.FirstName,
      last_name: this.ProfileFormData.LastName,
      gender: this.ProfileFormData.Gender,
      pincode: this.ProfileFormData.Address.pincode,
      city: this.ProfileFormData.Address.city,
      state: this.ProfileFormData.Address.state,
      country: this.ProfileFormData.Address.country,
      address_line1: this.ProfileFormData.Address.FullAddress,
      // address_line2: this.ProfileFormData.Address.FullAddress,
      // profile_pic:
    }

    this.ProfileServiceService.UpdateProfileData(ProfileUpdateBody).subscribe((response: any) => {
      this.UpdateApires = response.status;
      if (response.status) {
        this.commonService.displayWarning('Profile Updated Sucessfully');
        this.formDataService.clearLogInResponse();
        const loginBody = {
          phone: this.ProfileFormData.ContactNumber
        };
        this.auth.login(loginBody).subscribe((res: any) => {
          this.loginRes = res
          this.formDataService.setLogInResponse(this.loginRes)
        })
        this.useraddress_verified = true;
        this.addressVerification = 'addressDetailModal'
      }

    })
  }

  closeModalAddress() {
    this.addressVerification = 'addressDetailModal'
  }

  VerifyEmail() {
    const emailBody = {
      new_email: this.ProfileFormData.Email
    }

    this.ProfileServiceService.VerifyEmail(emailBody).subscribe((response: any) => {
      this.emailres = response;
      if (this.emailres.status != "Error") {
        this.commonService.displaySuccess('Please check your mail for verification link')

      } else {
        this.commonService.displayWarning(response.message)

      }
    })
  }

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


  SaveData(ngform: NgForm) {
    if (ngform.form.valid) {
      this.UpdateProfileData();
    } else {

    }

  }

  productChatNow() {
    this.showFirstBtn = false
    if (this.uid != null) {

      const startNewChatsBody = {
        product_id: this.productId
      }

      this.WishlistService.startNewChats(startNewChatsBody).subscribe((response: any) => {

        this.showFirstBtn = true
        if (response.status == true) {
          this.showFirstmsg = true
          this.startChatResponse = response.data
          this.startChatResponseChatid = this.startChatResponse.chat_id
          this.openChatNow = 'chatNowShow'

          const chat_history_body = {
            chat_id: this.startChatResponseChatid,
            chat_person: 'Buyer'
          }
          this.WishlistService.chat_history(chat_history_body).subscribe((response1: any) => {

            this.chatHistoryData = response1.data
          })
        }
      })

    } else {
      this.showFirstBtn = true
      this.commonService.displayWarning('Kindly log in before reaching out to the seller.')
    }

  }

  closeChatNow() {
    this.openChatNow = 'chatNowModal'
    this.messagesChat = [];
    this.messages = [];
  }


  toggleOrderDetails(item: string): void {
    if (this.selectedOrderIndex === item) {
      this.selectedOrderIndex = null; // Hide the details if already selected

    } else {
      this.selectedOrderIndex = item; // Show the details of the clicked order
    }
  }
  isOrderDetailsOpen(item: string): boolean {
    return this.selectedOrderIndex === item;
  }


  cfdfdf() {
    // You can add logic here if needed when the input changes
    this.updateSendButtonVisibility();
  }

  private updateSendButtonVisibility() {
    this.displaysendIcon = this.userInput.trim() !== '' ? 'flex' : 'none';
  }


  sendMessage(chat_id: any) {
    if (this.userInput.length) {
      this.sendMsgBtn = false
      this.userInputValue = false
      this.messagesChat.push({ msg_text: this.userInput, msg_sender: "Buyer", imageUrl: this.showImage });
      const send_messageBody = new FormData();
      send_messageBody.append('chat_id', chat_id);
      send_messageBody.append('text_msg', this.userInput);
      send_messageBody.append('photo_msg', this.chat_imagesfile);


      this.WishlistService.sendMessage(send_messageBody).subscribe((response: any) => {

        this.userInput = '';
        this.showImage = '';
        this.chat_images = [];
        // this.chat_imagesfile = new File([], "empty");
        this.sendMsgBtn = true
        if (response.status == true) {

          this.reply = response.data.default_msg

          this.messagesChat.push({ msg_text: this.reply, msg_sender: "Seller", imageUrl: '' });
          this.messages.push({ text: this.reply, fromUser: false, imageUrl: '' });
        }
      })
    } else {
      this.userInputValue = true
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const imgSize = file.size;
      const minimumImgSize = 2097152; // 2MB in bytes
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        this.showImage = e.target.result;
        this.chat_imagesfile = file;

        if (imgSize > minimumImgSize) {
          const compressedImageBlob: Blob = await this.compressImageToBlob(this.showImage);
          this.chat_imagesfile = new File([compressedImageBlob], file.name);
        } else {
          this.showImage = e.target.result;
          this.chat_imagesfile = file;
        }

        // Add new object to chat_images array
        this.chat_images.push({
          show: this.showImage,
          upload: this.chat_imagesfile
        });

      };

      reader.readAsDataURL(file);
    }
  }

  removeAttachedImages() {
    this.chat_images = [];
  }

}
