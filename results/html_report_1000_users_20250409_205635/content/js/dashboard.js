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

    var data = {"OkPercent": 67.53076923076924, "KoPercent": 32.46923076923077};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.637576923076923, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.689, 500, 1500, "3. Get Customer Profile"], "isController": false}, {"data": [0.66, 500, 1500, "8. Get Category People"], "isController": false}, {"data": [0.661, 500, 1500, "12. Get Incoming Call History"], "isController": false}, {"data": [0.1875, 500, 1500, "6. Get Buzz Installed Contacts"], "isController": false}, {"data": [0.66, 500, 1500, "9A. Mute People"], "isController": false}, {"data": [0.717, 500, 1500, "2. Verify OTP and Get JWT"], "isController": false}, {"data": [0.728, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.662, 500, 1500, "11. Get Category List"], "isController": false}, {"data": [0.66, 500, 1500, "5. Create Category"], "isController": false}, {"data": [0.66, 500, 1500, "9B. Block People"], "isController": false}, {"data": [0.685, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.659, 500, 1500, "10. Update Category"], "isController": false}, {"data": [0.66, 500, 1500, "7. Add People to Category"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13000, 4221, 32.46923076923077, 325.10399999999976, 24, 21284, 44.0, 121.0, 687.9499999999989, 12256.61999999997, 39.156272684282975, 558.3599683446008, 12.76769512907263], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3. Get Customer Profile", 1000, 311, 31.1, 46.06200000000006, 24, 270, 41.0, 71.0, 85.0, 126.95000000000005, 3.341575887188398, 1.468133113763951, 0.9945006275897214], "isController": false}, {"data": ["8. Get Category People", 1000, 340, 34.0, 52.78099999999995, 25, 362, 43.0, 98.0, 117.0, 163.97000000000003, 3.2044092671516005, 1.3431669477200627, 0.9768347496154709], "isController": false}, {"data": ["12. Get Incoming Call History", 1000, 339, 33.9, 45.780000000000015, 25, 260, 40.0, 77.0, 87.0, 120.98000000000002, 3.2042552509732927, 1.1308017046637935, 0.9692778259528655], "isController": false}, {"data": ["6. Get Buzz Installed Contacts", 1000, 323, 32.3, 3561.1030000000005, 24, 21284, 932.0, 15153.899999999998, 19240.649999999998, 21187.96, 3.1952148462462615, 574.4711220476214, 0.9727837840050739], "isController": false}, {"data": ["9A. Mute People", 1000, 340, 34.0, 45.514999999999986, 25, 263, 41.0, 73.0, 84.94999999999993, 106.95000000000005, 3.2046043755668143, 1.6354435553002555, 1.185506460682709], "isController": false}, {"data": ["2. Verify OTP and Get JWT", 1000, 283, 28.3, 49.669000000000025, 25, 278, 44.0, 80.89999999999998, 94.94999999999993, 137.8900000000001, 3.341989085063648, 1.5254417796258977, 0.9497254138217984], "isController": false}, {"data": ["1. Send OTP", 1000, 271, 27.1, 120.01100000000007, 79, 574, 110.0, 160.89999999999998, 177.94999999999993, 315.93000000000006, 3.337549771210963, 1.1274888473688427, 0.8800180060810158], "isController": false}, {"data": ["11. Get Category List", 1000, 338, 33.8, 44.92500000000004, 24, 264, 40.0, 72.89999999999998, 85.0, 110.98000000000002, 3.2043887308057113, 1.7959096778948447, 0.928637486902061], "isController": false}, {"data": ["5. Create Category", 1000, 340, 34.0, 48.82000000000001, 25, 223, 43.0, 83.0, 101.0, 119.98000000000002, 3.3400356715809725, 1.5209817909605274, 1.1636534239123173], "isController": false}, {"data": ["9B. Block People", 1000, 340, 34.0, 45.84900000000002, 24, 270, 41.0, 74.0, 84.94999999999993, 109.96000000000004, 3.204573567395387, 1.7308765570221822, 1.1197762696921048], "isController": false}, {"data": ["4. Update Profile Name", 1000, 315, 31.5, 49.28200000000003, 25, 257, 43.0, 83.89999999999998, 98.94999999999993, 126.95000000000005, 3.3409060537217696, 1.4492909187909262, 1.1835322825487773], "isController": false}, {"data": ["10. Update Category", 1000, 341, 34.1, 50.79799999999995, 25, 227, 43.0, 94.0, 114.94999999999993, 136.96000000000004, 3.20459410611052, 1.565841665611821, 1.183437200570738], "isController": false}, {"data": ["7. Add People to Category", 1000, 340, 34.0, 65.75700000000003, 24, 283, 51.0, 145.0, 180.94999999999993, 210.96000000000004, 3.204460609167962, 1.896051804111323, 1.2835272949946326], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 98, 2.3217247097844114, 0.7538461538461538], "isController": false}, {"data": ["502/Bad Gateway", 3522, 83.43994314143568, 27.092307692307692], "isController": false}, {"data": ["500/Internal Server Error", 9, 0.21321961620469082, 0.06923076923076923], "isController": false}, {"data": ["403/Forbidden", 577, 13.669746505567401, 4.438461538461539], "isController": false}, {"data": ["404/Not Found", 15, 0.35536602700781805, 0.11538461538461539], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13000, 4221, "502/Bad Gateway", 3522, "403/Forbidden", 577, "400/Bad Request", 98, "404/Not Found", 15, "500/Internal Server Error", 9], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["3. Get Customer Profile", 1000, 311, "502/Bad Gateway", 266, "403/Forbidden", 45, "", "", "", "", "", ""], "isController": false}, {"data": ["8. Get Category People", 1000, 340, "502/Bad Gateway", 272, "403/Forbidden", 60, "400/Bad Request", 8, "", "", "", ""], "isController": false}, {"data": ["12. Get Incoming Call History", 1000, 339, "502/Bad Gateway", 267, "403/Forbidden", 72, "", "", "", "", "", ""], "isController": false}, {"data": ["6. Get Buzz Installed Contacts", 1000, 323, "502/Bad Gateway", 273, "403/Forbidden", 50, "", "", "", "", "", ""], "isController": false}, {"data": ["9A. Mute People", 1000, 340, "502/Bad Gateway", 276, "403/Forbidden", 62, "500/Internal Server Error", 2, "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP and Get JWT", 1000, 283, "502/Bad Gateway", 269, "404/Not Found", 14, "", "", "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 1000, 271, "502/Bad Gateway", 271, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["11. Get Category List", 1000, 338, "502/Bad Gateway", 266, "403/Forbidden", 72, "", "", "", "", "", ""], "isController": false}, {"data": ["5. Create Category", 1000, 340, "502/Bad Gateway", 266, "403/Forbidden", 52, "400/Bad Request", 22, "", "", "", ""], "isController": false}, {"data": ["9B. Block People", 1000, 340, "502/Bad Gateway", 281, "403/Forbidden", 52, "500/Internal Server Error", 7, "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 1000, 315, "502/Bad Gateway", 269, "403/Forbidden", 46, "", "", "", "", "", ""], "isController": false}, {"data": ["10. Update Category", 1000, 341, "502/Bad Gateway", 273, "403/Forbidden", 66, "400/Bad Request", 1, "404/Not Found", 1, "", ""], "isController": false}, {"data": ["7. Add People to Category", 1000, 340, "502/Bad Gateway", 273, "400/Bad Request", 67, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
