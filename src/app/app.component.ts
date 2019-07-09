import { Component, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';
import * as _moment from 'moment';
const moment = _moment;
import * as _ from 'lodash';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepickerInputEvent } from '@angular/material';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
//import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
//import * as _ from 'lodash';

//import * as _moment from 'moment';

import "moment-timezone";
//let jsPDF = require('jspdf');
//import * as jsPDF  from 'jspdf'
import * as JSPdf from 'jspdf'; 
import * as html2canvas from 'html2canvas';
import { element } from 'protractor';
//import { clearLine } from 'readline';
import { PieChartComponent } from './pie-chart/pie-chart.component';
export const CUSTOM_FORMATS = {

  parse: {

    dateInput: 'DD-MMM-YYYY HH:mm:ss',

  },

  display: {

    dateInput: 'DD-MMM-YYYY HH:mm:ss',

    monthYearLabel: 'MMM YYYY',

    dateA11yLabel: 'DD-MMM-YYYY HH:mm:ss',

    monthYearA11yLabel: 'MMMM YYYY',

  },

};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //encapsulation: ViewEncapsulation.None,

  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS },

  ]
})
export class AppComponent {
 
  chart = [];
  xaxisdata = [];
  temphourxaxisdata = [];
  tempdatexaxisdata = [];
  diffbwDates : any;
  tempErrorArray = [];
  tempSuccessArray = [];
  tempWarningArray = [];
  timeSeriesDataArray: any[];
  toDateCtrl = new FormControl(moment());
  fromDateCtrl = new FormControl(moment());
  minFromDate: Date;

  maxFromDate: Date;

  minToDate: Date;

  maxToDate: Date;

  maxFromDateString: string;

  maxToDateString: string;

  selectedToDate: string;

  formattedToDate: string;
  formattedFromDate: string;
  unixformattedToDate: number;
  unixformattedFromDate: number;
  toDate: string;
  labelString : string;

  unixnowDate: string;
  currentDate = moment().date();

  currentMonth = moment().month();

  currentYear = moment().year();

  endDate = moment().endOf("month").format("DD");

  currentday = moment().format("DD");
  
  canvasId: string;
  
  totalErrorCounts : any[];
  totalSuccessCounts: any[];
  totalWarningCounts: any[];
  totalTransactions : any[] = [];

