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

    var data = {"OkPercent": 0.0, "KoPercent": 100.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [0.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [0.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [0.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [0.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.0, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [0.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [0.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [0.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 15000, 15000, 100.0, 2305.7282666666597, 2138, 9848, 2239.0, 2457.0, 2575.0, 2858.99, 36.0391529357494, 94.14537954033261, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 1000, 1000, 100.0, 2291.375000000003, 2154, 9655, 2236.5, 2431.0, 2530.85, 2809.7000000000003, 3.260472638113621, 8.517347956009703, 0.0], "isController": false}, {"data": ["6. Create Category", 1000, 1000, 100.0, 2311.716, 2154, 9677, 2237.0, 2433.9, 2537.8999999999996, 2907.94, 3.2639738882088944, 8.526519787841698, 0.0], "isController": false}, {"data": ["2. Verify OTP", 1000, 1000, 100.0, 2298.142000000004, 2151, 9768, 2225.5, 2439.8, 2521.8999999999996, 2876.8100000000004, 3.2649223274978287, 8.528971900445988, 0.0], "isController": false}, {"data": ["9. Mute People", 1000, 1000, 100.0, 2329.4079999999967, 2143, 9677, 2245.5, 2473.0, 2577.0, 2946.330000000001, 3.2599093093230147, 8.515914571631617, 0.0], "isController": false}, {"data": ["3. Get Profile Data", 1000, 1000, 100.0, 2278.6980000000053, 2143, 4013, 2229.5, 2434.9, 2545.7999999999997, 2776.4200000000005, 3.2647517809220963, 8.528526380826765, 0.0], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 1000, 100.0, 2303.750000000002, 2153, 8184, 2252.5, 2467.9, 2580.95, 2828.84, 3.2598986823489526, 8.515861342654471, 0.0], "isController": false}, {"data": ["11. View People Details", 1000, 1000, 100.0, 2310.1160000000004, 2143, 8299, 2250.0, 2483.6, 2581.95, 2817.95, 3.2538631490236782, 8.500107377483918, 0.0], "isController": false}, {"data": ["7. Update Category", 1000, 1000, 100.0, 2286.551000000002, 2144, 9768, 2232.5, 2431.9, 2544.95, 2802.7700000000004, 3.263132476652287, 8.524296264692254, 0.0], "isController": false}, {"data": ["1. Send OTP", 1000, 1000, 100.0, 2298.429999999994, 2138, 9655, 2221.0, 2464.8, 2581.8999999999996, 2837.7400000000002, 3.2650076074677252, 8.529220185583032, 0.0], "isController": false}, {"data": ["14. Get Category List", 1000, 1000, 100.0, 2349.813000000001, 2146, 9677, 2246.0, 2540.9, 2692.5999999999995, 5625.820000000014, 3.2463632615562417, 8.48050264659765, 0.0], "isController": false}, {"data": ["4. Update Profile Name", 1000, 1000, 100.0, 2290.323999999999, 2151, 8191, 2234.0, 2446.8, 2572.85, 2812.87, 3.2649116678148276, 8.528956807667319, 0.0], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 1000, 100.0, 2324.8710000000005, 2148, 9723, 2250.5, 2487.9, 2655.8999999999996, 2885.8100000000004, 3.2457626568514804, 8.478921003005576, 0.0], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, 100.0, 2292.2910000000015, 2146, 8282, 2228.0, 2429.0, 2535.8999999999996, 2857.7300000000005, 3.263888662229954, 8.5262844013865, 0.0], "isController": false}, {"data": ["12. Remove People from Category", 1000, 1000, 100.0, 2303.161999999998, 2153, 5659, 2254.5, 2479.9, 2586.0, 2838.8900000000003, 3.2449937858369, 8.476912477650107, 0.0], "isController": false}, {"data": ["10. Block People", 1000, 1000, 100.0, 2317.2769999999996, 2143, 9848, 2249.0, 2481.0, 2584.85, 2877.99, 3.2601218633552524, 8.516444360315187, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 14, 0.09333333333333334, 0.09333333333333334], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 14986, 99.90666666666667, 99.90666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 15000, 15000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 14986, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 14, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["8. Add People to Category", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["6. Create Category", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 998, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["9. Mute People", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 997, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 3, "", "", "", "", "", ""], "isController": false}, {"data": ["3. Get Profile Data", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 999, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["11. View People Details", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 998, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 998, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["14. Get Category List", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 999, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 999, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 999, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["12. Remove People from Category", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["10. Block People", 1000, 1000, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 999, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
