import { Component, Inject } from '@angular/core';
import { ProfileServiceService } from 'src/app/service/profile/profile-service.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { PaymentGatewayService } from 'src/app/service/payment/payment-gateway.service';
import { CommonService } from 'src/app/service/common/common.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Title } from '@angular/platform-browser';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,

} from "@angular/material/dialog";
@Component({
  selector: 'app-return-center',
  templateUrl: './return-center.component.html',
  styleUrls: ['./return-center.component.scss']
})
export class ReturnCenterComponent {
  sectionLoaded = 0;
  loaderS: boolean = false;
  uid: string | null = null;
  searchItem: any
  p: string | number | undefined;

  constructor(private auth: AuthService,
    public dialog: MatDialog,
    private PaymentGatewayService: PaymentGatewayService,
    private formDataService: FormDataService,
    private ProfileServiceService: ProfileServiceService,
    private titleService: Title) { }

  ngOnInit() {
    const title = "Return Center | Negbuy.com";
    this.titleService.setTitle(title);
    window.scrollTo(0, 0)

    this.findUserLogin()
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.ProfileServiceService.user_id = this.uid
        this.PaymentGatewayService.user_id = this.uid
      }
    }
    this.BuyerAddress()
    this.MyOrder()
    this.ReturnProduct()
  }

  BuyerAddressDelivery: any;
  profile_pic: any;

  BuyerAddress() {

    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.BuyerAddressDelivery = this.formDataService.getLogInResponse()
      let url = "https://negbuy.com:8080"
      this.profile_pic = url + this.BuyerAddressDelivery.imageUrl
    }
  }

  myOrderRes: any
  MyOrder() {
    this.loaderS = true;
    this.ProfileServiceService.MyOrder().subscribe((response: any) => {
      this.myOrderRes = response.data;
      this.myOrderRes = this.myOrderRes.filter((item: { return_applied: boolean; }) => item.return_applied === false);;
      this.loaderS = false;

    })
  }

  ReturnProductRes: any
  ReturnProduct() {
    this.loaderS = true;
    this.ProfileServiceService.ReturnProduct().subscribe((response: any) => {
      this.ReturnProductRes = response.data;

      this.loaderS = false;

    })
  }

  showcontent(value: number) {
    this.sectionLoaded = value;
    window.scrollTo(0, 0)
  }

  selectedFaq = 15;
  toggleTextClass(value: any) {
    this.selectedFaq = value
  }

  radioValueInit() {
    this.RadioValue = [];
    for (let i = 0; i < this.myOrderRes.length; i++) {
      this.RadioValue.push(false)
    }
  }

  newRequest = 'newRequest';
  newRequestForm = 'ToHide';
  Radio = 'radioHide';
  RadioValue: Array<boolean> = []
  NewRequest() {
    this.newRequest = 'ToHide'
    this.newRequestForm = 'newRequestForm'
    this.Radio = 'radioShow'
  }

  CancelRequest() {
    this.newRequestForm = 'ToHide'
    this.newRequest = 'newRequest'
    this.Radio = 'radioHide'
    this.radioValueInit()

  }

  new_return_request(i: any) {


    const dialogRef = this.dialog.open(return_request, {
      height: '99%',
      width: '100%',
      data: {
        detail_of_selected_return_order: this.myOrderRes[i],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.MyOrder()
      this.ReturnProduct()
    });
  }

}

@Component({
  selector: 'return_request',
  templateUrl: './return_request.html',
  styleUrls: ['./return-center.component.scss']
})
export class return_request {

  reason_for_return: any
  Isreason_for_return: boolean = false
  isReturnPolicyChecked: boolean = false
  Isreason_for_return_brief: boolean = false
  reason_for_return_brief: any
  selected_order_data: any
  constructor(
    public dialogRef: MatDialogRef<return_request>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ProfileServiceService: ProfileServiceService,
    private imageCompress: NgxImageCompressService,
    private commonService: CommonService,) {
  }


  ngOnInit() {
    this.selected_order_data = this.data.detail_of_selected_return_order
  }

