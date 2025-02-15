import { Component } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProductpageService } from 'src/app/service/product/productpage.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent {
  sectionLoaded = 0;
  loaderS: boolean = true;
  uid: string | null = null;
  p: string|number|undefined;
  constructor(private auth: AuthService,
    private productPage: ProductpageService,
    private formDataService: FormDataService,
    private PaymentGatewayService: PaymentGatewayService,
    private ProfileServiceService: ProfileServiceService,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit() {
    const title = "My Order | Negbuy.com";
    this.titleService.setTitle(title);

    this.formDataService.clearShipmodeOrderId();
    this.formDataService.clearFormData();

    window.scrollTo(0, 0)
    this.findUserLogin()

  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
        this.productPage.user_id = this.uid
      }
    }
    this.BuyerAddress()
    this.MyOrder()
  }

  BuyerAddressDelivery: any;
  profile_pic: any;
  BuyerAddress() {

    if (this.formDataService.getLogInResponse() != null) {
      this.BuyerAddressDelivery = this.formDataService.getLogInResponse()
      let url = "https://negbuy.com:8080"
      this.profile_pic = url + this.BuyerAddressDelivery.imageUrl
    }
  }

  myOrderRes: any
  onTheWay: any = []
  deliveredOrders: any = []
  Cancelled: any = []
  confirmed: any = []
  Ready_For_Pick_Up: any = []
  MyOrder() {
    this.loaderS = true;
    this.ProfileServiceService.MyOrder().subscribe((response: any) => {
      this.myOrderRes = response.data;
      this.onTheWay = this.myOrderRes.filter((order: { status: string; }) => order.status === 'On the Way')
      this.deliveredOrders = this.myOrderRes.filter((order: { status: string; }) => order.status === 'Delivered' || order.status === 'Picked Up');
      this.confirmed = this.myOrderRes.filter((order: { status: string; }) => order.status === 'Confirmed');
      this.Ready_For_Pick_Up = this.myOrderRes.filter((order: { status: string; }) => order.status === 'Ready For Pick Up');
      this.loaderS = false;
    })
  }

  filterOrdersByOption(option: string) {
    return this.myOrderRes.filter((order: { delivery_option: string; }) => order.delivery_option === option);
  }

  filterCancelledOrders(orders: any[]) {
    return orders.filter((order: { status: string; }) => order.status === 'Cancelled');
  }

  showcontent(value: number) {
    this.sectionLoaded = value;
    this.sectionLoaded_ddp_exwork = 0
    this.selected_order_type = this.sectionLoaded === 1 ? 'DDP' : this.sectionLoaded === 2 ? 'ExWork' : '';
    this.deliveredOrders = this.sectionLoaded === 1 ? this.myOrderRes.filter((order: { status: string; }) => order.status === 'Delivered') : this.sectionLoaded === 2 ? this.myOrderRes.filter((order: { status: string; }) => order.status === 'Picked Up') : this.myOrderRes.filter((order: { status: string; }) => order.status === 'Delivered' || order.status === 'Picked Up')
    const option = this.sectionLoaded === 1 ? 'DDP' : 'ExWork';
    const filteredOrders = this.filterOrdersByOption(option);
    this.Cancelled = this.filterCancelledOrders(filteredOrders);


    window.scrollTo(0, 0)
  }

  sectionLoaded_ddp_exwork = 0;
  selected_order_type: any
  show_ddp_exwork(value: number) {
    this.sectionLoaded_ddp_exwork = value;
    window.scrollTo(0, 0)

  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

  goToDeliverySatusPage(delivery_option: any, order_id: any) {
    const data = {
      shipment_type: delivery_option,
      order_id: order_id
    }
    this.formDataService.setShipmodeOrderId(data)
    this.router.navigate(['my-order/order-delivery-status']); // Navigate to the 'contact' route
  }

  selectedOrderIndex: string | null = null;
  toggleOrderDetails(item: string): void {

    item === 'item1' || item === 'item2' ? this.selectedOrderIndex = item : this.selectedOrderIndex = null
  }
  isOrderDetailsOpen(item: string): boolean {
    return this.selectedOrderIndex === item;
  }

}
