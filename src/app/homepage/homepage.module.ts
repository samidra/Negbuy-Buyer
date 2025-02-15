import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from "angular-responsive-carousel";
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { FormsModule } from '@angular/forms';
import { AnimalsliderComponent } from './animalslider/animalslider.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubheaderModule } from '../subheader/subheader.module';
import { BannerComponent } from './carousal/banner/banner.component';
import { OfficeSuppliesComponent } from './sec-three-homepage/office-supplies/office-supplies.component';
import { VehiclePartComponent } from './sec-two-homepage/vehicle-part/vehicle-part.component';
import { ElectroniEquipmentComponent } from './sec-zero-homepage/electroni-equipment/electroni-equipment.component';
import { ApparelAccessoriesComponent } from './sec-three-homepage/apparel-accessories/apparel-accessories.component';
import { SportGoodComponent } from './sec-one-homepage/sport-good/sport-good.component';
import { HardwareComponent } from './sec-one-homepage/hardware/hardware.component';
import { FurnitureComponent } from './sec-two-homepage/furniture/furniture.component';
import { CameraOpticComponent } from './sec-zero-homepage/camera-optic/camera-optic.component';
import { HomeGardensComponent } from './sec-five-homepage/home-gardens/home-gardens.component';
import { HealthBeatuyComponent } from './sec-five-homepage/health-beatuy/health-beatuy.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RequirementFormComponent } from './requirement-form/requirement-form.component';
import { SupplierCityComponent } from './supplier-city/supplier-city.component';
import { SearchByBrandComponent } from './search-by-brand/search-by-brand.component';
import { PosterCarouselComponent } from './carousal/poster-carousel/poster-carousel.component';
import { AnimalPetCareComponent } from './sec-seven-homepage/animal-pet-care/animal-pet-care.component';
import { GamesComponent } from './sec-six-homepage/games/games.component';
import { ArtCraftComponent } from './sec-six-homepage/art-craft/art-craft.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterModule } from "../footer/footer.module";
import { OurservicesModule } from "../ourservices/ourservices.module";
import { BabyToddlerComponent } from './sec-four-homepage/baby-toddler/baby-toddler.component';
import { BusinessIndustrialComponent } from './sec-four-homepage/business-industrial/business-industrial.component';
import { SecOneHomepageComponent } from './sec-one-homepage/sec-one-homepage.component';
import { SecZeroHomepageComponent } from './sec-zero-homepage/sec-zero-homepage.component';
import { SecTwoHomepageComponent } from './sec-two-homepage/sec-two-homepage.component';
import { SecThreeHomepageComponent } from './sec-three-homepage/sec-three-homepage.component';
import { SecFourHomepageComponent } from './sec-four-homepage/sec-four-homepage.component';
import { SecFiveHomepageComponent } from './sec-five-homepage/sec-five-homepage.component';
import { SecSixHomepageComponent } from './sec-six-homepage/sec-six-homepage.component';
import { SecSevenHomepageComponent } from './sec-seven-homepage/sec-seven-homepage.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';



@NgModule({
    declarations: [
        HomepageComponent,
        AnimalsliderComponent,
        HeaderComponent,
        BannerComponent,
        OfficeSuppliesComponent,
        VehiclePartComponent,
        ElectroniEquipmentComponent,
        ApparelAccessoriesComponent,
        SportGoodComponent,
        HardwareComponent,
        FurnitureComponent,
        CameraOpticComponent,
        HomeGardensComponent,
        HealthBeatuyComponent,
        RequirementFormComponent,
        SupplierCityComponent,
        SearchByBrandComponent,
        PosterCarouselComponent,
        AnimalPetCareComponent,
        GamesComponent,
        ArtCraftComponent,
        BabyToddlerComponent,
        BusinessIndustrialComponent,
        SecOneHomepageComponent,
        SecZeroHomepageComponent,
        SecTwoHomepageComponent,
        SecThreeHomepageComponent,
        SecFourHomepageComponent,
        SecFiveHomepageComponent,
        SecSixHomepageComponent,
        SecSevenHomepageComponent,
        ProductCarouselComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HomepageRoutingModule,
        IvyCarouselModule,
        SubheaderModule,
        NgxSkeletonLoaderModule,
        SlickCarouselModule,
        FooterModule,
        OurservicesModule,
    ]
})
export class HomepageModule { }