  reasons: string[] = [
    'Received wrong item',
    'Size/fit issue',
    'Changed mind',
    'Missing Parts',
    'Damaged or defective product',
    'Other'
  ];

  get_reason(value: any) {
    this.reason_for_return = this.reason_for_return === '' ? value : '';
    this.Isreason_for_return = this.reason_for_return === '' ? true : false;
  }

  spinnerBuyNow: boolean = true;
  submitReturnRequest(ngform: NgForm) {
    // Validation for reason and brief reason
    if (!this.reason_for_return) {
      this.Isreason_for_return = true;
      return;
    }

    if (!this.reason_for_return_brief) {
      this.Isreason_for_return_brief = true;
      return;
    }

    if (!this.isReturnPolicyChecked) {
      this.commonService.displayWarning('Please accept return policy.')
      return;
    }

    // Prepare form data
    const ReturnRequestBody: FormData = new FormData();
    ReturnRequestBody.append('shipment_type', this.selected_order_data.delivery_option);
    ReturnRequestBody.append('order_id', this.selected_order_data.order_id);
    ReturnRequestBody.append('reason', this.reason_for_return);
    ReturnRequestBody.append('brief_reason', this.reason_for_return_brief);

    // Append images (if any)
    this.proof_images.forEach((image, index) => {
      if (image?.upload) {
        ReturnRequestBody.append('images', image.upload);
      }
    });

    // Debugging form data (remove in production)
    ReturnRequestBody.forEach((value, key) => {
      console.log(key, value);
    });

    // Disable submit button (show spinner)
    this.spinnerBuyNow = false;

    // Submit request
    this.ProfileServiceService.submitReturnRequest(ReturnRequestBody).subscribe((response: any) => {
      if (response.status) {
        this.commonService.displaySuccess('Return request submitted successfully');
        this.dialogRef.close();
        this.spinnerBuyNow = true;
        ngform.resetForm();
        this.resetProofImages();
      } else {
        // Handle case where status is false
        this.commonService.displayWarning('Failed to submit return request.');
      }
    },
    );
  }

  // Helper function to reset proof images
  resetProofImages() {
    this.proof_images = this.proof_images.map(() => ({ show: '', upload: this.file }));
  }


  onCloseHandled() {
    this.dialogRef.close();
    this.reason_for_return = '';
    this.reason_for_return_brief = '';
    for (let i = 0; i <= 2; i++) {
      this.proof_images[i] =
      {
        show: '', upload: this.file,
      }
    }

  }

  async compressImageToBlob(dataUrl: string): Promise<Blob> {
    const compressedImage: string = await this.imageCompress.compressFile(
      dataUrl,
      1, // Compression quality (1 is the highest)
      60,
      60 // Maximum size in KB
    );

    return this.dataURItoBlob(compressedImage);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' }); // Adjust the MIME type accordingly
  }

  onSelectImage(event: any, index: any) { //this adds main image and additional main image
    const file: File = event.target.files[0];	//the index check is to add image description images

    if (file) {
      const imgSize = file.size;
      const minimumImgSize = 2097152;

      const reader = new FileReader();
      if (imgSize > minimumImgSize) {

        reader.onload = async (e: any) => {
          const compressedImageBlob: Blob = await this.compressImageToBlob(e.target.result);

          const compressedImageFile: File = new File([compressedImageBlob], file.name);

          this.proof_images[index].upload = compressedImageFile;
          this.proof_images[index].show = e.target.result;

        }
      } else {

        reader.onload = (e: any) => {
          this.proof_images[index].upload = file;
          this.proof_images[index].show = e.target.result;

        }

      }
      reader.readAsDataURL(file);
    }
  }

  file!: File;
  proof_images = [
    {
      show: '', upload: this.file,
    },
    {
      show: '', upload: this.file,
    },
    {
      show: '', upload: this.file,
    },
    {
      show: '', upload: this.file,
    },
    {
      show: '', upload: this.file,
    }
  ]

  RemoveImage(index: any) {
    this.proof_images[index] =
    {
      show: '', upload: this.file,
    }
  }

  private readonly apiurl = environment.apiurl2;
  imageSrc(value: any) {

    return this.apiurl + value
  }


}