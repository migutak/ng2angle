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
export class ExportProductsService {

  constructor(private datePipe: DatePipe, private http: HttpClient) {

  }

  async generateWoffstory() {
    // Excel Title, Header, Data
    const title = 'Remedial Products Offered Report';
    const header = ['Product name', 'Date of approval', 'RRO Code', 'Customer Number', 'Accounts Number', 'Account name', 'Account Balance', 'Settlement Value', 'Settlement Due Date', 'Settlement Date', 'Status', 'Remedial Partner/Collector', 'Remedial Unit'];


    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Products');

    

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

    worksheet.addImage(logo, 'L1:M3');
    worksheet.mergeCells('A1:M2');


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7ac142' }, // FFFFFF00 00543D
        bgColor: { argb: '7ac142' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    // worksheet.addRows(data);

    this.http.get<any>(URL + '/api/tbl_productofferings').subscribe(resp => {
      // Add Data and Conditional Formatting
      let data = [];
      let datax = [];
      for (let x=0; x < resp.length; x++) {
        data.push(resp[x].product,resp[x].dateofoffering, resp[x].rrocode,resp[x].custnumber,resp[x].accnumber,resp[x].custname,resp[x].oustbalance,resp[x].settlementamount,resp[x].expecteddate,resp[x].settlementdate,resp[x].productstatus,resp[x].collector,resp[x].remedialunit)
        datax.push(data)
        data = [];
      }
      
      datax.forEach(d => {
        worksheet.addRow(d);
        
      });

      worksheet.getColumn(6).width = 50;
      worksheet.addRow([]);


      // Footer Row
      const footerRow = worksheet.addRow(['This report is system generated.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7ac142' } //FFCCFFE5
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      // Merge Cells
      worksheet.mergeCells(`A${footerRow.number}:M${footerRow.number}`);

      // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Remedial_Products.xlsx');
      });
    }, error => {
      //
    })

  }
}
