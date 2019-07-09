import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewChecked  } from '@angular/core';

import { Chart } from 'chart.js';
import * as _moment from 'moment';
const moment = _moment;
import * as _ from 'lodash';
import { WeatherService } from '../weather.service';
import { AppComponent } from '../app.component';
import * as JSPdf from 'jspdf';
import * as html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
	
  chart = [];
  businessTypeErrors : number;
  functionalTypeErrors : number;
  //canvasID: string;
  
  
  constructor(private _weather: WeatherService) { }

//   @ViewChild(AppComponent) appComponent : AppComponent;


// childToParent(canvasID){
// 	if(canvasID != undefined)
// 	this.appComponent.catchChild(canvasID);
// }
pdf(){
	const elementToPrint = document.getElementById('piechart1');
    const pdf = new JSPdf();
    pdf.addHTML(elementToPrint, () => {
      pdf.save('test.pdf');
    });
}



  ngOnInit() {
	// var canvas = document.getElementsByTagName("canvas")
	// var chartId = <HTMLCanvasElement>document.getElementById("piechart1");
	  

	
	this.businessTypeErrors = 0;
	this.functionalTypeErrors = 0;
//	let legendHtml : any [];

    this._weather.errorTypes()
      .subscribe(res => {
        // console.log(res);

		res['list'].forEach(element => {
			if(element.ERROR_TYPE==="Business"){
				this.businessTypeErrors +=1;
			} else if(element.ERROR_TYPE==="Functional"){
				this.functionalTypeErrors +=1;
			}

			
		});
// 		console.log(this.businessTypeErrors);
// console.log(this.functionalTypeErrors);
//var canvasID = <HTMLCanvasElement>document.getElementById('piechart1');
	  //console.log(canvasID);
	 
	//this.childToParent(canvasID);
        let charta = new Chart('piechart1',{
             	type: 'doughnut',
             	data : {

					labels: ["Total Business Errors", "Total Functional Errors"],
             		datasets: [
						
             			{
             				//label: 'Total Counts of Business & Functional errors',
							 data: [this.businessTypeErrors,this.functionalTypeErrors],
							
             				borderColor: '#ffcc00',
             				backgroundColor: ['#66CCFF','#003399'],
             				fill: true
             			}
             			

             		]
             	},

             	options: {
             		/*
						plugins: {
           						 filler: {
               						 propagate: true
           								}
       					 },
       					 */
							responsive: true,
							showTooltips: true,
       					 title: {
					display: true,
				//	text: 'Business and Functional errors',
					fontFamily : 'Helvetica',
					fontSize: 15,
					position:'top',
					padding: 15
				},
             		hover: {
					mode: 'index'
				},
				// tooltips: {
                //     callbacks: {
                //         label: function (tooltipItem, data) {
                //             // console.log(tooltipItem)
                //             var label = data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index];
                //             var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                //             return label + ': ' + value;
                //         }
                //     }
				// },
				legend: {
					display: true,
					position: 'top'
		
				},
				layout: {
					padding: {
						left: 10,
						right: 50,
						top: -50,
						bottom: 0
					}
				}
			//	,
				// legendCallback: function(chart) {
				// 	let legendHtml = [];
				// 	legendHtml.push('<ul>');
				// 	let item = chart.data.datasets[0];
				// 	for (var i=0; i < item.data.length; i++) {
				// 		legendHtml.push('<li>');
				// 		legendHtml.push('<span class="chart-legend" style="background-color:' + item.backgroundColor[i] +'"></span>');
				// 		//legendHtml.push('<span class="chart-legend-label-text">' + item.data[i] + ' person - '+chart.data.labels[i]+' times</span>');
				// 		legendHtml.push('<span class="chart-legend-label-text">' + item.labels[i]  + ' are - ' + item.data[i] +'</span>');
				// 		legendHtml.push('</li>');
				// 	}
				// 	legendHtml.push('</ul>');
				// 	return legendHtml.join("");
				// }
				
             		
				 }
				 
			 }); 
// 			 let legend = charta.generateLegend();
// document.getElementById("legend").innerHTML = legend;


  })

}
}