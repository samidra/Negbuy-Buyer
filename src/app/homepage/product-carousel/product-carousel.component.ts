import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
  @Input() category: any;
  @Input() products: any[] = [];
  @Input() products_two: any[] = [];
  @Input() loader: boolean = false;
  @Input() spinnerBuyNow: any = {};
  @Input() userlogin: boolean = false;

  private destroy$ = new Subject<void>();
  constructor(
    private commonService: CommonService,
    private WishlistService: WishlistService
  ) { }

  ngOnInit(): void { }

  goToProduct(productId: number) {
    window.open(`/products/${productId}`, '_blank');
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
}