  isDivVisible = false;

  


items : number[ ] = [ ];
  @ViewChild(PieChartComponent) PieChartComponent : PieChartComponent;
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    this.dateSettingsFormat();

  }

  catchChild(canvasID){
this.canvasId = canvasID
console.log(this.canvasId);
  }

  dateSettingsFormat() {
     this.formattedFromDate = moment(this.formattedFromDate).format();
     this.unixformattedFromDate = moment(this.formattedFromDate).valueOf();
     this.selectedToDate = moment(this.formattedToDate).endOf('day').format();
     this.formattedToDate = this.selectedToDate;
     this.unixformattedToDate = moment(this.formattedToDate).valueOf();
  }

  dateSettings() {

    this.formattedFromDate = moment().startOf('day').subtract(1, 'day').format();
    this.unixformattedFromDate = moment(this.formattedFromDate).valueOf();
    this.formattedToDate = moment().endOf('day').format();

    this.unixformattedToDate = moment(this.formattedToDate).valueOf();

    this.minFromDate = moment().subtract(30, 'days').startOf('day').toDate();

    this.maxFromDate = new Date(this.currentYear, this.currentMonth, parseInt(this.endDate) - (parseInt(this.endDate) - this.currentDate));

    this.minToDate = moment().subtract(30, 'days').endOf('day').toDate();

    this.maxToDate = new Date(this.currentYear, this.currentMonth, parseInt(this.endDate) - (parseInt(this.endDate) - this.currentDate));

  }

  constructor(private _weather: WeatherService, private element: ElementRef) { }

  generateReports(){

    let diffFromDate = moment(this.formattedFromDate);
    let diffToDate = moment(this.formattedToDate);
    this.diffbwDates = diffToDate.diff(diffFromDate,'days');

if(this.diffbwDates >= 0){



  this._weather.dailyForecast()   // service call
      .subscribe(data => {
       this.timeSeriesDataArray = data["aggregations"]["TRANSACTION_STATUS"]["buckets"];

       if(this.timeSeriesDataArray.length > 0){
         // filter logic
         let startDate = this.unixformattedFromDate;
         let endDate = this.unixformattedToDate;
         this.timeSeriesDataArray = this.timeSeriesDataArray.filter(function (element) {
          let date = element.key.DATE;
          return (date >= startDate && date <= endDate);
          })
          console.log(this.timeSeriesDataArray); // return all data between selected date range(same date OR multiple dates)
       
          this.timeSeriesDataArray.forEach(element => {
            if (_.includes(element.key.TRANSACTION_STATUS, 'ERROR')) {
              this.tempErrorArray.push(element.doc_count);  // total error counts for selected date range
               
            }
          })
          this.timeSeriesDataArray.forEach(element => {
            if (_.includes(element.key.TRANSACTION_STATUS, 'SUCCESS')) {
              this.tempSuccessArray.push(element.doc_count);  // total success counts for selected date range
             
            }
          })
          this.timeSeriesDataArray.forEach(element => {
            if (_.includes(element.key.TRANSACTION_STATUS, 'WARNING')) {
              this.tempWarningArray.push(element.doc_count);   // total warning counts for selected date range
           
            }
          })


          
         this.tempdatexaxisdata.length = 0;

          if(this.diffbwDates == 0){
            this.timeSeriesDataArray.forEach(element => {
             this.temphourxaxisdata.push(moment(element.key.DATE).format("HH:mm:ss")); // hours
             } )
            
            this.temphourxaxisdata = _.uniq(this.temphourxaxisdata);// unique all hours
            this.xaxisdata = this.temphourxaxisdata; 
            this.labelString = "Hours";
            console.log("uniqq"+this.xaxisdata);    
          } else if(this.diffbwDates > 0){
            this.timeSeriesDataArray.forEach(element => {
            this.tempdatexaxisdata.push(moment(element.key.DATE).format("DD-MM-YYYY")); // dates
              
            } )
            
            this.tempdatexaxisdata = _.uniq(this.tempdatexaxisdata);
            console.log("##"+this.tempdatexaxisdata); 
            this.xaxisdata = this.tempdatexaxisdata; 
            
            console.log("x-axis data"+this.xaxisdata);
            this.labelString = "Dates";   // unique all dates
          }

       } // if end
       else {
         console.log("No Data Available");
       }

     this.generateCharts()   // funxtion to generate charts
    }) // service end

    }
else{
  console.log("from date should be less than or = to to date");
}
} 


