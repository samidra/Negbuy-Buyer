import { ViewportScroller } from '@angular/common';
import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/Auth/auth.service';
import { HomeService } from '../service/home.service';
import { CommonService } from 'src/app/service/common/common.service';
import { FormDataService } from '../service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('fixed', style({ transform: 'translateY(0)' })),
      state('default', style({ transform: 'translateY(-100%)' })),
      transition('default => fixed', animate('300ms ease-in')),
      transition('fixed => default', animate('300ms ease-out')),
    ]),
  ],
})

export class MainheaderComponent {
  public showDropdown: boolean = false;
  navBarShow: boolean = false;
  userlogin: boolean = true;
  login: any
  uid: string | null = null;
  UserPhoneNumber: string | null = null;
  categoryDropdownList = ["Animals & Pet Supplies", "Apparel & Accessories", "Arts & Entertainment", "Baby & Toddler", "Business & Industrial", 
    "Cameras & Optics", "Electronics", "Food & Beverages", "Furniture", "Hardware", "Health & Beauty", "Home & Garden", "Luggage & Bags", 
    "Office Supplies", "Religious & Ceremonial", "Sporting Goods", "Toys & Games", "Vehicles & Parts"]
  UserProfileIcon: boolean = false;
  placeholderSelected: any = null

  constructor(private viewportScroller: ViewportScroller, private auth: AuthService, private formDataService: FormDataService,
    private router: Router, private route: ActivatedRoute, private homeservice: HomeService,
    private commonService: CommonService, private elRef: ElementRef) { }

  loadingHoleScreen = false;
  loadingLogInIcon = true;

  ngOnInit() {
    this.onInputChange()
    this.findUserLogin()
    
    document.addEventListener('click', this.handleClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClick.bind(this));
  }

  navbar_numbers_res = {
    unopened_chats_counts: 0,
    wishlisted_counts: 0,
    undelieverd_ordered: 0
  }
  navbar_numbers() {
    this.homeservice.navbar_numbers().subscribe((response: any) => {
      this.navbar_numbers_res = response
    })
  }

