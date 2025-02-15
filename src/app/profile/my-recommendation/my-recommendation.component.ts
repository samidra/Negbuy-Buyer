import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { CommonService } from 'src/app/service/common/common.service';
import { HomeService } from 'src/app/service/home.service';
import { ProductpageService } from 'src/app/service/product/productpage.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';

@Component({
  selector: 'app-my-recommendation',
  templateUrl: './my-recommendation.component.html',
  styleUrls: ['./my-recommendation.component.scss']
})
export class MyRecommendationComponent {

  Productscategory: any;
  search_query: any = '';
  categoryProductsId:any;
  product_id: any;
  loaderS: boolean = true;
  loaderFilter: boolean = true;
  uid: string | null = null;
  p: string|number|undefined;

  constructor(
    private productpageservice: ProductpageService,
    private route: ActivatedRoute,
    private router: Router,
    private myservice: HomeService,
    private titleService: Title,
    private auth: AuthService,
    private formDataService: FormDataService,
    private commonService: CommonService,
    private WishlistService: WishlistService) { }


  ngOnInit() {
    this.findUserLogin()
    const title = "My Recommendation" + " | Negbuy.com";
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)
  }


  userlogin= false;
  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.WishlistService.user_id = this.uid
        this.productpageservice.user_id = this.uid
      }
      if (data.userType === "Buyer") {
        this.userlogin = true;
      }
    }
    this.GetWishlistProduct()
    this.get_product_data_by_my_recommendation()
  }


  GetWishlistProductResponse: any
  GetWishlistProduct() {
    this.WishlistService.GetWishlistProduct().subscribe((res: any) => {
      this.GetWishlistProductResponse = res.data
      this.GetWishlistProductResponse.product_id

    })
  }

  spinnerBuyNow: { [productId: number]: boolean } = {};
  AddWishListProduct(productId: number) {
    this.spinnerBuyNow[productId] = true;
    if (!this.GetWishlistProductResponse) {
      console.error("GetWishlistProductResponse is undefined.");
      return;
    }

    if (!Array.isArray(this.GetWishlistProductResponse)) {
      console.error("GetWishlistProductResponse is not an array.");
      return;
    }

    const AddWishlistBody = {
      product_id: productId,
    };

    const RemoveWishlistBody = {
      product_id: productId,
    };

    let index = this.GetWishlistProductResponse.findIndex((item: { [x: string]: any }) => item['product_id'] === productId);

    if (index > -1) {
      this.WishlistService.RemoveWishListProduct(RemoveWishlistBody).subscribe((res: any) => {
        this.commonService.displayWarning('Product Removed from your wishlist successfully');
        this.spinnerBuyNow[productId] = false;
          this.GetWishlistProduct()
      });
    } else {
      this.WishlistService.AddWishListProduct(AddWishlistBody).subscribe((response: any) => {
        this.commonService.displaySuccess('Product Added to your wishlist successfully');
        this.spinnerBuyNow[productId] = false;
          this.GetWishlistProduct()
      });
    }
  }

  WishListIcon(product_id: any) {
    if (this.GetWishlistProductResponse && Array.isArray(this.GetWishlistProductResponse)) {
      let index = this.GetWishlistProductResponse.findIndex((item: { [x: string]: any; }) => item['product_id'] === product_id);

      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      // Handle the case where this.GetWishlistProductResponse is undefined or not an array
      return false;
    }
  }

  activeCategory = 16;
  toggleCategory(value: any) {
    this.activeCategory = value
  }

  getSlider: any = [];
  getSliderOne: any = [];
  loader = true;

  SkeletonLoads = [
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
    { name: '', StartDate: '', EndDate: '' },
  ]
  

  categoryResponse: any = []
  BrandNameShow: any
  categoryResponsetotalItems: any
  pageLoading:boolean = false;

  get_product_data_by_my_recommendation() {

    this.loader = true;
    this.productpageservice.get_product_data_by_my_recommendation().subscribe((res) => {
      
      this.getSlider = res;
      // this.SkeletonLoads = res.data
  
      this.loader = false;
    });

    
    this.loaderS = true;
    this.loaderFilter = true;
    
    this.productpageservice.get_product_data_by_my_recommendation().subscribe((res: any) => {
      
      if(res.status === true){
        this.categoryResponse = res.data
        this.categoryResponsetotalItems = this.categoryResponse.length;
        
        if(this.categoryResponse.length === 0){
          this.pageLoading = true
        }
  
        this.BrandNameShow = Array.from(new Set(this.categoryResponse.map((item: { brand: any; }) => item.brand)));
       
        this.product_id = this.categoryResponse.product_id
        this.loaderS = false
        this.loaderFilter = false;
        
      }else{
        this.pageLoading = true
        this.loaderS = false
        this.loaderFilter = false;
      }
 
    })
  }

  SortBy = ''
  SortByPrice() {
    if (this.SortBy == 'asc') {
      this.categoryResponse.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
    } else {
      this.categoryResponse.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    }
  }

  FilterByBrand = '';
  selectedPrice = 0;
  maxPrice = 0;
  minPrice = 0;
  FilterByRating = 0;
  FilteBetweenPriceMaxMin(value: any) {
    this.selectedPrice = value;
    this.loaderS = true;

    switch (value) {
      case 1:
        this.minPrice = 0;
        this.maxPrice = 10000;
        break;
      case 2:
        this.minPrice = 10000;
        this.maxPrice = 20000;
        break;
      case 3:
        this.minPrice = 20000;
        this.maxPrice = 30000;
        break;
      case 4:
        this.minPrice = 30000;
        this.maxPrice = 40000;
        break;
      case 5:
        this.minPrice = 40000;
        this.maxPrice = 50000;
        break;
      default:
        // Handle other cases or errors here
        break;
    }

    // this.filterProducts(this.minPrice, this.maxPrice);
  }

  FilteRating(value: any) {
    this.FilterByRating = value;
    this.loaderS = true;

    switch (value) {
      case 1:
        this.FilterByRating = 1;
        break;
      case 2:
        this.FilterByRating = 2;
        break;
      case 3:
        this.FilterByRating = 3;
        break;
      case 4:
        this.FilterByRating = 4;
        break;
      case 5:
        this.FilterByRating = 5;
        break;
      default:
        // Handle other cases or errors here
        break;
    }
    // this.filterProducts(this.minPrice, this.maxPrice);
  }

  FilterProductArray() {
    window.scrollTo(540, 540)
    this.loaderS = true;
    const CategoryBody = {
      category: this.Productscategory,
    }
    this.productpageservice.getProductDataBySubCategory(CategoryBody).subscribe((res: any) => {
      this.categoryResponse = res.data
      if (res.status) {
        this.loaderS = false;
        if (this.FilterByBrand != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { brand: string; }) => item.brand === this.FilterByBrand);
        } if (this.maxPrice != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price <= this.maxPrice);
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price >= this.minPrice);
        } if (this.FilterByRating != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { rating: any; }) => item.rating === this.FilterByRating);
        }
      }
    })
  }

  removeBrandFilter() {
    this.FilterByBrand = '';
    this.loaderS = true;
    const CategoryBody = {
      category: this.Productscategory,
    }
    this.productpageservice.getProductDataBySubCategory(CategoryBody).subscribe((res: any) => {
      this.categoryResponse = res.data
      if (res.status) {
        this.loaderS = false;
        if (this.FilterByBrand != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { brand: string; }) => item.brand === this.FilterByBrand);
        } if (this.maxPrice != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price <= this.maxPrice);
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price >= this.minPrice);
        } if (this.FilterByRating != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { rating: any; }) => item.rating === this.FilterByRating);
        }
      }
    })
  }
  
  removePriceFilter() {
    this.selectedPrice = 0;
    this.maxPrice = 0;
    this.minPrice = 0;
    this.loaderS = true;
    const CategoryBody = {
      category: this.Productscategory,
    }
    this.productpageservice.getProductDataBySubCategory(CategoryBody).subscribe((res: any) => {
      this.categoryResponse = res.data
      if (res.status) {
        this.loaderS = false;
        if (this.FilterByBrand != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { brand: string; }) => item.brand === this.FilterByBrand);
        } if (this.maxPrice != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price <= this.maxPrice);
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price >= this.minPrice);
        } if (this.FilterByRating != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { rating: any; }) => item.rating === this.FilterByRating);
        }
      }
    })
  }

  removeRatingFilter() {
    this.loaderS = true;
    this.FilterByRating = 0;
    const CategoryBody = {
      category: this.Productscategory,
    }
    this.productpageservice.getProductDataBySubCategory(CategoryBody).subscribe((res: any) => {
      this.categoryResponse = res.data
      if (res.status) {
        this.loaderS = false;
        if (this.FilterByBrand != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { brand: string; }) => item.brand === this.FilterByBrand);
        } if (this.maxPrice != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price <= this.maxPrice);
          this.categoryResponse = this.categoryResponse.filter((item: { price: any; }) => item.price >= this.minPrice);
        } if (this.FilterByRating != 0) {
          this.categoryResponse = this.categoryResponse.filter((item: { rating: any; }) => item.rating === this.FilterByRating);
        }
      }
    })
  }

  goToProduct(productId: number) {
    window.open(`/products/${productId}`, '_blank');
  }

  showDiv: boolean = false;
  toggleDiv() {
    this.showDiv = !this.showDiv;
  }

  openNav() {
    const mySidenav = document.getElementById("mySidenav") as HTMLElement;
    if (mySidenav) {
      mySidenav.style.width = "250px";
    }
  }
  
  closeNav() {
    const mySidenav = document.getElementById("mySidenav") as HTMLElement;
    if(mySidenav){
      mySidenav.style.width = "0";
    }
  }


  selectedOrderIndex: { [key: string]: boolean } = {
    'item1': false,
    'item2': false
  };
  
  toggleOrderDetails(item: string): void {
    this.selectedOrderIndex[item] = !this.selectedOrderIndex[item];
    
  }
  
  isOrderDetailsOpen(item: string): boolean {
    return this.selectedOrderIndex[item];
  }
  
}
