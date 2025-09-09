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

    var data = {"OkPercent": 86.66666666666667, "KoPercent": 13.333333333333334};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.806, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.595, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [1.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [1.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.5, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.995, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 200, 13.333333333333334, 2300.8473333333354, 36, 30024, 289.0, 700.6000000000004, 30004.0, 30007.0, 17.786842479723, 11.076790894174216, 6.241572093778163], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 100, 0, 0.0, 568.6199999999997, 359, 637, 617.0, 625.7, 631.95, 637.0, 55.95970900951315, 33.692225972299944, 25.297723139339677], "isController": false}, {"data": ["6. Create Category", 100, 0, 0.0, 374.4799999999999, 171, 486, 421.0, 474.0, 482.0, 486.0, 83.47245409015025, 41.20800292153589, 37.47130634390651], "isController": false}, {"data": ["2. Verify OTP", 100, 0, 0.0, 277.41000000000014, 93, 355, 288.0, 329.5, 339.95, 354.99, 256.4102564102564, 124.44911858974359, 74.11858974358974], "isController": false}, {"data": ["9. Mute People", 100, 0, 0.0, 279.7600000000001, 116, 380, 334.0, 373.0, 377.0, 380.0, 62.22775357809583, 36.52234365276914, 25.705409925326695], "isController": false}, {"data": ["3. Get Profile Data", 100, 0, 0.0, 218.8600000000001, 37, 262, 252.0, 257.9, 261.0, 262.0, 179.53321364452424, 84.15619389587073, 61.7145421903052], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 0, 0.0, 307.89999999999986, 164, 389, 360.5, 388.40000000000003, 389.0, 389.0, 50.607287449392715, 23.224000506072876, 17.593939777327936], "isController": false}, {"data": ["11. View People Details", 100, 100, 100.0, 327.37, 164, 413, 396.0, 405.8, 411.0, 412.99, 45.80852038479157, 14.628306802565278, 15.925618415025196], "isController": false}, {"data": ["7. Update Category", 100, 0, 0.0, 353.4499999999999, 161, 449, 398.0, 439.9, 441.0, 448.95, 72.25433526011561, 39.46399137463873, 34.32433729226879], "isController": false}, {"data": ["1. Send OTP", 100, 0, 0.0, 686.6600000000002, 617, 730, 699.0, 722.0, 724.95, 730.0, 136.79890560875512, 43.55121409028728, 36.737987346101235], "isController": false}, {"data": ["14. Get Category List", 100, 0, 0.0, 217.42999999999992, 105, 539, 246.5, 255.0, 255.0, 536.1699999999985, 44.523597506678534, 29.057299782947464, 14.957146037399822], "isController": false}, {"data": ["4. Update Profile Name", 100, 0, 0.0, 208.54000000000002, 36, 285, 267.0, 276.0, 283.0, 284.99, 127.7139208173691, 58.858157726692205, 50.87603767560664], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 0, 0.0, 238.39999999999992, 102, 376, 264.0, 300.0, 314.0, 375.6899999999998, 42.034468263976464, 14.244102038671711, 14.654594892812106], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, 100.0, 30005.83, 30002, 30024, 30004.5, 30008.0, 30008.0, 30024.0, 3.2535137948984905, 8.607196162480479, 0.0], "isController": false}, {"data": ["12. Remove People from Category", 100, 0, 0.0, 208.08, 100, 268, 249.0, 260.9, 263.95, 267.96999999999997, 44.58314757021846, 14.846536446723139, 17.937750780205082], "isController": false}, {"data": ["10. Block People", 100, 0, 0.0, 239.92000000000013, 117, 304, 289.0, 300.9, 302.0, 304.0, 56.78591709256105, 35.82392816581488, 22.292908858603067], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 100, 50.0, 6.666666666666667], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, 50.0, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1500, 200, "404/Not Found", 100, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
