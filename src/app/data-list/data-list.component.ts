import { Component, OnInit } from '@angular/core';

const ErrorDetails: any[] = [

  { errorMessage: 'technical error while loading property :File [/apps/tibprod/domains/TIBPROD_ITT/SIMSProperties/prjToSAPECC_BAPI_aa/001977/prjToSAPECC_BAPI_aa_Opportunities.properties] was not found', errorType: 'Technical', count: '138' },

  
  { errorMessage: 'Functional Error RD XREF ID 1-1DX0S20,table X_R_C4C_SAP_SEGMENTS SEGMENTRECORDID=1-1DX0S20 not found !!', errorType: 'Functional', count: '320' } ,
  { errorMessage: 'Functional Error RD XREF ID 1-1DX0S20,table X_R_C4C_SAP_SEGMENTS SEGMENTRECORDID=1-1DX0S20 not found !!', errorType: 'Functional', count: '320' } ,
  { errorMessage: 'Functional Error RD XREF ID 1-1DX0S20,table X_R_C4C_SAP_SEGMENTS SEGMENTRECORDID=1-1DX0S20 not found !!', errorType: 'Functional', count: '320' } ,
  
  
  
  
  
  
  
];

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  displayedColumns: string[] = ['errorMessage', 'errorType', 'count'];

  dataSource = ErrorDetails;
  // ErrorDetails: any [];
  // errorCounts : any [];
  // finalArray : any [];

  arr1 : any [];
  arr2: any[];
  arr3: any [];
  arr4 : any[];
  constructor() { }

  ngOnInit() {

    //  this.ErrorDetails = [
    //    { errorMessage: 'technical error while loading property :File [/apps/tibprod/domains/TIBPROD_ITT/SIMSProperties/prjToSAPECC_BAPI_aa/001977/prjToSAPECC_BAPI_aa_Opportunities.properties] was not found', errorType: 'Technical', count: '138' },

    //    { errorMessage: 'Functional Error RD XREF ID 1-1DX0S20,table X_R_C4C_SAP_SEGMENTS SEGMENTRECORDID=1-1DX0S20 not found !!', errorType: 'Functional', count: '320' } 
    //  ]

    //  console.log(this.ErrorDetails);

    //  this.errorCounts = [1,2];
    //  console.log(this.errorCounts);

      // this.finalArray = this.ErrorDetails.concat(this.errorCounts);
    //   if (arr.length != count.length) {
    //     console.log("There is mismatch");
    //  } else {
     
    //   for(var i in this.ErrorDetails){
    //     this.ErrorDetails[i]['doc_count'] = this.errorCounts[i];

    //     console.log("inside"+this.ErrorDetails);
    //   }
    //   console.log("outside"+this.ErrorDetails);
    //   // console.log("#####"+this.finalArray);
    // }

    this.arr1 = [1];
    this.arr2 = [2];
    this.arr3 = [3];

    var arr4 = [];
    arr4.push(this.arr1);
    arr4.push(this.arr2);
    arr4.push(this.arr3);

    console.log(arr4);

      
  }

}
