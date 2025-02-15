import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import { CommonService } from '../service/common/common.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice-order',
  templateUrl: './invoice-order.component.html',
  styleUrls: ['./invoice-order.component.scss']
})
export class InvoiceOrderComponent implements OnInit{



  constructor(private commonservice: CommonService) {}
 callFunction:boolean = false
  ngOnInit() {
    
   
    this.callFunction = this.commonservice.callFunction 
    if(this.callFunction === true){
      
      this.downloadPDF2()
    }
  }
  
  downloadPDF2() {
    
    const content = document.getElementById('content');
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const docDefinition = {
          content: [{
            image: imgData,
            width: 510,
            height: 650
          }]
        };
        pdfMake.createPdf(docDefinition).download('sample.pdf');
      });
    }

  }


}
