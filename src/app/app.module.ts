import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeService } from "./service/home.service"
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from './footer/footer.module';
import { MainheaderModule } from './mainheader/mainheader.module';
import { SubheaderModule } from './subheader/subheader.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HighchartsChartModule } from 'highcharts-angular';

import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MyOrderComponent } from './profile/my-order/my-order.component';
import { MywishlistComponent } from './profile/mywishlist/mywishlist.component';
import { NotificationComponent } from './profile/notification/notification.component';
import { HelpcenterComponent } from './profile/helpcenter/helpcenter.component';
import { OurservicesModule } from "./ourservices/ourservices.module";
import { MyRfqComponent } from './profile/my-rfq/my-rfq.component';
import { MyBlogComponent } from './profile/my-blog/my-blog.component';
import { MyBlogModule } from "./profile/my-blog/my-blog.module";
import { return_request, ReturnCenterComponent } from './profile/return-center/return-center.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OursericesComponent } from './profile/ourserices/ourserices.component';
import { SponsoredBrandComponent } from './sponsored-brand/sponsored-brand.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgRatingBarModule } from 'ng-rating-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PaymentFlowComponent } from './payment-flow/payment-flow.component';
import { RefundCancellationComponent } from './refund-cancellation/refund-cancellation.component';
import { SearchByCategoryComponent } from './search-by-category/search-by-category.component';
import { AllChatsComponent } from './profile/all-chats/all-chats.component';
import { MyRecommendationComponent } from './profile/my-recommendation/my-recommendation.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfilePageComponent,
        SignInComponent,
        SubCategoryComponent,
        MyOrderComponent,
        MywishlistComponent,
        NotificationComponent,
        HelpcenterComponent,
        MyRfqComponent,
        MyBlogComponent,
        ReturnCenterComponent,
        OursericesComponent,
        SponsoredBrandComponent,
        TermsAndConditionComponent,
        PrivacyPolicyComponent,
        PaymentFlowComponent,
        RefundCancellationComponent,
        SearchByCategoryComponent,
        AllChatsComponent,
        MyRecommendationComponent,
        NotFoundComponent,
        return_request

    ],
    providers: [HomeService],
    bootstrap: [AppComponent],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule,
        BrowserModule,
        SlickCarouselModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FooterModule,
        MainheaderModule,
        SubheaderModule,
        SubCategoryModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        NgbModule,
        HighchartsChartModule,
        NgxShimmerLoadingModule,
        FormsModule,
        NgOtpInputModule,
        NgxImageZoomModule,
        OurservicesModule,
        MyBlogModule,
        Ng2SearchPipeModule,
        IvyCarouselModule,
        NgRatingBarModule,
        NgxPaginationModule
    ]
})
export class AppModule { }