generateCharts(){

  //var progress = document.getElementById('animationProgress');
  var progress = <HTMLProgressElement>document.getElementById("animationProgress");
  //var v = progress.value;
  var chartId = <HTMLCanvasElement>document.getElementById("canvas");
  var ctx1= chartId.getContext("2d");

  var gradientError = ctx1.createLinearGradient(0, 0, 0, 450);
  var gradientSuccess = ctx1.createLinearGradient(0, 0, 0, 450);
  var gradientWarning = ctx1.createLinearGradient(0, 0, 0, 450);

// gradientError.addColorStop(0, 'rgba(255, 0, 0, 0.9)') // show this color at 0%;
// gradientError.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)'); // show this color at 50%
// gradientError.addColorStop(1, 'rgba(255, 0, 0, 0)'); 


// show this color at 100%
// gradientSuccess.addColorStop(0, 'rgba(0,128,0,0.9)')
// gradientSuccess.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
// gradientSuccess.addColorStop(1, 'rgba(0, 231, 255, 0)');

gradientSuccess.addColorStop(0, '#0b8313');
gradientSuccess.addColorStop(0.8, '#ffff4d');

gradientWarning.addColorStop(0, '#ff6600');
gradientWarning.addColorStop(0.4, '#ffff4d');

gradientError.addColorStop(0, '#ff0000');
gradientError.addColorStop(0.8, '#ffff4d');


// gradientWarning.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
// gradientWarning.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
// gradientWarning.addColorStop(1, 'rgba(0, 231, 255, 0)');

// gradientError.addColorStop(1, 'rgb(255, 0, 0)');
// gradientSuccess.addColorStop(1, 'rgb(0, 255, 0)');
// gradientWarning.addColorStop(1, 'rgb(255, 255, 0)');

this.chart = new Chart('canvas', {
  type: 'line',
  data: {
    labels: this.xaxisdata,
    datasets: [
      {
        label: 'Errors',
        data: this.tempErrorArray,
        backgroundColor: '#e60000',
        pointBackgroundColor: 'white',
        borderWidth: 3,
        //borderColor: '#911215',
        borderColor: '#e60000',
        fill : false
      },
      {
        label: 'Warnings',
        data: this.tempWarningArray,
        backgroundColor : '#ffff00',
        pointBackgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#ffff00',
        fill: false
      },
      {
        label: 'Success',
        data: this.tempSuccessArray,
        backgroundColor: ' #009900',
        pointBackgroundColor: 'white',
        borderWidth: 3,
       // borderColor: '#911215',
       borderColor : ' #009900',
        fill: false
      }

    ]
  },
  options: {
    backgroundColor: "#ffffff",
    responsive: true,
   
    stacked:false,
    title: {
      display: true,
      text: 'TimeSeries Chart',
      fontFamily: 'Helvetica',
      fontSize: 15,
      position: top,
      padding: 15,
      fontColor: 'white'
    },
    legend: {
      display: true,
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'white'
    }
    },
    animation: {
      duration: 3000,
      
      onProgress: function(animation) {
       
        progress.value = animation.currentStep / animation.numSteps;
      },
      onComplete: function() {
        window.setTimeout(function() {
          progress.value = 0;
        }, 3000);
      }
    },
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'white'
      },
        stacked: false,
       // fontColor: "white",
        scaleLabel: {
          display: true,
          labelString: this.labelString,
          labels: {
            show: true
          },
          fontColor: "white"
          
        },
        
      labelFontColor: "white"
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: 'white'
      },
        stacked: false,
        fontColor: "white",
        scaleLabel: {
          display: true,
          labelString: 'Counts',
          labels: {
            show: true
          }
          //fontColor: "white"
        },
        labelFontColor: "white"
      }]
    }
  }

  
})
//Chart.defaults.global.defaultFontColor = "#fff"; 
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.animation.color = "#ff3399";
} // chart function ends

// downloadPdf(){
  
//   var canvas = document.getElementById('container') as HTMLCanvasElement;
// 	var canvasImg = canvas.toDataURL("image/jpeg", 1.0);
// 	var doc = new JSPdf('landscape');
// 	doc.setFontSize(20);
// 	doc.text(10, 30, 'TimeLine Series Chart');
// 	doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 100 );
//   doc.save('canvas.pdf');

// }




// downloadPdf() {
//   var canvas = document.getElementById('container');
//      let pdf = new JSPdf('p', 'pt', 'a3');
//   //let pdf = new JSPdf('l', 'mm', [297, 210]);
//      let options = {
//         pagesplit: true
//      };
//      pdf.addHTML(canvas, 0, 0, options, () => {
//         pdf.save("test.pdf");
//      });

//   //   var canvas = document.getElementById('container') as HTMLCanvasElement;
// // 	var canvasImg = canvas.toDataURL("image/jpeg", 1.0);
// // 	var doc = new JSPdf('landscape');
// // 	doc.setFontSize(20);
// // 	doc.text(10, 30, 'TimeLine Series Chart');
// // 	doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 100 );
// //   doc.save('canvas.pdf');
//   } 


updateUIandDownload(){
  this.isDivVisible = true;
  window.setTimeout(this.downloadPdf.bind(this), 0.5);
}

