import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from '../../assets/img/cooplogo.js';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ExportInvoiceService {

  constructor(private datePipe: DatePipe, private http: HttpClient) {

  }

  async generateinvoice() {
    // Excel Title, Header, Data
    const title = 'Invoices Report';
    const header = ['accnumber', 'custnumber', 'sptitle', 'custname', 'spaccount', 'feenotedate', 'feenoteamnt', 'approvedamnt', 'dateinput', 'status'];


    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Invoices Report');

    

    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);


    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });

    worksheet.addImage(logo, 'H1:I3');
    worksheet.mergeCells('A1:G2');


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'AED6F1' }, // FFFFFF00 00543D
        bgColor: { argb: 'AED6F1' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    // worksheet.addRows(data);

    this.http.get<any>(URL + '/api/tblinvoices?filter[where][status]=Print to Finance').subscribe(resp => {
      // Add Data and Conditional Formatting
      let data = [];
      let datax = [];
      for (let x=0; x < resp.length; x++) {
        data.push(resp[x].accnumber,resp[x].custnumber, resp[x].sptitle,resp[x].custname,resp[x].spaccount,resp[x].feenotedate,resp[x].feenoteamnt,resp[x].approvedamnt,resp[x].dateinput,resp[x].status)
        datax.push(data)
        data = [];
      }
      
      datax.forEach(d => {
        worksheet.addRow(d);
        
      });

      worksheet.getColumn(4).width = 100;
      worksheet.addRow([]);


      // Footer Row
      const footerRow = worksheet.addRow(['This report is system generated.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'AED6F1' } //FFCCFFE5
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      // Merge Cells
      worksheet.mergeCells(`A${footerRow.number}:I${footerRow.number}`);

      // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Invoices Report.xlsx');
      });
    }, error => {
      //
    })

  }
}
