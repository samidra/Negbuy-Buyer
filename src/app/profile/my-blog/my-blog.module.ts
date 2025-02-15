import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { myblogRoutingModule } from './my-blog-routing.module';
import { BlogDetailComponent, sign_in_from_blog } from './blog-detail/blog-detail.component';
import { FooterModule } from "../../footer/footer.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MainheaderModule } from "../../mainheader/mainheader.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
    declarations: [
        BlogDetailComponent,
        sign_in_from_blog
    ],
    imports: [
    CommonModule,
    myblogRoutingModule,
    FooterModule,
    SlickCarouselModule,
    MainheaderModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    NgOtpInputModule
]
})
export class MyBlogModule { }
