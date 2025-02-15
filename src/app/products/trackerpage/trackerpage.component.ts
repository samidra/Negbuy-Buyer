import { Component, OnInit } from '@angular/core';
import { ProductpageService } from 'src/app/service/product/productpage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { ViewportScroller } from '@angular/common';
import { countryCodes, countryNames } from 'src/app/service/country';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { DeliveryPartner } from 'src/app/Models/app.models';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/service/common/common.service';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';

declare var $: any;
var Highcharts = require('highcharts/highmaps.js'),
map = require('@highcharts/map-collection/custom/world.topo.json');


@Component({
  selector: 'app-trackerpage',
  templateUrl: './trackerpage.component.html',
  styleUrls: ['./trackerpage.component.scss']
})
export class TrackerpageComponent implements OnInit {
  spinnerBuyNow: boolean = true;
  spinneraddpin: boolean = true;
  spinnerCheck: boolean = true;
  productData: any = {}
  product_id: any
  sizeId: any
  ProductWeight: any
  count: any
  DomesticCouriersPartner: any;
  userId: any;
  instance_id: any;
  shippingMode: any;
  productId: any;
  ShowDeliveryPartner: boolean = false;
  estimatedDate:any;
  uid: string | null = null;
  formData: any = [];


  constructor(private ProductpageService: ProductpageService, private router: Router,private commonService: CommonService,
    private route: ActivatedRoute, private PaymentGatewayService: PaymentGatewayService, private titleService: Title,
    private viewportScroller: ViewportScroller, private auth: AuthService, private formDataService: FormDataService,
    private ProfileServiceService:ProfileServiceService) {
    this.productId = this.route
  }

