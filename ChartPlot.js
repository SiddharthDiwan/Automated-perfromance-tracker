
const ExcelJS = require('exceljs');

(async() =>{

	const inputworkbook = new Excel.Workbook();
	await inputworkbook.xlsx.readFile("./Lighthouse_reports/Lighthouse_report_summary.xlsx");
	
	
	Excel.run(function (context) {
		var sheet = context.inputworkbook.worksheets.getItem("Event details-PB");
		var dataRange = sheet.getRange("B2:C6");
		var chart = sheet.charts.add("Line", dataRange, "auto");
	
		chart.title.text = "Sales Data";
		chart.legend.position = "right"
		chart.legend.format.fill.setSolidColor("white");
		chart.dataLabels.format.font.size = 15;
		chart.dataLabels.format.font.color = "black";
	
		return context.sync();
	}).catch(errorHandlerFunction);
	
	
})


// var XLSXChart = require ("xlsx-chart");
// var xlsxChart = new XLSXChart ();
// var opts = {
// 	file: "./Lighthouse_reports/chart.xlsx",
// 	chart: "column",
// 	titles: [
// 		"URL1",
//         "URL2"
// 	],
// 	fields: [
// 		"Performance"	
// 	],
// 	data: {
// 		"URL1": {
// 			"Performance": 20,
// 			},
//         "URL2": {
//             "Performance": 25,
//             }
// 	}
// };
// xlsxChart.writeFile (opts, function (err) {
//   console.log ("File: ", opts.file);
// });

// //D3 or chart.js