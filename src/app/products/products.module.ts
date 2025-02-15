import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
// components moudles
import { MainheaderModule } from '../mainheader/mainheader.module';
import { SubheaderModule } from '../subheader/subheader.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TrackerpageComponent } from './trackerpage/trackerpage.component';


import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

import { NgxPaginationModule } from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { FooterModule } from "../footer/footer.module";
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgRatingBarModule } from 'ng-rating-bar';

@NgModule({
    declarations: [
        ProductsComponent,
        TrackerpageComponent,
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        MatIconModule,
        MainheaderModule,
        SubheaderModule,
        NgxSkeletonLoaderModule,
        IvyCarouselModule,
        NgbRating,
        FormsModule,
        ReactiveFormsModule,
        HighchartsChartModule,
        NgxShimmerLoadingModule,
        FooterModule,
        NgxImageZoomModule,
        NgRatingBarModule,
        NgxPaginationModule
    ]
})
export class ProductsModule { }