downloadPdf(){
  var data = document.getElementById('container'); 
  var HTML_Width = document.getElementById('container').offsetWidth;
  console.log('div width',HTML_Width);
    var HTML_Height = document.getElementById('container').offsetHeight;
  console.log('div height',HTML_Height);
  // var HTML_Width = $(".canvas_div_pdf").width();
  // var HTML_Height = $(".canvas_div_pdf").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width+(top_left_margin*2);
  var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;
  
  var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
  
  html2canvas(data).then(canvas => { 
  // html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
  canvas.getContext('2d');
  
  console.log(canvas.height+"  "+canvas.width);
  
  
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new JSPdf('p', 'pt',  [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
  
  
  for (var i = 1; i <= totalPDFPages; i++) { 
  pdf.addPage(PDF_Width, PDF_Height);
  pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
  }
  
      pdf.save("HTML-Document.pdf");
         });
  };
// downloadPdf(){
  
//   console.log("440"+this.isDivVisible); 
//     var data = document.getElementById('container'); 
//   //  var data1 = document.getElementById('container').offsetWidth;
//   // console.log('div width',data1);
//     //this.isDivVisible = true;
   
//       html2canvas(data).then(canvas => { 
//         console.log("444"+this.isDivVisible); 
//         // Few necessary setting options  
//         var imgWidth = 308;   
//         var pageHeight = 395;    
//         var imgHeight = canvas.height * imgWidth / canvas.width;  
//         var heightLeft = imgHeight;  
//         //this.isDivVisible = true;
       
//         const contentDataURL = canvas.toDataURL('image/png')  
//         let pdf = new JSPdf('p', 'mm', 'a2'); // A4 size page of PDF  
//         var position = 0;  
//        // pdf.setFont("arial", "bold");
//        pdf.setProperties({
//         title: 'Title',
//         subject: 'This is the subject',
//         author: 'Author Name',
//         keywords: 'generated, javascript, web 2.0, ajax',
//         creator: 'Creator Name'
//        });
//        pdf.text(0, 30, 'TimeLine Series Chart');

//        let margins = {
//         top: 180,
//         bottom: 860,
//         left: 540,
//         width: 822
//     };
//     // all coords and widths are in jsPDF instance's declared units
//     // 'inches' in this case
//     pdf.fromHTML(
//        data = document.getElementById('container') , // HTML string or DOM elem ref.
//     margins.left, // x coord
//     margins.top, { // y coord
//         'width': margins.width // max width of content on PDF
//         //'elementHandlers': specialElementHandlers
//     })



//         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
//         pdf.save('MYPdf.pdf'); // Generated PDF 
//         //this.isDivVisible = false; 
//      //   console.log("457"+this.isDivVisible); 
//       })
        
     
//       this.isDivVisible = false;
//   }

// downloadPdf(){

//   html2canvas
// }


// downloadPdf(){
//   var data = document.getElementById('canvas');  
//     html2canvas(data).then(canvas => {  
//       // Few necessary setting options  
//       var imgWidth = 208;   
//       var pageHeight = 295;    
//       var imgHeight = canvas.height * imgWidth / canvas.width;  
//       var heightLeft = imgHeight;  
  
//       const contentDataURL = canvas.toDataURL('image/png')  
//       let pdf = new JSPdf('p', 'mm', 'a4'); // A4 size page of PDF  
//       var position = 0;  
//       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
//       pdf.save('MYPdf.pdf'); // Generated PDF   
//     });  
// }

// downloadPdf(){
//   this.PieChartComponent.pdf();
// }


  ngOnInit() {
    this.isDivVisible = false;
    this.dateSettings();
    this.generateReports();
// var result;
//     var users = [
//       { age: 36},
//       { age: 40},
//       { age: 37}
//     ];
    
//     result = _.sumBy(users, function(o) { return o.age; }); 
//     console.log(result);  

//var abc = [];
// this.totalErrorCounts = [1];
// this.totalSuccessCounts = [2];
// this.totalWarningCounts = [3];
// console.log(this.totalTransactions);
// this.totalTransactions.push(this.totalErrorCounts[0]);
// this.totalTransactions.push(this.totalSuccessCounts[0]);
// this.totalTransactions.push(this.totalWarningCounts[0]);
// console.log(this.totalTransactions);


// this.totalTransactions = this.totalTransactions.reduce((a, b) => a + b, 0)
// console.log(this.totalTransactions);

  }
}


