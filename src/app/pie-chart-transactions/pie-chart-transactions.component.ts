import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import * as _moment from 'moment';
const moment = _moment;
//import * as JSPdf from 'jspdf'; 



@Component({
  selector: 'app-pie-chart-transactions',
  templateUrl: './pie-chart-transactions.component.html',
  styleUrls: ['./pie-chart-transactions.component.css']
})
export class PieChartTransactionsComponent implements OnInit {

 chart = [];
  
  constructor(private _weather: WeatherService) {}
	
  ngOnInit() {
	  
	  this._weather.dailyForecast()
      .subscribe(res => {
        // console.log(res);
		
		
		let tempErrorArray = [];
      let tempSuccessArray = [];
			let tempWarningArray = [];
			let totalErrorCounts : any [];
			let totalSuccessCounts : any [];
			let totalWarningCounts : any [];

      res["aggregations"]["TRANSACTION_STATUS"]["buckets"].forEach(element => {
        if (_.includes(element.key.TRANSACTION_STATUS, 'ERROR')) {
          tempErrorArray.push(element.doc_count);
		  }
		
   totalErrorCounts = tempErrorArray.reduce((a, b) => a + b, 0)
// console.log(totalErrorCounts);
      });
      res["aggregations"]["TRANSACTION_STATUS"]["buckets"].forEach(element => {
        if (_.includes(element.key.TRANSACTION_STATUS, 'SUCCESS')) {
          tempSuccessArray.push(element.doc_count);
        }
		   totalSuccessCounts = tempSuccessArray.reduce((a, b) => a + b, 0)
// console.log(totalSuccessCounts);
      });
      res["aggregations"]["TRANSACTION_STATUS"]["buckets"].forEach(element => {
        if (_.includes(element.key.TRANSACTION_STATUS, 'WARNING')) {
          tempWarningArray.push(element.doc_count);
        }
		  totalWarningCounts = tempWarningArray.reduce((a, b) => a + b, 0)
// console.log(totalWarningCounts);
      });
		// var total = [];
		// total[0]= totalSuccessCounts + totalWarningCounts;
		// console.log("ttallll"+total[0]);
	  let chartx = new Chart('piechart',{
             	type: 'doughnut',
             	data : {

								labels: ["Total Success", "Total Errors", "Total Warnings"],
             		datasets: [
             			
             			{
             			
             				data: [totalSuccessCounts,totalErrorCounts,totalWarningCounts],
						
             				borderColor: '#4dffc3',
             				backgroundColor: ['#00ff00','#ff3333','#ffff00'],
             				fill: true
             			}
             			

             		]
             	},

             	options: {
             		
       					 responsive: true,
       					 title: {
					display: true,
				
					fontFamily : 'Helvetica',
					fontSize: 15,
					position:'top',
					padding: 15
				},
             		
             		hover: {
					mode: 'index'
				},
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
				// tooltips: {
        //             callbacks: {
        //                 label: function (tooltipItem, data) {
        //                     // console.log(tooltipItem)
        //                     var label = data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index];
        //                     var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        //                     return label + ': ' + value;
        //                 }
        //             }
				// 				}
							
								// ,legendCallback: function(chart) {
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
						 })
// 						 let legend = chartx.generateLegend();
// document.getElementById("legend1").innerHTML = legend;
  });

}}
