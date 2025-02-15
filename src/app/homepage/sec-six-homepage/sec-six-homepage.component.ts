import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { HomeService } from 'src/app/service/home.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sec-six-homepage',
  templateUrl: './sec-six-homepage.component.html',
  styleUrls: ['./sec-six-homepage.component.scss']
})
export class SecSixHomepageComponent {

  products_slide: any[] = [];
  loader = true;
  userlogin = false;
  spinnerBuyNow: { [productId: number]: boolean } = {};
  SkeletonLoads = Array(12).fill({ name: '', StartDate: '', EndDate: '' });
  private destroy$ = new Subject<void>();
  constructor(private myservice: HomeService,
    private auth: AuthService,
    private formDataService: FormDataService,
    private WishlistService: WishlistService) { }

  ngOnInit() {
    this.initialize_user()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initialize_user() {
    const loginResponse = this.formDataService.getLogInResponse();
    if (loginResponse) {
      const { user_id, userType } = loginResponse
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
      category1: 'Toys & Games',
      category2: 'Arts & Entertainment',
      number: 20
    }
    this.loader = true;
    this.myservice.homepage_product_slide_category_wise(body).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.products_slide = res.data;
      this.SkeletonLoads = res.data.category_data1
      this.loader = false;
    });

  }
  
}
