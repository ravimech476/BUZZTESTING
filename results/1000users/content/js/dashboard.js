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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7783, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.578, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.856, 500, 1500, "6. Create Category"], "isController": false}, {"data": [0.955, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [0.988, 500, 1500, "9. Mute People"], "isController": false}, {"data": [0.9975, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [0.7465, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.787, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.867, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.9805, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [0.9625, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.9805, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [0.9855, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [0.9905, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 15000, 2000, 13.333333333333334, 4402.6573999999955, 35, 60203, 376.0, 1125.8999999999996, 60029.0, 60043.0, 33.66489514507325, 16.807547385443975, 13.843717194261034], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 1000, 0, 0.0, 819.5559999999997, 192, 1750, 852.5, 1144.6999999999998, 1231.9499999999998, 1402.97, 3.3111267101969455, 2.1335296693508865, 1.6226331652384673], "isController": false}, {"data": ["6. Create Category", 1000, 0, 0.0, 422.40200000000004, 138, 859, 426.5, 586.9, 619.0, 725.9100000000001, 3.321762527196931, 1.7864497261622017, 1.6242542902639139], "isController": false}, {"data": ["2. Verify OTP", 1000, 0, 0.0, 301.43099999999953, 55, 807, 290.5, 494.79999999999995, 551.0, 632.9300000000001, 3.335267788650751, 1.7422963391683841, 1.0813563533516106], "isController": false}, {"data": ["9. Mute People", 1000, 0, 0.0, 306.3300000000002, 97, 659, 314.0, 417.0, 453.8499999999998, 566.8600000000001, 3.311762718824722, 2.069602670232883, 1.487456879814475], "isController": false}, {"data": ["3. Get Profile Data", 1000, 0, 0.0, 216.23899999999986, 35, 713, 213.5, 364.0, 401.0, 469.98, 3.332389156405685, 1.6856584644767316, 1.2656667850359067], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 0, 0.0, 494.2199999999995, 146, 1330, 502.5, 667.9, 731.0, 848.9000000000001, 3.304561616855908, 1.6390270637400366, 1.2712332283171188], "isController": false}, {"data": ["11. View People Details", 1000, 1000, 100.0, 1023.8559999999997, 437, 2271, 1038.5, 1337.8, 1438.85, 1785.96, 3.2870084278896092, 1.0239801645476418, 1.2612707153434266], "isController": false}, {"data": ["7. Update Category", 1000, 0, 0.0, 459.25599999999923, 100, 996, 469.0, 666.8, 726.0, 820.95, 3.318620781203332, 1.9630063230096573, 1.7167024369047226], "isController": false}, {"data": ["1. Send OTP", 1000, 0, 0.0, 389.8040000000006, 107, 984, 384.5, 617.9, 670.9499999999999, 772.8400000000001, 3.331478810129028, 1.1809832110125364, 1.0118065526856717], "isController": false}, {"data": ["14. Get Category List", 1000, 0, 0.0, 335.03099999999995, 125, 1102, 331.5, 439.0, 472.0, 790.4100000000005, 3.277237943860914, 2.3070891009307357, 1.2191165129778623], "isController": false}, {"data": ["4. Update Profile Name", 1000, 0, 0.0, 279.2389999999999, 38, 713, 273.5, 480.9, 530.0, 629.8900000000001, 3.3278645426016578, 1.6570848000203, 1.4488430262934577], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 0, 0.0, 328.3639999999996, 124, 1086, 327.0, 426.0, 472.0, 749.8000000000002, 3.2806676814865363, 1.2302503805574512, 1.2620414600529501], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, 100.0, 60035.59400000001, 60020, 60203, 60032.0, 60045.0, 60050.0, 60107.98, 2.7739481881957406, 0.7910086630401917, 1.0725291880029515], "isController": false}, {"data": ["12. Remove People from Category", 1000, 0, 0.0, 321.08200000000005, 97, 1062, 321.0, 431.0, 465.0, 800.3400000000006, 3.283425269240872, 1.2120456560283688, 1.4426645970826766], "isController": false}, {"data": ["10. Block People", 1000, 0, 0.0, 307.457, 96, 731, 314.0, 417.0, 452.0, 545.98, 3.309176346007479, 2.2134091703481253, 1.418431259100235], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["504/Gateway Time-out", 1000, 50.0, 6.666666666666667], "isController": false}, {"data": ["404/Not Found", 1000, 50.0, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 15000, 2000, "504/Gateway Time-out", 1000, "404/Not Found", 1000, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, "504/Gateway Time-out", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
