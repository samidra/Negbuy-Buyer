import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductpageService } from '../service/product/productpage.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { CommonService } from '../service/common/common.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from '../service/TrackerPageFormData/form-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})

export class SubCategoryComponent {
  Productscategory: any;
  search_query: any = '';
  categoryProductsId: any;
  product_id: any;
  loaderS: boolean = true;
  loaderFilter: boolean = true;
  uid: string | null = null;
  p: string | number | undefined;
  private destroy$ = new Subject<void>();
  userlogin = false;
  spinnerBuyNow: { [productId: number]: boolean } = {};

  constructor(
    private productpageservice: ProductpageService,
    private route: ActivatedRoute,
    private titleService: Title,
    private auth: AuthService,
    private formDataService: FormDataService,
    private commonService: CommonService,
    private WishlistService: WishlistService) { }

  ngOnInit() {
    this.initialize_user()

    const title = "Find the best deals on " + this.Productscategory + " | Negbuy.com";
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initialize_user() {
    const loginResponse = this.formDataService.getLogInResponse()

    if (loginResponse) {
      const { user_id, userType } = loginResponse
      this.uid = user_id
      this.set_user_credentials(user_id);
      this.userlogin = (userType === 'Buyer');
    }

    this.route.params.subscribe((params: Params) => {
      // this.Productscategory = this.route.snapshot.queryParamMap.get('ctgry')
      this.Productscategory = history.state.search_data.ctgry;
      this.search_query = history.state.search_data.ctgry.search_query
      this.categoryProductsId = history.state.search_data.ctgry.id
      this.getProductDataBySubCategory()
    });

  }

  set_user_credentials(user_id: string) {
    this.auth.user_id = user_id
    this.productpageservice.user_id = user_id
    this.WishlistService.user_id = user_id
  }


  add_remove_wishlist(product: any): void {
    this.spinnerBuyNow[product.product_id] = true;
    const { product_id, wishlisted } = product
    product.wishlisted = !wishlisted;

    const action = wishlisted
      ?
      this.WishlistService.RemoveWishListProduct({ product_id })
      : this.WishlistService.AddWishListProduct({ product_id })


    wishlisted
      ? this.commonService.displayWarning('Product Removed to your wishlist sucessfully')
      : this.commonService.displaySuccess('Product Added to your wishlist sucessfully')

    action.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.spinnerBuyNow[product_id] = false;
    })

  }


  activeCategory = 16;
  toggleCategory(value: any) {
    this.activeCategory = value
  }

  activecolor = 0;
  Colour(value: any) {
    this.activecolor = value
  }

  categoryResponse: any = []
  BrandNameShow: any
  categoryResponsetotalItems: any
  pageLoading: boolean = false;
  colorAvailable: any;
  colorAvailableHex: any;
  colorData: { colourName: string, colorCode: string }[] = [];
  colors: { [key: string]: string } = {};
  getProductDataBySubCategory() {
    this.loaderS = true;
    this.loaderFilter = true;

    if (this.categoryProductsId === '') {
      this.categoryProductsId = null
    }

    const CategoryBody = {
      search_query: this.search_query,
      category: this.Productscategory,
      product_id: this.categoryProductsId
    }


    this.productpageservice.getProductDataBySubCategory(CategoryBody).subscribe((res: any) => {

      if (res.status === true) {
        this.categoryResponse = res.data
        this.categoryResponsetotalItems = this.categoryResponse.length;

        if (this.categoryResponse.length === 0) {
          this.pageLoading = true
        }

        this.BrandNameShow = Array.from(new Set(this.categoryResponse.map((item: { brand: any; }) => item.brand)));


        for (const color of this.categoryResponse) {
          this.colors[color.color] = color.hex_color;
        }

        // Map the object to the desired format
        this.colorData = Object.keys(this.colors).map(colourName => ({ colourName, colorCode: this.colors[colourName] }));

        this.product_id = this.categoryResponse.product_id
        this.loaderS = false
        this.loaderFilter = false;

      } else {
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
  FilterByColor = '';
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
        } if (this.FilterByColor != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { color: string; }) => item.color === this.FilterByColor);
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
        } if (this.FilterByColor != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { color: string; }) => item.color === this.FilterByColor);
        }
      }
    })
  }

  removeColorFilter() {
    this.FilterByColor = '';
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
        } if (this.FilterByColor != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { color: string; }) => item.color === this.FilterByColor);
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
        } if (this.FilterByColor != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { color: string; }) => item.color === this.FilterByColor);
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
        } if (this.FilterByColor != '') {
          this.categoryResponse = this.categoryResponse.filter((item: { color: string; }) => item.color === this.FilterByColor);
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
    if (mySidenav) {
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
