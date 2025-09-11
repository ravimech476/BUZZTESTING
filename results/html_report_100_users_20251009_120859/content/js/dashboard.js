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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.808, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.62, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [1.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [1.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.5, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 200, 13.333333333333334, 252.16400000000058, 36, 1240, 173.0, 540.0, 839.95, 1214.96, 28.007543365012978, 13.147627031713874, 10.490010205248613], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 100, 0, 0.0, 445.61000000000024, 46, 554, 540.0, 551.0, 554.0, 554.0, 61.050061050061046, 36.81664472680098, 27.65853937728938], "isController": false}, {"data": ["6. Create Category", 100, 0, 0.0, 221.81999999999996, 40, 328, 257.0, 284.0, 284.0, 327.5799999999998, 103.62694300518135, 51.25890544041451, 46.51878238341969], "isController": false}, {"data": ["2. Verify OTP", 100, 0, 0.0, 112.53999999999996, 48, 189, 104.5, 174.0, 183.95, 189.0, 157.48031496062993, 76.43331692913385, 45.52165354330709], "isController": false}, {"data": ["9. Mute People", 100, 0, 0.0, 226.39000000000004, 43, 329, 288.5, 321.0, 324.95, 328.98, 53.219797764768494, 31.287420170303353, 21.9843500532198], "isController": false}, {"data": ["3. Get Profile Data", 100, 0, 0.0, 96.04000000000003, 40, 171, 96.0, 157.8, 171.0, 171.0, 155.27950310559004, 72.78726708074534, 53.37732919254658], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 0, 0.0, 155.96000000000006, 60, 220, 170.5, 219.0, 219.0, 220.0, 47.214353163361665, 21.66696175637394, 16.46047273371105], "isController": false}, {"data": ["11. View People Details", 100, 100, 100.0, 114.53000000000002, 40, 182, 129.0, 174.9, 177.0, 181.98, 45.06534474988734, 14.390984114465976, 15.66724876070302], "isController": false}, {"data": ["7. Update Category", 100, 0, 0.0, 343.84999999999997, 41, 440, 393.0, 436.0, 437.9, 440.0, 86.05851979345955, 47.08762505378658, 40.966040501290884], "isController": false}, {"data": ["1. Send OTP", 100, 0, 0.0, 1032.4100000000003, 747, 1240, 1078.5, 1217.0, 1225.6999999999998, 1239.92, 80.1924619085806, 25.530022052927023, 21.536061547714514], "isController": false}, {"data": ["14. Get Category List", 100, 0, 0.0, 132.35999999999996, 36, 347, 135.5, 201.0, 250.64999999999992, 347.0, 37.65060240963856, 24.68210243317018, 12.648249246987952], "isController": false}, {"data": ["4. Update Profile Name", 100, 0, 0.0, 246.53000000000003, 73, 358, 248.0, 323.0, 347.0, 358.0, 119.61722488038278, 55.12671949760766, 47.65064294258374], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 0, 0.0, 183.78999999999996, 42, 367, 123.0, 359.0, 367.0, 367.0, 39.032006245121, 13.226666178766589, 13.607838114754099], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, 100.0, 171.12, 41, 289, 139.0, 288.0, 289.0, 289.0, 110.49723756906077, 37.335980662983424, 38.73877762430939], "isController": false}, {"data": ["12. Remove People from Category", 100, 0, 0.0, 128.27000000000004, 36, 261, 108.5, 229.0, 229.0, 261.0, 44.20866489832007, 14.721830791335101, 17.83025254199823], "isController": false}, {"data": ["10. Block People", 100, 0, 0.0, 171.24000000000004, 42, 278, 207.5, 242.0, 254.0, 277.8399999999999, 49.48045522018803, 31.263529811974273, 19.42494433448788], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 100, 50.0, 6.666666666666667], "isController": false}, {"data": ["404/Not Found", 100, 50.0, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1500, 200, "500/Internal Server Error", 100, "404/Not Found", 100, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, "500/Internal Server Error", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
