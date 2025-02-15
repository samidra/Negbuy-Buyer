import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { ProductpageService } from 'src/app/service/product/productpage.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/service/common/common.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-mywishlist',
  templateUrl: './mywishlist.component.html',
  styleUrls: ['./mywishlist.component.scss']
})
export class MywishlistComponent {
  sectionLoaded = 0;
  loaderS: boolean = true;
  uid: string | null = null;
  product_id: any;
  p: string|number|undefined;

  constructor(private auth: AuthService,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService,
    private WishlistService:WishlistService,
    private commonService: CommonService,
    private titleService: Title) { }

  ngOnInit() {
    window.scrollTo(0,0)
    this.findUserLogin()
    const title = "Wishlist | Negbuy.com";
    this.titleService.setTitle(title);
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.WishlistService.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
      }
    }
    this.BuyerAddress()
    this.GetWishlistProduct()
  }

  GetWishlistProductResponse: any
  GetWishlistProduct() {
    this.loaderS = true;

    this.WishlistService.GetWishlistProduct().subscribe((res: any) => {
      this.GetWishlistProductResponse = res.data
      this.product_id = this.GetWishlistProductResponse.product_id
      this.loaderS = false
      
    })
  }

  goToProduct(productId: number) {
    window.open(`/products/${productId}`, '_blank');
  }

  RemoveWishListProduct(productId: number) {
    const RemoveWishlistBody = {
      product_id: productId,
    }
    this.WishlistService.RemoveWishListProduct(RemoveWishlistBody).subscribe((res: any) => {
      
      if(res.status){
        this.commonService.displayWarning('The product has been successfully removed from your wishlist.')
        this.GetWishlistProduct()
        this.display = "none";
      }
    })
  }

  BuyerAddressDelivery: any;
  profile_pic:any;

  BuyerAddress() {

    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.BuyerAddressDelivery = this.formDataService.getLogInResponse()
      let url = "https://negbuy.com:8080"
      this.profile_pic = url + this.BuyerAddressDelivery.imageUrl
    }
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

  display = "none";
  ProductToRemoveFromWishlist:any
  openModalToRemove(product_ID:any) {
    this.ProductToRemoveFromWishlist = product_ID
    this.display = "flex";
  }

  onCloseHandledToRemove() {
    this.display = "none";
  }
  
}
