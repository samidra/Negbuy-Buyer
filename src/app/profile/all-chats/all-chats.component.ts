import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { FormDataService } from 'src/app/service/TrackerPageFormData/form-data.service';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent {

  uid: string | null = null;
  mainLoader: boolean = true;
  constructor(
    private imageCompress: NgxImageCompressService,
    private formDataService: FormDataService,
    private auth: AuthService,
    private titleService: Title,
    private WishlistService: WishlistService,) { }


  ngOnInit() {
    window.scrollTo(0, 0)
    this.findUserLogin()
    const title = "Chat Box | Negbuy.com";
    this.titleService.setTitle(title);
  }

  findUserLogin() {
    if (this.formDataService.getLogInResponse() != null) {
      const data = this.formDataService.getLogInResponse()
      this.uid = data.user_id;
      if (this.uid != null) {
        this.auth.user_id = this.uid
        this.WishlistService.user_id = this.uid
      }
    }
    this.getAllChats()
  }

  getAllChatsResponse: any
  getAllChatsResponse1: any
  unreadChats: any
  allChats: any
  readChats: any
  chat_id: any
  sectionLoaded: any;

  getAllChats() {
    this.WishlistService.getAllChats().subscribe((res: any) => {
      this.getAllChatsResponse = res.data;
      this.getAllChatsResponse1 = res.data;
      this.unreadChats = this.getAllChatsResponse.filter((item: { chat_opened: boolean; }) => item.chat_opened === false);
      this.readChats = this.getAllChatsResponse.filter((item: { chat_opened: boolean; }) => item.chat_opened === true);
      this.allChats = this.getAllChatsResponse
      this.mainLoader = false;
      this.sectionLoaded = this.getAllChatsResponse[0].chat_id
      this.chat_id = this.getAllChatsResponse[0].chat_id
      this.productChatNow()

    })
  }

  chatHistoryData: any;
  loadingHoleScreen: boolean = false
  productChatNow() {

    this.loadingHoleScreen = true
    const chat_history_body = {
      chat_id: this.chat_id,
      chat_person: 'Buyer'
    }
    this.WishlistService.chat_history(chat_history_body).subscribe((response1: any) => {
      this.getAllChats1()
      this.loadingHoleScreen = false;
      this.chatHistoryData = response1
    })
  }

  getAllChats1() {
    this.WishlistService.getAllChats().subscribe((res: any) => {
      this.getAllChatsResponse = res.data
      this.getAllChatsResponse1 = res.data;
      this.unreadChats = this.getAllChatsResponse.filter((item: { chat_opened: boolean; }) => item.chat_opened === false);
      this.readChats = this.getAllChatsResponse.filter((item: { chat_opened: boolean; }) => item.chat_opened === true);
      this.allChats = this.getAllChatsResponse
    })
  }

  status_filter: any = 'all';
  chatstatus_filter(value: any) {
    this.status_filter = value
    if (this.status_filter === 'unread') {
      this.getAllChatsResponse = this.unreadChats
    } else if (this.status_filter === 'read') {
      this.getAllChatsResponse = this.readChats
    } else {
      this.getAllChatsResponse = this.allChats
    }
  }

  showcontent(value: number) {
    // if (this.mySidenav.style.width = "350px") {
    //   this.mySidenav.style.width = "0"
    // }

    this.sectionLoaded = value;
    this.chat_id = value;
    this.productChatNow();

    if (this.mySidenav && (this.mySidenav.style.width = "350px")) {
      this.mySidenav.style.width = "0"
    }

  }

  userInput: string = '';
  userInputValue: boolean = false;
  reply: string = 'The Chat assistant is temporarily under maintenance for improvements. We appreciate your patience and apologize for any inconvenience.'
  messages: { text: string; fromUser: boolean; imageUrl?: string; }[] = [];
  messagesChat: { msg_text: string; msg_sender: string; imageUrl?: string; }[] = [];
  displaysendIcon: string = 'none';
  cfdfdf() {
    // You can add logic here if needed when the input changes
    this.updateSendButtonVisibility();
  }

  private updateSendButtonVisibility() {
    this.displaysendIcon = this.userInput.trim() !== '' ? 'flex' : 'none';
  }

  sendMsgBtn: boolean = true
  sendMessage() {
    if (this.userInput.length) {
      this.sendMsgBtn = false
      this.userInputValue = false
      this.messagesChat.push({ msg_text: this.userInput, msg_sender: "Buyer", imageUrl: this.showImage });
      const send_messageBody = new FormData();
      send_messageBody.append('chat_id', this.chat_id);
      send_messageBody.append('text_msg', this.userInput);
      send_messageBody.append('photo_msg', this.chat_imagesfile);


      this.WishlistService.sendMessage(send_messageBody).subscribe((response: any) => {

        this.userInput = '';
        this.showImage = '';
        this.chat_images = [];
        // this.chat_imagesfile = new File([], "empty");
        this.sendMsgBtn = true
        if (response.status == true) {
          this.messagesChat.push({ msg_text: this.reply, msg_sender: "Seller", imageUrl: '' });
          this.messages.push({ text: this.reply, fromUser: false, imageUrl: '' });
        }
      })
    } else {
      this.userInputValue = true
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  scrollToBottom(): void {
    if (this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Scroll to bottom error:', err);
      }
    }
  }


  chat_imagesfile!: File;
  chat_images: Array<{ show: string, upload: File }> = [

  ]
  showImage: any
  handleFileInput(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const imgSize = file.size;
      const minimumImgSize = 2097152; // 2MB in bytes
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        this.showImage = e.target.result;
        this.chat_imagesfile = file;

        if (imgSize > minimumImgSize) {
          const compressedImageBlob: Blob = await this.compressImageToBlob(this.showImage);
          this.chat_imagesfile = new File([compressedImageBlob], file.name);
        } else {
          this.showImage = e.target.result;
          this.chat_imagesfile = file;
        }

        // Add new object to chat_images array
        this.chat_images.push({
          show: this.showImage,
          upload: this.chat_imagesfile
        });

      };

      reader.readAsDataURL(file);
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

  removeAttachedImages() {
    this.chat_images = [];
  }

  mySidenav: any
  openNav() {
    this.mySidenav = document.getElementById("mySidenav") as HTMLElement;
    if (this.mySidenav) {
      this.mySidenav.style.width = "350px";
    }
  }

  closeNav() {
    this.mySidenav = document.getElementById("mySidenav") as HTMLElement;
    if (this.mySidenav) {
      this.mySidenav.style.width = "0";
    }
  }

}
