import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from './service/chatbot/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom') private scrollBottom!: ElementRef;
  d: any;

  primarytags: any[] = [];
  selectedTags: any[] = [];
  selectedTagsID: any;
  SubTags: any[] = [];
  SubTagsApiRes: any = {};
  spinnerBuyNow: boolean = true;

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit() { }

  chatBotPrimaryTags() {
    this.spinnerBuyNow = false;
    this.chatbotService.chatBotPrimaryTags().subscribe((res: any) => {
      this.spinnerBuyNow = true;
      this.primarytags = res; 
    });
  }

  no_keyword: boolean = true
  contact_message_chat: any
  forSubCat(tagID: any) {
    this.spinnerBuyNow = false;


    this.selectedTagsID = tagID;
    this.updatePrimaryTagsSelection();

    if (this.selectedTagsID === tagID) {
      const chatBody = {
        id: this.selectedTagsID
      };

      this.chatbotService.chatBotSeconadryTags(chatBody).subscribe((res: any) => {
        this.spinnerBuyNow = true;
        this.SubTags = res.data;
        this.contact_message_chat = res;
        if (this.SubTags.length === 0) {
          this.no_keyword = false
        }
        this.SubTagsApiRes = res || {};

        if (!this.SubTagsApiRes?.marking) {

        } else {

        }
        this.updatePrimaryTagsWithSubTags();

      });
    }
  }

  private updatePrimaryTagsSelection() {
    const isSelectedPrimaryTag = this.primarytags.some((tag: any) => tag.id === this.selectedTagsID);

    this.primarytags.forEach((tag: any) => {
      if (tag.id === this.selectedTagsID) {
        tag.isSelected = true;
      } else if (!isSelectedPrimaryTag) {
        // Only deselect if it's not the primary tag
        tag.isSelected = false;
      }
    });

  }

  private updatePrimaryTagsWithSubTags() {
    this.selectedTags = this.primarytags.filter((tag: any) => tag.isSelected);

    this.selectedTags.push(...this.SubTags);
    this.primarytags = this.selectedTags;
    // this.updatePrimaryTagsSelection();

  }


  unselectTag(tagID: any) {
    this.contact_message_chat = ''
    this.no_keyword = true
    // Remove the selected tag from primarytags
    this.primarytags = this.primarytags.filter((tag: any) => tag.id !== tagID);

    // Remove the selected tag from selectedTags
    this.selectedTags = this.selectedTags.filter((tag: any) => tag.id !== tagID);

    // Reset selectedTagsID to null or another default value
    this.selectedTagsID = null;

    //dasdasd
    this.SubTagsApiRes = {}
    // Check if all tags are deselected
    const allTagsDeselected = this.primarytags.every((tag: any) => !tag.isSelected);

    // If all tags are deselected, fetch primary tags again
    if (allTagsDeselected) {
      this.chatBotPrimaryTags();
    }


  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) { }
  }

  messages: { text: string; fromUser: boolean }[] = [];
  userInput: string = '';
  userInputValue: boolean = false;
  reply: string = 'The Chat assistant is temporarily under maintenance for improvements. We appreciate your patience and apologize for any inconvenience.'

  displaysendIcon: string = 'none';
  cfdfdf() {
    // You can add logic here if needed when the input changes
    this.updateSendButtonVisibility();
  }

  private updateSendButtonVisibility() {
    this.displaysendIcon = this.userInput.trim() !== '' ? 'flex' : 'none';
  }

  sendMessage() {
    if (this.userInput.length) {

      this.userInputValue = false
      this.messages.push({ text: this.userInput, fromUser: true });
      // Simulate bot response (you would replace this with actual API call)
      this.messages.push({ text: this.reply, fromUser: false });
      this.userInput = '';
    } else {
      this.userInputValue = true
    }
  }

  display = "none";
  chat_main_spinner: boolean = true;
  openModal() {
    this.chat_main_spinner = false; // Start the spinner immediately
    this.chatbotService.chatBotPrimaryTags().subscribe((res: any) => {
      this.primarytags = res;
      this.chat_main_spinner = true; // Stop the spinner after 1.5 seconds
      this.display = "flex"; // Display the modal
    });
  }

  onCloseHandled() {
    this.display = "none";
    this.chat_main_spinner = true;
  }

  attachments: { fileName: string, url: string }[] = [];
  fileName: string = "";
  // handleFileInput(event: any) {
  //   const fileList: FileList | null = event.target.files;

  //   if (fileList && fileList.length > 0) {
  //     const selectedFile: File = fileList[0];


  //     const attachment: { fileName: string, url: string } = {
  //       fileName: selectedFile.name,
  //       url: URL.createObjectURL(selectedFile),
  //     };

  //     this.attachments.push(attachment);
  //   }
  // }

  handleFileInput(event: any) {
    const fileList: FileList | null = event.target.files;

    if (fileList && fileList.length > 0) {
      const selectedFile: File = fileList[0];

      const attachment: { fileName: string, url: string } = {
        fileName: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
      };

      // Print the name of the selected file

      this.fileName = attachment.fileName
      this.attachments.push(attachment);
    }
  }

}
