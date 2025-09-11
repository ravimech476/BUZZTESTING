/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 8.46, "KoPercent": 91.54};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.07986666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.018, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.056, 500, 1500, "6. Create Category"], "isController": false}, {"data": [0.204, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [0.004, 500, 1500, "9. Mute People"], "isController": false}, {"data": [0.11, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [0.014, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.017, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.483, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.086, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [0.111, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.067, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [0.022, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [0.006, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 15000, 13731, 91.54, 376.52333333333485, 20, 60046, 33.0, 83.0, 127.0, 629.9399999999987, 38.59394538184849, 429.76960258849596, 12.209428295826452], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 1000, 982, 98.2, 36.85199999999999, 20, 249, 26.0, 49.0, 92.0, 208.99, 3.230245434048079, 2.325502267834185, 1.238155598499874], "isController": false}, {"data": ["6. Create Category", 1000, 944, 94.4, 38.021999999999956, 20, 303, 27.0, 66.0, 84.94999999999993, 207.98000000000002, 3.2296612085392242, 1.0014946014194361, 1.2076441286777768], "isController": false}, {"data": ["2. Verify OTP", 1000, 796, 79.6, 57.24299999999996, 21, 317, 48.0, 103.89999999999998, 122.89999999999986, 233.97000000000003, 3.356346683761659, 1.1574840080569102, 1.0881905263758505], "isController": false}, {"data": ["9. Mute People", 1000, 996, 99.6, 34.01199999999994, 21, 300, 27.0, 47.0, 64.0, 124.0, 3.229765519023319, 0.9491252634277502, 1.1069169718122214], "isController": false}, {"data": ["3. Get Profile Data", 1000, 890, 89.0, 38.47900000000007, 20, 246, 29.0, 56.0, 82.0, 216.98000000000002, 3.356797346787377, 1.058050066842227, 0.8887350444188208], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 985, 98.5, 37.27199999999995, 20, 1604, 28.0, 46.89999999999998, 68.89999999999986, 206.87000000000012, 3.2296299167078444, 0.9488047139678265, 0.897632111039521], "isController": false}, {"data": ["11. View People Details", 1000, 1000, 100.0, 78.63399999999986, 21, 657, 67.0, 88.0, 140.0, 529.7800000000002, 3.2298385403713668, 0.9400344139296477, 0.9116755483862111], "isController": false}, {"data": ["7. Update Category", 1000, 983, 98.3, 37.73099999999998, 20, 270, 27.0, 49.0, 87.89999999999986, 214.0, 3.2295151851804005, 0.9566555665538489, 1.3258452902768987], "isController": false}, {"data": ["1. Send OTP", 1000, 509, 50.9, 122.89100000000002, 60, 1501, 98.0, 177.89999999999998, 254.94999999999993, 673.6500000000003, 3.343083994985374, 1.0804070465942333, 1.0153311742582531], "isController": false}, {"data": ["14. Get Category List", 1000, 914, 91.4, 34.13300000000002, 21, 730, 30.0, 45.0, 51.0, 94.94000000000005, 3.2323023366313595, 1.0089739066333308, 0.8305217774349741], "isController": false}, {"data": ["4. Update Profile Name", 1000, 889, 88.9, 38.943000000000005, 21, 308, 27.0, 59.89999999999998, 88.94999999999993, 211.99, 3.3568086149136294, 1.0541723085528127, 1.0752408719981739], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 933, 93.3, 34.82200000000005, 21, 546, 29.0, 43.0, 51.0, 126.99000000000001, 3.2302976073185623, 0.9549441118135213, 0.8710163111858745], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 938, 93.8, 4988.433000000012, 21, 60046, 29.0, 10931.199999999993, 60027.0, 60041.0, 3.229755087671702, 524.3108901184836, 0.8771781417846335], "isController": false}, {"data": ["12. Remove People from Category", 1000, 978, 97.8, 35.24399999999995, 21, 530, 28.0, 45.0, 53.0, 177.8900000000001, 3.2302976073185623, 0.9484551253113199, 1.1023548314349951], "isController": false}, {"data": ["10. Block People", 1000, 994, 99.4, 35.139000000000024, 21, 390, 27.0, 45.89999999999998, 72.0, 174.92000000000007, 3.229775950442318, 0.949103096265087, 1.0406849072973556], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 509, 3.7069404995994466, 3.3933333333333335], "isController": false}, {"data": ["502/Bad Gateway", 8454, 61.56871313087175, 56.36], "isController": false}, {"data": ["504/Gateway Time-out", 69, 0.5025125628140703, 0.46], "isController": false}, {"data": ["500/Internal Server Error", 39, 0.28402883985143107, 0.26], "isController": false}, {"data": ["403/Forbidden", 4287, 31.221324011361155, 28.58], "isController": false}, {"data": ["404/Not Found", 373, 2.7164809555021483, 2.486666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 15000, 13731, "502/Bad Gateway", 8454, "403/Forbidden", 4287, "400/Bad Request", 509, "404/Not Found", 373, "504/Gateway Time-out", 69], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["8. Add People to Category", 1000, 982, "502/Bad Gateway", 574, "400/Bad Request", 408, "", "", "", "", "", ""], "isController": false}, {"data": ["6. Create Category", 1000, 944, "502/Bad Gateway", 607, "403/Forbidden", 320, "500/Internal Server Error", 17, "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP", 1000, 796, "502/Bad Gateway", 518, "404/Not Found", 278, "", "", "", "", "", ""], "isController": false}, {"data": ["9. Mute People", 1000, 996, "502/Bad Gateway", 633, "403/Forbidden", 350, "500/Internal Server Error", 13, "", "", "", ""], "isController": false}, {"data": ["3. Get Profile Data", 1000, 890, "502/Bad Gateway", 532, "403/Forbidden", 324, "404/Not Found", 34, "", "", "", ""], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 985, "502/Bad Gateway", 548, "403/Forbidden", 386, "400/Bad Request", 51, "", "", "", ""], "isController": false}, {"data": ["11. View People Details", 1000, 1000, "502/Bad Gateway", 596, "403/Forbidden", 384, "404/Not Found", 20, "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 1000, 983, "502/Bad Gateway", 641, "403/Forbidden", 324, "404/Not Found", 18, "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 1000, 509, "502/Bad Gateway", 509, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["14. Get Category List", 1000, 914, "502/Bad Gateway", 509, "403/Forbidden", 405, "", "", "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 1000, 889, "502/Bad Gateway", 562, "403/Forbidden", 304, "404/Not Found", 23, "", "", "", ""], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 933, "502/Bad Gateway", 517, "403/Forbidden", 416, "", "", "", "", "", ""], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 938, "502/Bad Gateway", 562, "403/Forbidden", 307, "504/Gateway Time-out", 69, "", "", "", ""], "isController": false}, {"data": ["12. Remove People from Category", 1000, 978, "502/Bad Gateway", 527, "403/Forbidden", 401, "400/Bad Request", 50, "", "", "", ""], "isController": false}, {"data": ["10. Block People", 1000, 994, "502/Bad Gateway", 619, "403/Forbidden", 366, "500/Internal Server Error", 9, "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