  ngOnInit() {

    const title = "Delivery Details | Negbuy.com";
    this.titleService.setTitle(title);
    // const countryList = countryNames.countries;
    this.countries = countryCodes.countries;

    this.productId = this.route.snapshot.queryParamMap.get('product_id') || 0;;
    this.sizeId = this.route.snapshot.queryParamMap.get('sizeId') || 0;;
    this.count = this.route.snapshot.queryParamMap.get('count') || 0;;
    this.ProductWeight = this.route.snapshot.queryParamMap.get('wgt') || 0;;
    this.instance_id = this.route.snapshot.queryParamMap.get('instcid') || 0;
    
    this.productData = this.ProductpageService.SelectedProductData;
    // alert(JSON.stringify(this.productData));

    this.shipRocketToken();
    this.warehouseDetail()

    this.findUserLogin()

    if (this.formDataService.getFormData() != null) {
      const formData = this.formDataService.getFormData();
      

      this.sizeId = formData.product_id;
      this.count = formData.quantity;
      this.trackingForm.trackingFormMode = formData.order_type;
      this.trackingForm.selectRoute = formData.transport_mode;
      this.trackingForm.addressDetail.FullAddress = formData.delivery_address;
      this.trackingForm.addressDetail.country = formData.country;
      this.trackingForm.addressDetail.state = formData.state;
      this.trackingForm.addressDetail.city = formData.city;
      this.trackingForm.addressDetail.pincode = formData.pincode;
      this.DomesticCouriersPartner = formData.DomesticCouriersPartner
      // Type assertions may be needed here if DeliveryPartner is 'any'

      this.DeliveryPartner = {

        freight_charge: formData.freight_charge,
        company_courier_id: formData.company_courier_id,
        company_courier_name: formData.company_courier_name,
        estimated_delivery_days: formData.estimated_delivery_days
      };
      if (formData.freight_charge != undefined) {
        this.ShowDeliveryPartner = true;
      }
      

    }

  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null){
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProductpageService.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
      }
    }
    this.GlobePoint()
  }

  coordinates: Array<Array<number>> = [];
  deliveryType: string = 'ddp';
  markerData:any
  MapGloble = false;
  MapGlobleMain = "ToHide";

  BuyerAddressDelivery: any;
  cityname:any


  SellerLat:any
  SellerLon:any
  BuyerLat:any
  BuyerLon:any

  GlobePoint() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.BuyerLat = Number(position.coords.latitude);
            this.BuyerLon = Number(position.coords.longitude);
      
            this.get_city_Details()
          }
        },
        (error: any) => {
          
          const body = {
            user_id: this.uid
          }
          this.ProfileServiceService.GetProfileData(body).subscribe((response: any) => {
            this.BuyerAddressDelivery = response.data;  
            this.cityname = response.data.city;  
            this.get_city_Details()
          })
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  

  createGlobe( SellerLon:any, SellerLat:any, BuyerLon:any, BuyerLat:any) {
    this.MapGloble = true;
    if (this.trackingForm.trackingFormMode === 'DDP') {
      this.moveTotop();
    } 
    this.spinnerCheck = true;
    this.MapGlobleMain = "ToShow";
    const data = countryNames.countries;
    
    const getGraticule = () => {
      const data = [];
  
      // Meridians
      for (let x = -180; x <= 180; x += 15) {
        data.push({
          geometry: {
            type: 'LineString',
            animation: true,
            coordinates: x % 90 === 0 ? [
              [x, -90],
              [x, 0],
              [x, 90]
            ] : [
              [x, -80],
              [x, 80]
            ]
          }
        });
      }
  
      // Latitudes
      for (let y = -90; y <= 90; y += 10) {
        const coordinates = [];
        for (let x = -180; x <= 180; x += 5) {
          coordinates.push([x, y]);
        }
        data.push({
          geometry: {
          type: 'LineString',
            coordinates: coordinates
          },
          lineWidth: y === 0 ? 2 : undefined,
        });
      }
      return data;
    };

    const afterAnimate = (e: any) => {
      const chart = e.target.chart;
  
      if (!chart.get('flight-route')) {
          chart.addSeries({
              type: 'mapline',
              animation: true,
              id: 'route',
              data: [{
                  geometry: {
                      type: 'LineString',
                      coordinates: [
                          [SellerLat, SellerLon ], // Noida
                          [BuyerLat, BuyerLon] // Los Angeles
                          // [-71.217133,42.341042]
                      ]
                  },
                  color: '#ff0000'
                  
              }],
              lineWidth: 1,
              dashStyle: 'LongDash',
              color: '#313f77',
          }, false);
          chart.addSeries({
              type: 'mappoint',
              color: 'Black',
              animation: true,
              dataLabels: {
                useHTML: true,
                format: '{point.name}'
              },
              data: [{
                name: 'Delhi',
                lat: SellerLon,
                lon: SellerLat,
              },
              {
                name:  this.cityname,
                // lat:42.341042,
                // lon: -71.217133,
                lat: BuyerLon, 
                lon: BuyerLat,
              }
              ],
              // data: markerData
          }, false);
          chart.redraw(false);
      }
  };
    const chart = Highcharts.mapChart('negbuy-globe', {
      chart: {
        map: map
      },
      credits: {
        enabled: false
      },
      title: {
        text: '',
        floating: true,
        align: 'left',
        style: {
          textOutline: '2px white'
        }
      },
  
      subtitle: {
        text: '',
        floating: true,
        y: 34,
        align: 'left'
      },
  
      legend: {
        enabled: false
      },
  
      mapNavigation: {
        enabled: true,
        enableDoubleClickZoomTo: true,
        buttonOptions: false
      },
  
      mapView: {
        maxZoom: 8,
        projection: {
          name: 'Orthographic',
          rotation: [-80, -30]
        }
      },
  
      colorAxis: {
        tickPixelInterval: 100,
        minColor: '#E7E6E6',
        maxColor: '#E7E6E6',
        max: 1000
      },
  
      tooltip: {
        pointFormat: '{point.name}'
      },
  
      plotOptions: {
        series: {
          animation: {
            duration: 750
          },
          clip: false
        }
      },
  
      series: [{
        name: 'Graticule',
        id: 'graticule',
        type: 'mapline',
        data: getGraticule(),
        nullColor: 'rgba(0, 0, 0, 0.05)'
      }, {
        data,
        joinBy: 'name',
        name: '',
        states: {
          
          hover: {
            color: '#EF1727',
            borderColor: '#EF1727'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },
        events: {
          afterAnimate
        }
      }]
    });

    const renderSea = () => {
      let verb = 'animate';
      if (!chart.sea) {
        chart.sea = chart.renderer
          .circle()
          .attr({
            fill: {
              radialGradient: {
                cx: 0.4,
                cy: 0.4,
                r: 1
              },
              stops: [
                [0, '#D7D6D5'],
                [1, '#D7D6D5']
              ]
            },
            zIndex: -1
          })
          .add(chart.get('graticule').group);
        verb = 'attr';
      }
  
      const bounds = chart.get('graticule').bounds,
        p1 = chart.mapView.projectedUnitsToPixels({
          x: bounds.x1,
          y: bounds.y1
        }),
        p2 = chart.mapView.projectedUnitsToPixels({
          x: bounds.x2,
          y: bounds.y2
        });
      chart.sea[verb]({
        cx: (p1.x + p2.x) / 2,
        cy: (p1.y + p2.y) / 2,
        r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2
      });
    };
    renderSea();
    Highcharts.addEvent(chart, 'redraw', renderSea);
  }

  createMap(SellerLon:any, SellerLat:any, BuyerLon:any, BuyerLat:any) {
    const data = countryNames.countries;

    $('#negbuy-world').highcharts('Map', {
      chart: {
        height: '350px'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{point.name}'
      },
      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: 'top'
        }
      },
      colorAxis: {
        minColor: '#f8f8f8',
        maxColor: '#f8f8f8',
        min: 0
      },
      series: [{
        data: data,
        mapData: map,
        joinBy: 'name',
        name: '',
        states: {
          hover: {
            color: '#EF1727',
            borderColor: '#EF1727'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        }
      },
      {
        type: 'mapline',
        animation: true,
        id: 'route',
        data: [{
          name: 'India',
                geometry: {
                  type: 'LineString',
                        coordinates: [
                            [ SellerLat, SellerLon], // Amsterdam
                            [BuyerLat, BuyerLon]  // Los Angeles
                        ]
                },
                color: '#EF1727'
            }],
        lineWidth: 1,
        dashStyle: 'LongDash',
      },
      {
        type: 'mappoint',
        color: '#000000',
        dataLabels: {
          useHTML: true,
          format: '{point.name}'
        },
        data: [
          
          {
            name: 'Delhi',
            lat: SellerLon, 
            lon: SellerLat,
          },
          {
            name:  this.cityname,
            // lat:42.341042,
            // lon: -71.217133,
            lat: BuyerLon, 
            lon: BuyerLat,
          },
        ],
      },
    ]
    });
  }


  changeDeliveryMode($event: any) {
    
    if ($event.type == 'change') {
      this.ProductpageService.shippingMode = this.trackingForm.trackingFormMode;
    }
  }

  shipRocketToken() {
    this.PaymentGatewayService.shipRocketGenerateAuthToken().subscribe((res: any) => {
      if (res.status) {
        res.data.token;
        this.PaymentGatewayService.GlobalToken = res.data.token;
        
      }
    });
  }

  bntStyle = 'checkstatuscont'

  mode: any[] = [
    { name: 'DDP', value: 'DDP' },
    { name: 'Ex-work', value: 'Ex-work' },
  ]
  routes: any[] = [
    { name: 'By Air', value: 'Air' },
    { name: 'By Water', value: 'Water' },
  ]
  countries: any[] = [

  ]

  trackingForm: any = {
    trackingFormMode: '',
    selectRoute: '',

    addressDetail: {
      pincode: '',
      city: '',
      state: '',
      country: '',
      FullAddress: ''
    },
  }
  DeliveryPartner: any

  DeliveryDateformValid() {
    if (
      !(this.trackingForm.addressDetail.pincode > 99) ||
      !this.trackingForm.addressDetail.city.length ||
      !this.trackingForm.addressDetail.state.length ||
      !this.trackingForm.addressDetail.country.length ||
      !this.trackingForm.addressDetail.FullAddress.length
    ) {

      return false

    } else {
      return true
    }
  }

  AddressDetailEXworkformValid() {
    if (
      !(this.trackingForm.addressDetail.pincode > 99) ||
      !this.trackingForm.addressDetail.city.length ||
      !this.trackingForm.addressDetail.state.length ||
      !this.trackingForm.addressDetail.country.length ||
      !this.trackingForm.addressDetail.FullAddress.length) {
      return false
    } else {
      return true
    }
  }

  showcontent(elementId: string): void {

    const body_coordinnate = {
      pincode:  this.trackingForm.addressDetail.pincode,
      country_code: this.selectedCountryCode,
      state: this.trackingForm.addressDetail.state  ,
      country: this.trackingForm.addressDetail.country,
    }
    
    this.PaymentGatewayService.GetGlobeCoordinates(body_coordinnate).subscribe((res: any) => {
      
      this.SellerLat = Number(res.data.seller.latitude);
      this.SellerLon = Number(res.data.seller.longitude);
      this.BuyerLat  = Number(res.data.buyer.latitude);
      this.BuyerLon  = Number(res.data.buyer.longitude);

      const body_latlon = {
        lati: this.BuyerLat,
        longi: this.BuyerLon
      }

      this.PaymentGatewayService.Get_city_by_LatLon(body_latlon).subscribe((res: any) => {
        this.cityname = res.data.city;  

        const selectedCountryName = res.data.country;
        const selectedCountry = this.countries.find(country => country.name === selectedCountryName);
        this.selectedCountryCode = selectedCountry ? selectedCountry.code : '';
       
        this.createGlobe(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
        this.createMap(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
      })
  
    });

    const scrollTarget = document.getElementById(elementId);
    const scrollDistance = scrollTarget!.offsetTop - (window.innerHeight / 2) + 325;

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });

  }

  formsubmitDDP() {
    
    this.shippingMode = this.trackingForm.trackingFormMode;
    this.router.navigate(['../payment-details'], {
      relativeTo: this.route,
      queryParams: {
        instcid: this.instance_id, shpMde: this.shippingMode,
        pdctId: this.productId, cnts: this.count, szid: this.sizeId,
        wtg: this.ProductWeight
      }
    });
  }

  formsubmitEXWORK() {
    
    // this.shippingMode = this.trackingForm.trackingFormMode;
    this.router.navigate(['../payment-details'], {
      relativeTo: this.route,
      queryParams: {
        instcid: this.instance_id, shpMde: this.shippingMode,
        pdctId: this.productId, cnts: this.count, szid: this.sizeId,
        wtg: this.ProductWeight
      }
    });
  }

  selectedCountryCode: string = '';
  onCountrySelect(event: any) {
    const selectedCountryName = event.target.value;
    const selectedCountry = this.countries.find(country => country.name === selectedCountryName);
    this.selectedCountryCode = selectedCountry ? selectedCountry.code : '';
    
  }


  proceedValidate: Boolean = false;
  delivery_not_available: Boolean = false;
  check() {
    this.PaymentGatewayService.globePincodeMap = this.trackingForm.addressDetail.pincode;
    this.spinnerCheck = false;
    this.delivery_not_available = false;
    const body = {
      size_id: this.sizeId,
      weight: this.ProductWeight,
      quantity: this.count,
      city: this.trackingForm.addressDetail.city,
      state: this.trackingForm.addressDetail.state,
      pincode: this.trackingForm.addressDetail.pincode,
      country: this.trackingForm.addressDetail.country
    }

    this.PaymentGatewayService.delivery_courier_rate(body).subscribe((response: any) => {

      const body_coordinnate = {
        pincode:  this.trackingForm.addressDetail.pincode,
        country_code: this.selectedCountryCode,
        state: this.trackingForm.addressDetail.state  ,
        country: this.trackingForm.addressDetail.country,
      }
      
      this.PaymentGatewayService.GetGlobeCoordinates(body_coordinnate).subscribe((res: any) => {
        
        this.SellerLat = Number(res.data.seller.latitude);
        this.SellerLon = Number(res.data.seller.longitude);
        this.BuyerLat  = Number(res.data.buyer.latitude);
        this.BuyerLon  = Number(res.data.buyer.longitude);

        const body_latlon = {
          lati: this.BuyerLat,
          longi: this.BuyerLon
        }

        this.PaymentGatewayService.Get_city_by_LatLon(body_latlon).subscribe((res: any) => {
          this.cityname = res.data.city;  

          const selectedCountryName = res.data.country;
          const selectedCountry = this.countries.find(country => country.name === selectedCountryName);
          this.selectedCountryCode = selectedCountry ? selectedCountry.code : '';
          
          
         
          this.createGlobe(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
        this.createMap(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
        })
    
      });

     
      if (response.status != false) {
        this.DomesticCouriersPartner = response;
        this.estimatedDate = this.DomesticCouriersPartner.estimated_delivery_days  
        this.bntStyle = 'checkstatuscontActive';
        // this.ShowDeliveryPartner = true;
        // this.proceedValidate = true;
        
      } else {
        this.spinnerCheck = true;
        this.delivery_not_available = true;
        this.bntStyle = 'checkstatuscont'
        this.ShowDeliveryPartner = false;
        this.proceedValidate = false;
        this.commonService.displayWarning('Delivery unavailable in your area')
      }
     
    })

    
    // const body = {
    //   token: this.PaymentGatewayService.GlobalToken,
    //   pickup_pin: '201301',
    //   delivery_pin: this.trackingForm.addressDetail.pincode,
    //   weight: this.ProductWeight,
    //   mode: 'Air'
    // }

    // this.PaymentGatewayService.DomesticCouriersAvailable(body).subscribe((response: any) => {
      
    //   this.spinnerCheck = false;
    //   this.DomesticCouriersPartner = response.data;
    //   this.estimatedDate = this.DomesticCouriersPartner[0].etd
    //   if (response.status) {
    //     this.spinnerCheck = true;
    //     this.bntStyle = 'checkstatuscontActive';
    //     this.moveTotop();
    //     this.ShowDeliveryPartner = true;
    //   } else {
    //     this.spinnerCheck = false;
    //   }
    //   // this.DomesticCouriersPartner = response.data;
      
    // })

  }

  lat_long_data_res:any;

  get_city_Details(){

    if(this.BuyerLat != undefined ,this.BuyerLon != undefined){
      const body_latlon = {
        lati: this.BuyerLat,
        longi: this.BuyerLon
      }
      
      this.PaymentGatewayService.Get_city_by_LatLon(body_latlon).subscribe((res: any) => {
        
        this.cityname = res.data.city;  
        this.trackingForm.addressDetail.pincode = res.data.postcode
        this.trackingForm.addressDetail.city = res.data.city
        this.trackingForm.addressDetail.state  = res.data.state
        this.trackingForm.addressDetail.country = res.data.country
        
        const selectedCountryName = res.data.country;
        const selectedCountry = this.countries.find(country => country.name === selectedCountryName);
        this.selectedCountryCode = selectedCountry ? selectedCountry.code : '';
        
        
  
        const body_coordinnate = {
          pincode:  this.trackingForm.addressDetail.pincode,
          country_code: this.selectedCountryCode,
          state: this.trackingForm.addressDetail.state  ,
          country: this.trackingForm.addressDetail.country,
        }
        this.PaymentGatewayService.GetGlobeCoordinates(body_coordinnate).subscribe((res: any) => {
          
          this.lat_long_data_res = res
          this.SellerLat = Number(this.lat_long_data_res.data.seller.latitude);
          this.SellerLon = Number(this.lat_long_data_res.data.seller.longitude);

          this.createGlobe(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
          this.createMap(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
          
        });
      })
    }else{
      const selectedCountryName = this.cityname;
      const selectedCountry = this.countries.find(country => country.name === selectedCountryName);
      this.selectedCountryCode = selectedCountry ? selectedCountry.code : '';
      
      

      const body_coordinnate = {
        pincode:  this.trackingForm.addressDetail.pincode,
        country_code: this.selectedCountryCode,
        state: this.trackingForm.addressDetail.state  ,
        country: this.trackingForm.addressDetail.country,
      }
      this.PaymentGatewayService.GetGlobeCoordinates(body_coordinnate).subscribe((res: any) => {
        
        this.lat_long_data_res = res
        this.SellerLat = Number(this.lat_long_data_res.data.seller.latitude);
        this.SellerLon = Number(this.lat_long_data_res.data.seller.longitude);
        this.BuyerLat  = Number(this.lat_long_data_res.data.buyer.latitude);
        this.BuyerLon  = Number(this.lat_long_data_res.data.buyer.longitude);

        this.createGlobe(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
        this.createMap(this.SellerLat, this.SellerLon, this.BuyerLat, this.BuyerLon);
        
        
      });
    }
  
  }



  display = "none";
  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  moveTotop() {
    window.scrollTo(0, 0);
  }


  toProduct() {
    window.open(`./products/${this.productId}`);
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.ShowDeliveryPartner = true;
    this.proceedValidate = true;
  }


  SendDDPOrderDetails(ngform: NgForm) {
    if (ngform.form.valid) {
      const formBody = {
        product_id: this.sizeId,
        quantity: this.count,
        order_type: this.trackingForm.trackingFormMode,
        transport_mode: this.trackingForm.selectRoute,
        delivery_address: this.trackingForm.addressDetail.FullAddress,
        country: this.trackingForm.addressDetail.country,
        state: this.trackingForm.addressDetail.state,
        city: this.trackingForm.addressDetail.city,
        pincode: this.trackingForm.addressDetail.pincode,
        freight_charge: this.DomesticCouriersPartner.delivery_charge,
        estimated_delivery_days: this.DomesticCouriersPartner.estimated_delivery_days,
        // company_courier_id: this.DeliveryPartner.courier_company_id,
        // company_courier_name: this.DeliveryPartner.courier_name,
      }
      const formBody1 = {
        product_id: this.sizeId,
        quantity: this.count,
        order_type: this.trackingForm.trackingFormMode,
        transport_mode: this.trackingForm.selectRoute,
        delivery_address: this.trackingForm.addressDetail.FullAddress,
        country: this.trackingForm.addressDetail.country,
        state: this.trackingForm.addressDetail.state,
        city: this.trackingForm.addressDetail.city,
        pincode: this.trackingForm.addressDetail.pincode,
        freight_charge: this.DomesticCouriersPartner.delivery_charge,
        estimated_delivery_days: this.DomesticCouriersPartner.estimated_delivery_days,
        DomesticCouriersPartner: this.DomesticCouriersPartner,
        // company_courier_id: this.DeliveryPartner.courier_company_id,
        // company_courier_name: this.DeliveryPartner.courier_name,
      };
      this.formDataService.setFormData(formBody1)

      this.spinnerBuyNow = false;

      this.PaymentGatewayService.SendOrderDetail(formBody).subscribe((response: any) => {
        this.instance_id = response.data.instance_id
        
        if (response.status) {

          this.formsubmitDDP();
          
        } else {
          
        }
      })
    } else {
      window.scrollTo(0, 0);
      this.commonService.displayWarning('Please add all details before preceed');
    }

  }

  SendExWorkOrderDetails(ngform: NgForm) {
    if (ngform.form.valid) {
      const formBody = {
        product_id: this.sizeId,
        quantity: this.count,
        order_type: this.trackingForm.trackingFormMode,
        transport_mode: this.trackingForm.selectRoute,
        delivery_address: this.trackingForm.addressDetail.FullAddress,
        country: this.trackingForm.addressDetail.country,
        state: this.trackingForm.addressDetail.state,
        city: this.trackingForm.addressDetail.city,
        pincode: this.trackingForm.addressDetail.pincode,
      }

      const formBody1 = {
        product_id: this.sizeId,
        quantity: this.count,
        order_type: this.trackingForm.trackingFormMode,
        transport_mode: this.trackingForm.selectRoute,
        delivery_address: this.trackingForm.addressDetail.FullAddress,
        country: this.trackingForm.addressDetail.country,
        state: this.trackingForm.addressDetail.state,
        city: this.trackingForm.addressDetail.city,
        pincode: this.trackingForm.addressDetail.pincode,
      }

      this.formDataService.setFormData(formBody1)
      this.spinnerBuyNow = false;

      
      this.PaymentGatewayService.SendOrderDetail(formBody).subscribe((response: any) => {
        this.instance_id = response.data.instance_id
        if (response.status != 'Error') {
          
          this.router.navigate(['../payment-details'], {
            relativeTo: this.route,
            queryParams: {
              instcid: this.instance_id, shpMde: this.shippingMode,
              pdctId: this.productId, cnts: this.count, szid: this.sizeId,
              wtg: this.ProductWeight
            }
          });

          
        } else {
          this.spinnerBuyNow = true;
        
        }
      })
    } else {
      window.scrollTo(0, 0);
      this.commonService.displayWarning('Please add all details before preceed');
    }

  }

  Pincodew: any
  BuyerLats:any
  BuyerLons:any
  getAddByPin() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.BuyerLats = Number(position.coords.latitude);
            this.BuyerLons = Number(position.coords.longitude);
  
            const pinBody = {
              pincode: Number(this.trackingForm.addressDetail.pincode),
              lati: this.BuyerLats,
              longi: this.BuyerLons
            }

            if (pinBody.pincode > 99) {
              this.spinneraddpin = false;
              this.PaymentGatewayService.GetCityState(pinBody).subscribe((response: any) => {
                
                this.Pincodew = response.data
                this.spinneraddpin = true;
                if (this.Pincodew.city == null) {
                  this.trackingForm.addressDetail.city = ''
                } else {
                  this.trackingForm.addressDetail.city = this.Pincodew.city
                }
        
                if (this.Pincodew.state == null) {
                  this.trackingForm.addressDetail.state = ''
                } else {
                  this.trackingForm.addressDetail.state = this.Pincodew.state
                }
        
                if (this.Pincodew.state == null) {
                  this.trackingForm.addressDetail.country = ''
                } else {
                  this.trackingForm.addressDetail.country = this.Pincodew.country
                }
                
              })
            }

          }
        },
        (error: any) => {
          
          // Fetch coordinates if permission is denied
          const pinBody = {
            pincode: Number(this.trackingForm.addressDetail.pincode),
            lati: '',
            longi: ''
          }

          if (pinBody.pincode > 99) {
            this.spinneraddpin = false;
            this.PaymentGatewayService.GetCityState(pinBody).subscribe((response: any) => {
      
              this.Pincodew = response.data
              this.spinneraddpin = true;
              if (this.Pincodew.city == null) {
                this.trackingForm.addressDetail.city = ''
              } else {
                this.trackingForm.addressDetail.city = this.Pincodew.city
              }
      
              if (this.Pincodew.state == null) {
                this.trackingForm.addressDetail.state = ''
              } else {
                this.trackingForm.addressDetail.state = this.Pincodew.state
              }
      
              if (this.Pincodew.state == null) {
                this.trackingForm.addressDetail.country = ''
              } else {
                this.trackingForm.addressDetail.country = this.Pincodew.country
              }
            })
          }
        }

        
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  countryfetch(val1: any, val2: any) {
    return (this.toSmallCase(val1) == this.toSmallCase(val2))
  }

  toSmallCase(val: any) {
    return val.toLowerCase();
  }

  warehouseDetailData: any
  warehouseDetail() {
    this.ProductpageService.warehouseDetail().subscribe((res: any) => {
      if (res.status === true) {
        this.warehouseDetailData = res.data
        
      }
    })
  }

  toPaymentPage() {
    if (this.formDataService.getFormData() != null) {
      if (this.trackingForm.trackingFormMode === 'DDP') {
        this.formsubmitDDP()
      } else {
        
        const formBody = {
          product_id: this.sizeId,
          quantity: this.count,
          order_type: this.trackingForm.trackingFormMode,
          transport_mode: this.trackingForm.selectRoute,
          delivery_address: this.trackingForm.addressDetail.FullAddress,
          country: this.trackingForm.addressDetail.country,
          state: this.trackingForm.addressDetail.state,
          city: this.trackingForm.addressDetail.city,
          pincode: this.trackingForm.addressDetail.pincode,
        }
  
        const formBody1 = {
          product_id: this.sizeId,
          quantity: this.count,
          order_type: this.trackingForm.trackingFormMode,
          transport_mode: this.trackingForm.selectRoute,
          delivery_address: this.trackingForm.addressDetail.FullAddress,
          country: this.trackingForm.addressDetail.country,
          state: this.trackingForm.addressDetail.state,
          city: this.trackingForm.addressDetail.city,
          pincode: this.trackingForm.addressDetail.pincode,
        }
  
        this.formDataService.setFormData(formBody1)
        this.spinnerBuyNow = false;
  
        
        this.PaymentGatewayService.SendOrderDetail(formBody).subscribe((response: any) => {
          this.instance_id = response.data.instance_id
          if (response.status != 'Error') {
            
            this.router.navigate(['../payment-details'], {
              relativeTo: this.route,
              queryParams: {
                instcid: this.instance_id, shpMde: this.shippingMode,
                pdctId: this.productId, cnts: this.count, szid: this.sizeId,
                wtg: this.ProductWeight
              }
            });
            
            
          } else {
            this.spinnerBuyNow = true;
            
          }
        })
        
      }
    } else {

    }
  }

  selectBigImage: boolean = false
  selectedImge: any
  selectBigImageFun(image: any) {
    this.selectBigImage = true
    this.selectedImge = image
  }

  unselectBigImageFun() {
    this.selectBigImage = false

  }




}
