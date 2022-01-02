import { createBrowser, createReportWithBrowser } from "./lighthouse-util.js";
import fs from "fs";
import { exit } from "process";
const ExcelJS = require('exceljs');
import { getObservationsFromReport } from "./observationFromReport.js";

var URLColumn = 3;
var URLName = 2;

(async() => {
   
    const inputworkbook = new ExcelJS.Workbook();
    await inputworkbook.xlsx.readFile('./Templates_URLs/Template_URLs.xlsx');
    var URLSheet = inputworkbook.getWorksheet('URLS');
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('./Lighthouse_reports/Lighthouse_report_summary.xlsx');

    var urls=[];
    
    URLSheet.eachRow( function(row) {
        
         if(row.getCell(URLColumn).value !='URLs' && row.getCell(URLColumn).value !='NA'){
            console.log(row.getCell(URLColumn).value.text);
            console.log(row.getCell(URLName).value)
            urls.push({

                Sheetname : row.getCell(URLName).value,
                URL : row.getCell(URLColumn).value.text
                
            });

        }
    })

    
    // to get the timestamp
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    var timeOfReport = timeOfReport = hours + ":" + minutes+ " - " +  date + "/" + month + "/" + year  ;


    
// try{

    for (let i = 0; i < urls.length; i++) {
            const browser = await createBrowser();
            const page = await browser.newPage();

            const result = await createReportWithBrowser(
                browser,
                urls[i].URL, {
                    output: "html"
                }
            );

            var res = result.lhr;

            //printing values on console
            var key_values = Object.keys(res.categories).reduce((merged, category) => {
                merged[category] = res.categories[category].score
                return merged
                },{})

            if (workbook.getWorksheet(urls[i].Sheetname))
                {
                var worksheet = workbook.getWorksheet(urls[i].Sheetname);
                }
            else{
                    workbook.addWorksheet(urls[i].Sheetname);
                    var worksheet = workbook.getWorksheet(urls[i].Sheetname);
                }
                

                worksheet.columns = [
                    { header: 'URL', key: 'url', width: 60 },
                    { header: 'Timestamp', key: 'timestamp', width: 30 },
                    { header: 'performance', key: 'performance', width: 20 },
                    { header: 'accessibility', key: 'accessibility', width: 20 },
                    { header: 'best-practices', key: 'best-practices', width: 20 },
                    { header: 'seo', key: 'seo', width: 20 },
                    { header: 'pwa', key: 'pwa', width: 20 },
                    { header: 'PerformanceObservations', key: 'PerformanceObservations1', width: 70, height: 70 },
                    { header: 'AccessibilityObservations', key: 'AccessibilityObservations1', width: 70, height: 70 },
                    { header: 'BestPracticesObservations', key: 'BestPracticesObservations1', width: 70, height: 70 },
                    { header: 'SeoObservations', key: 'SeoObservations1', width: 70, height: 70 },
                    { header: 'PwaObservations', key: 'PwaObservations1', width: 70, height: 70 }
                ];

                const obs = getObservationsFromReport(res);
                var PerformanceObservations = obs[0].join("\n");
                var AccessibilityObservations = obs[1].join("\n");
                var BestPracticesObservations = obs[2].join("\n");
                var SeoObservations = obs[3].join("\n");
                var PwaObservations = obs[4].join("\n");


                worksheet.addRow({ 
                    url: res.finalUrl,
                    timestamp:timeOfReport,
                    performance: res.categories.performance.score,
                    accessibility: res.categories.accessibility.score,
                    'best-practices': res.categories['best-practices'].score,
                    seo: res.categories.seo.score,
                    pwa: res.categories.pwa.score,
                    PerformanceObservations1: String(PerformanceObservations),
                    AccessibilityObservations1: String(AccessibilityObservations), 
                    BestPracticesObservations1: String(BestPracticesObservations), 
                    SeoObservations1: String(SeoObservations),
                    PwaObservations1: String(PwaObservations)
                }).commit();
                
            console.log(key_values);
            
        
            
            let fname = urls[i].Sheetname + month + "-" + date + " " + hours + ".json";
            fs.writeFileSync("./Lighthouse_reports/json_Files/"+ fname , JSON.stringify(result.lhr, null, "  "), "utf-8");

            await browser.close();
        }
    // }catch(e){
    //     console.log("Uh oh! unexpected error while generating report");
    //    exit();
    // }
      
        workbook.xlsx.writeFile('./Lighthouse_reports/Lighthouse_report_summary.xlsx');
   
})()

.catch(console.error)
    .then(() => {
        console.log("Audit process Completed!");
});


//node -r esm playground.js