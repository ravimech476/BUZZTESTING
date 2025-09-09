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

    var data = {"OkPercent": 80.0, "KoPercent": 20.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7403333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.645, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.96, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.5, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 300, 20.0, 4248.651999999996, 32, 60013, 231.0, 844.0, 60004.0, 60009.99, 13.237435467502097, 8.191533625843887, 4.645141930128403], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 100, 0, 0.0, 519.5099999999999, 403, 597, 547.0, 586.0, 591.95, 596.98, 62.5, 37.7978515625, 28.25439453125], "isController": false}, {"data": ["6. Create Category", 100, 0, 0.0, 400.21000000000004, 215, 504, 432.5, 497.0, 504.0, 504.0, 94.25070688030159, 46.5289231856739, 42.30973138548539], "isController": false}, {"data": ["2. Verify OTP", 100, 0, 0.0, 403.8100000000001, 379, 423, 404.0, 422.0, 422.0, 422.99, 216.91973969631238, 105.28233459869848, 62.70336225596529], "isController": false}, {"data": ["9. Mute People", 100, 0, 0.0, 166.85000000000005, 36, 255, 185.5, 220.8, 228.84999999999997, 254.7799999999999, 78.125, 46.2738037109375, 32.2723388671875], "isController": false}, {"data": ["3. Get Profile Data", 100, 0, 0.0, 372.86000000000007, 139, 437, 416.0, 431.0, 436.0, 437.0, 208.33333333333334, 100.08138020833334, 71.61458333333334], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 0, 0.0, 72.87999999999997, 35, 105, 70.0, 100.0, 101.0, 104.97999999999999, 64.1025641025641, 29.417067307692307, 22.28565705128205], "isController": false}, {"data": ["11. View People Details", 100, 100, 100.0, 92.09000000000005, 39, 237, 91.0, 143.0, 206.0, 237.0, 63.33122229259025, 20.223935243825206, 22.01749525015833], "isController": false}, {"data": ["7. Update Category", 100, 100, 100.0, 369.65000000000003, 160, 428, 382.0, 397.0, 399.0, 427.8499999999999, 82.7129859387924, 29.56343052109181, 39.29270704094293], "isController": false}, {"data": ["1. Send OTP", 100, 0, 0.0, 845.3100000000001, 811, 888, 844.0, 877.8, 882.95, 887.98, 112.35955056179775, 35.77071629213483, 30.174683988764045], "isController": false}, {"data": ["14. Get Category List", 100, 0, 0.0, 51.05000000000001, 32, 79, 47.0, 69.0, 76.94999999999999, 78.99, 61.95786864931846, 47.243479902416354, 20.81397149938042], "isController": false}, {"data": ["4. Update Profile Name", 100, 0, 0.0, 185.09000000000006, 33, 254, 229.5, 251.40000000000003, 252.0, 253.98, 167.78523489932886, 77.3253984899329, 66.83882130872483], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 0, 0.0, 55.99000000000001, 33, 89, 51.5, 76.80000000000001, 89.0, 89.0, 62.5782227784731, 21.20570635168961, 21.816821808510635], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, 100.0, 60006.01999999999, 60000, 60013, 60006.0, 60010.0, 60012.95, 60013.0, 1.650955077512341, 4.367614555645441, 0.0], "isController": false}, {"data": ["12. Remove People from Category", 100, 0, 0.0, 54.429999999999986, 32, 83, 47.0, 80.0, 81.0, 82.99, 63.37135614702155, 21.103156685678073, 25.4970690747782], "isController": false}, {"data": ["10. Block People", 100, 0, 0.0, 134.02999999999997, 34, 277, 85.5, 262.0, 277.0, 277.0, 66.8896321070234, 42.20579013377926, 26.259406354515047], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 100, 33.333333333333336, 6.666666666666667], "isController": false}, {"data": ["404/Not Found", 100, 33.333333333333336, 6.666666666666667], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, 33.333333333333336, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1500, 300, "400/Bad Request", 100, "404/Not Found", 100, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 100, 100, "400/Bad Request", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