  findUserLogin() {

    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id
      this.auth.user_id = data.user_id
      this.homeservice.user_id = data.user_id
      this.navbar_numbers()
      if (data.userType === "Buyer") {
        this.userlogin = false;
        this.loadingLogInIcon = false;
      } else {
        this.loadingLogInIcon = false;
      }
    } else {
      this.loadingLogInIcon = false;
    }
  }

  // findUserLogin() {
  //   this.auth.getCurrentUserPhoneNumber().subscribe(phoneNumber => {
  //     this.UserPhoneNumber = phoneNumber;

  //     const loginBody = {
  //       phone: this.UserPhoneNumber
  //     };

  //     this.auth.login(loginBody).subscribe((res: any) => {
  //       // console.log(res.userType)
  //       if (res.userType === "Buyer") {
  //         this.userlogin = false;
  //         this.loadingLogInIcon = false;
  //       } else {
  //         this.loadingLogInIcon = false;
  //       }
  //     })
  //   });
  // }

  search_query: string = '';
  suggestions: any;
  suggestionsCategory: any;
  ProductTittle: any
  Subcategory: any
  placeholderSelectedShow:any
  suggest_for_search_response: any;
  suggest_for_search_response_status: boolean = false;
  onInputChange() {

    if(this.placeholderSelected ===  null){
      this.placeholderSelectedShow = 'Search product category'
    }

   
    const searchBody = {
      search_query: this.search_query,
      category: this.placeholderSelected
    };
    if (this.search_query.length >= 1) {

      this.homeservice.suggest_for_search(searchBody)
      .subscribe((response: any) => {
        this.suggest_for_search_response = response
        if(this.suggest_for_search_response.status == true){
          this.suggest_for_search_response_status = true
          this.showDropdown = false;
      
          this.homeservice.getSearchSuggestions(searchBody)
          .subscribe((response: any) => {
          
            this.suggestions = response.data;
            this.suggestionsCategory = response;
            this.showDropdown = false;
            this.ProductTittle = response.data.map((product_title: { product_title: any; }) => product_title.product_title)
            this.Subcategory = response.data.map((category_id__name: { category_id__name: any; }) => category_id__name.category_id__name)
            
          });

        }
       
        
      });


     
    } else {
      this.suggestions = [];
    }
  }

  onInputChange_two(search_query: any) {
    this.search_query = search_query;
    if (this.search_query.length >= 1) {
      if(this.placeholderSelected ===  null){
        this.placeholderSelectedShow = 'Search product category'
      }
  
      this.router.navigate([`searched_products`], { queryParams: {  search_query: this.search_query,category: this.placeholderSelected  } })
    }
  }

  presearch(){
    if(this.search_query != ""){
      const searchBody = {
        search_query: this.search_query,
        category: this.placeholderSelected
      };
      if (this.search_query.length >= 1) {
        this.homeservice.getSearchSuggestions(searchBody)
          .subscribe((response: any) => {
           
            this.suggestions = response.data;
            this.suggestionsCategory = response;
            this.showDropdown = false;
            this.ProductTittle = response.data.map((product_title: { product_title: any; }) => product_title.product_title)
            this.Subcategory = response.data.map((category_id__name: { category_id__name: any; }) => category_id__name.category_id__name)
            
          });
      } else {
        this.suggestions = [];
      }
    }
  }

  clearSuggestions() {
    this.suggestions = [];
    this.suggest_for_search_response_status = false;
  }

  findSearch() {
    if (this.search_query.length >= 1) {
      if (this.placeholderSelected === null) {
        this.placeholderSelectedShow = 'Search product category'
      }
      const queryParams: any = {
        search_query: this.search_query
      };
    
      if (this.placeholderSelected) {
        queryParams.category = this.placeholderSelected;
      }
    
      this.router.navigate(['searched_products'], { queryParams });
      this.suggest_for_search_response_status = false;
    }

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.suggestions = [];
      this.showDropdown = false;
    }
  }

  handleClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.openMenudisplay = false;
    }
  }

  selectCategoryToSearchProduct(category: any) {
    this.placeholderSelected = category
    this.placeholderSelectedShow = category
    this.search_query = '';
    this.showDropdown = false
  }

  RouteToSubcategoryBySearch(category: any) {
    const category_value = category;
    const category_value_one = category.replace(/\s+/g, '-');
    // const queryParams = { ctgry: categoryValue };
    this.router.navigate(['/category', category_value_one], { state: { ctgry: category_value }});

    // this.placeholderSelected = category
    this.showDropdown = false
  }

  RouteToProductcategoryBySearch(category: any, id:any) {
  
    const category_value = category;
    const category_value_one = category_value.replace(/\s+/g, '-');
    const search_query = this.search_query; // Assuming this.search_query is defined somewhere
    const iD = id;
  
    const search_data = {
      ctgry: category_value,
      id: iD,
      search_query: search_query
    };
  
    // Navigate using the Router
    this.router.navigate(['/category', category_value_one], { state: { search_data }});
  
    // this.placeholderSelected = category
    this.showDropdown = false;
  }

  public onClick(elementId: string): void {
    this.router.navigate(['']);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  toggleNav() {
    if (this.navBarShow == true) {
      this.navBarShow = false;

      return
    }
    this.navBarShow = true;
    return
  }

  exit() {
    window.scrollTo(0, 0);
  }

  navigateToSignPage() {
    this.router.navigate(['signin']);
  }


  logOut(): void {
    this.formDataService.clearUrlData();
    this.formDataService.clearLogInResponse();

    this.display = "none";
    this.loadingHoleScreen = true;
    // Simulate asynchronous operation
    setTimeout(() => {
      this.loadingHoleScreen = false;
    }, 3000);
    this.auth.logout()
      .then(() => {
        this.userlogin = true;
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        this.loadingLogInIcon = false;
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }

  display = "none";
  openModal() {
    this.display = "flex";
  }

  onCloseHandled() {
    this.display = "none";
  }


  openMenudisplay: boolean = false;
  openMenu() {
    this.openMenudisplay = !this.openMenudisplay;
  }

  
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  GoToWishlist() {
    if (this.uid) {
      this.router.navigate(['/my-Wishlist']);
    }
    else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }
  }

  gotoChats() {
    if (this.uid) {
      this.router.navigate(['/all-chats']);
    }
    else {
      this.commonService.displaySuccess('Please Login First!!!!');
      this.router.navigate([`/signin`]);
    }
  }

  RouteToProductPages() {
    this.router.navigate([`my-recommendation`])
  }

  profileShow = false
  ShowProfileToggle() {
    this.profileShow = !this.profileShow
  }

}
