import { ViewportScroller } from '@angular/common';
import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { HomeService } from 'src/app/service/home.service';
import { CommonService } from 'src/app/service/common/common.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showDropdown: boolean = false;
  navBarShow: boolean = false;
  userlogin: boolean = true;
  login: any
  uid: string | null = null;
  UserPhoneNumber: string | null = null;
  private unsubscribe$ = new Subject<void>();

  categoryDropdownList = ["Animals & Pet Supplies", "Apparel & Accessories", "Arts & Entertainment", "Baby & Toddler", "Business & Industrial",
    "Cameras & Optics", "Electronics", "Food & Beverages", "Furniture", "Hardware", "Health & Beauty", "Home & Garden", "Luggage & Bags",
    "Office Supplies", "Religious & Ceremonial", "Sporting Goods", "Toys & Games", "Vehicles & Parts"]

  placeholderSelected: any = null

  constructor(private viewportScroller: ViewportScroller, private auth: AuthService, private formDataService: FormDataService,
    private router: Router, private homeservice: HomeService,
    private commonService: CommonService, private elRef: ElementRef) { }

  loadingHoleScreen = false;
  loadingLogInIcon = true;

  ngOnInit() {

    this.auth.getCurrentUserUid().subscribe(uid => {

      this.uid = uid;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.homeservice.user_id = this.uid
        this.navbar_numbers()
        this.findUserLogin()
      } else {
        this.loadingLogInIcon = false;
      }
    });

    this.onInputChange()

    document.addEventListener('click', this.handleClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClick.bind(this));
    // Emit a value to unsubscribe from all subscriptions
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navbar_numbers_res = {
    unopened_chats_counts: 0,
    wishlisted_counts: 0,
    undelieverd_ordered: 0
  }
  navbar_numbers() {
    this.homeservice.navbar_numbers().pipe(takeUntil(this.unsubscribe$)).subscribe((response: any) => {
      this.navbar_numbers_res = response
    })
  }

  loginRes: any;
  findUserLogin() {

    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      if (data.userType === "Buyer") {
        this.userlogin = false;
        this.loadingLogInIcon = false;
      } else {
        this.loadingLogInIcon = false;
      }
    } else {

      this.auth.getCurrentUserPhoneNumber().subscribe(phoneNumber => {
        this.UserPhoneNumber = phoneNumber;

        const loginBody = {
          phone: this.UserPhoneNumber
        };

        this.auth.login(loginBody).subscribe((res: any) => {
          this.loginRes = res
          if (res.userType === "Buyer") {
            this.formDataService.setLogInResponse(this.loginRes)
            this.userlogin = false;
            this.loadingLogInIcon = false;
          } else {
            this.loadingLogInIcon = false;
          }
        })
      });
    }

    // this.auth.getCurrentUserPhoneNumber().subscribe(phoneNumber => {
    //   this.UserPhoneNumber = phoneNumber;

    //   const loginBody = {
    //     phone: this.UserPhoneNumber
    //   };
  }

  search_query: string = '';
  suggestions: any;
  suggestionsCategory: any;
  ProductTittle: any
  Subcategory: any
  placeholderSelectedShow: any
  suggest_for_search_response_status: boolean = false;
  suggest_for_search_response: any;
  onInputChange() {

    if (this.placeholderSelected === null) {
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
          if (this.suggest_for_search_response.status == true) {
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
      if (this.placeholderSelected === null) {
        this.placeholderSelectedShow = 'Search product category'
      }

      this.router.navigate([`searched_products`], { queryParams: { search_query: this.search_query, category: this.placeholderSelected } })
    }
  }


  presearch() {
    if (this.search_query != "") {
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

      // this.router.navigate([`searched_products`], { queryParams: {  search_query: this.search_query,category: this.placeholderSelected  } })
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
    this.router.navigate(['/category', category_value_one], { state: { ctgry: category_value } });

    // this.placeholderSelected = category
    this.showDropdown = false
  }

  RouteToProductcategoryBySearch(category: any, id: any) {

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
    this.router.navigate(['/category', category_value_one], { state: { search_data } });

    // this.placeholderSelected = category
    this.showDropdown = false;
  }

  public onClick(elementId: string): void {
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
    if (window.pageYOffset > 0) {
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
