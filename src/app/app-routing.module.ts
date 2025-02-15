import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { MywishlistComponent } from './profile/mywishlist/mywishlist.component';
import { NotificationComponent } from './profile/notification/notification.component';
import { MyRfqComponent } from './profile/my-rfq/my-rfq.component';
import { ReturnCenterComponent } from './profile/return-center/return-center.component';
import { OursericesComponent } from './profile/ourserices/ourserices.component';
import { SponsoredBrandComponent } from './sponsored-brand/sponsored-brand.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PaymentFlowComponent } from './payment-flow/payment-flow.component';
import { RefundCancellationComponent } from './refund-cancellation/refund-cancellation.component';
import { SearchByCategoryComponent } from './search-by-category/search-by-category.component';
import { AllChatsComponent } from './profile/all-chats/all-chats.component';
import { MyRecommendationComponent } from './profile/my-recommendation/my-recommendation.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { InvoiceOrderComponent } from './invoice-order/invoice-order.component';


const routes: Routes = [
  {
    path:'', loadChildren:() => import("./homepage/homepage.module").then(m=> m.HomepageModule)
  },

  {
    path:"products/:productId",
    // loadChildren:() => import("./product/product.module").then(m=> m.ProductModule)
    loadChildren:() => import("./products/products.module").then(m=> m.ProductsModule)
  },
  {
    path:"products/:productId",
    loadChildren:() => import("./products/trackerpage/tracking.module").then(m=> m.TrackingModule)
  },
  {
    path:"category/:Subcategory",
    loadChildren:() => import("./sub-category/sub-category.module").then(m=> m.SubCategoryModule)
  },
  {
    path:"help-center",
    loadChildren:() => import("./profile/helpcenter/helpcenter.module").then(m=> m.HelpcenterModule)
  },
  {
    path:"blogs",
    loadChildren:() => import("./profile/my-blog/my-blog.module").then(m=> m.MyBlogModule),
    // title: `Blogs` 
  },
  {
    path:"my-order",
    loadChildren:() => import("./profile/my-order/my-order.module").then(m=> m.MyOrderModule)
  },
  {
    path:"profile-page",
    component:ProfilePageComponent
  },
  {
    path:"signin",
    component:SignInComponent
  },
  {
    path:"my-Wishlist",
    component:MywishlistComponent
  },
  {
    path:"my-Notification",
    component:NotificationComponent
  },
  {
    path:"my-rfq",
    component:MyRfqComponent
  },
  {
    path:"return-center",
    component:ReturnCenterComponent
  },
  {
    path:"services",
    component:OursericesComponent
  },
  {
    path:"negbuy-brand-sponsored-page",
    component:SponsoredBrandComponent
  } ,
  {
    path:"terms_of_use",
    component:TermsAndConditionComponent
  },
  {
    path:"privacy_policy",
    component:PrivacyPolicyComponent
  },
  {
    path:"payment_flow",
    component:PaymentFlowComponent
  },
  {
    path:"refund_cancellation",
    component:RefundCancellationComponent
  },
  {
    path:"searched_products",
    component:SearchByCategoryComponent
  },
  {
    path:"all-chats",
    component:AllChatsComponent
  },
  {
    path:"my-recommendation",
    component:MyRecommendationComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
