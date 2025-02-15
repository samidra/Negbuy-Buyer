import { Component, OnInit } from '@angular/core';
import { ProductpageService } from '../service/product/productpage.service';
import { AuthService } from '../service/Auth/auth.service';
import { CommonService } from '../service/common/common.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { HomeService } from '../service/home.service';
import { Title } from '@angular/platform-browser';
import { FormDataService } from '../service/TrackerPageFormData/form-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sponsored-brand',
  templateUrl: './sponsored-brand.component.html',
  styleUrls: ['./sponsored-brand.component.scss']
})
export class SponsoredBrandComponent implements OnInit {

  products_slide: any = [];
  loader = true;
  uid: string | null = null;
  userlogin = false;
  private destroy$ = new Subject<void>();
  SkeletonLoads = Array(12).fill({ name: '', StartDate: '', EndDate: '' })
  constructor(
    private myservice: HomeService,
    private productPage: ProductpageService,
    private commonService: CommonService,
    private auth: AuthService,
    private formDataService: FormDataService,
    private titleService: Title,
    private WishlistService: WishlistService,
  ) { }

  sponsoredBrandName = 'Negbuy';

  ngOnInit() {
    this.dealsOfTheDay()
    this.initialize_user()
    const title = this.sponsoredBrandName + " Sponsored Page | Negbuy.com";
    this.titleService.setTitle(title);
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
    this.getDataCarousel();
  }

  set_user_credentials(user_id: string) {
    this.auth.user_id = user_id
    this.WishlistService.user_id = user_id
    this.myservice.user_id = user_id
  }

  getDataCarousel() {

    const body = {
      category: 'Electronics',
      number: 20
    }
    this.loader = true;
    this.myservice.homepage_product_category_wise(body).subscribe((res) => {
      this.products_slide = res;
      this.SkeletonLoads = res.data
      this.loader = false;
    });
  }

  spinnerBuyNow: { [productId: number]: boolean } = {};
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

  dealsOfTheDayData: any
  dealsOfTheDayLoader: boolean = true;

  dealsOfTheDay() {
    this.productPage.dealsOfTheDay().subscribe((res: any) => {
      this.dealsOfTheDayData = res.data
      this.dealsOfTheDayLoader = false;
    })
  }

  goToProduct(productId: number) {
    window.open(`/products/${productId}`, '_blank');
  }

}
