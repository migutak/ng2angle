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
export class ExcelService {

  constructor(private datePipe: DatePipe, private http: HttpClient) {

  }

  async generateExcel(cust) {
    // Excel Title, Header, Data
    const title = 'Notes Report';
    const header = ['id', 'accnumber', 'custnumber', 'notemade', 'owner', 'noteimp', 'notesrc', 'notedate'];


    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Notes Data');

    

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

    worksheet.addImage(logo, 'G1:H3');
    worksheet.mergeCells('A1:F2');


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    // worksheet.addRows(data);

    this.http.get<any>(URL + '/api/notehis?filter[where][custnumber]=' + cust).subscribe(resp => {
      // Add Data and Conditional Formatting
      let data = [];
      let datax = [];
      for (let x=0; x < resp.length; x++) {
        data.push(resp[x].id, resp[x].accnumber,resp[x].custnumber, resp[x].notemade,resp[x].owner,resp[x].noteimp,resp[x].notesrc,resp[x].notedate)
        datax.push(data)
        data = [];
      }
      
      datax.forEach(d => {
        worksheet.addRow(d);
        
      });

      worksheet.getColumn(4).width = 100;
      worksheet.addRow([]);


      // Footer Row
      const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      // Merge Cells
      worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

      // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, cust + 'Notes.xlsx');
      });
    }, error => {
      //
    })

  }
}
