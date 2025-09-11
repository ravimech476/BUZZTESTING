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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 1500, 100.0, 3176.582000000001, 2146, 13171, 2541.5, 5563.9, 8529.7, 10704.68, 13.47394139733755, 35.19979469081796, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 100, 100, 100.0, 5237.960000000001, 2173, 13171, 3998.0, 10492.8, 11974.64999999999, 13171.0, 3.9707750952986025, 10.374270370076239, 0.0], "isController": false}, {"data": ["6. Create Category", 100, 100, 100.0, 3117.260000000001, 2169, 9843, 2509.5, 3814.2000000000035, 8530.049999999997, 9842.279999999999, 4.662656781834289, 12.181190842542081, 0.0], "isController": false}, {"data": ["2. Verify OTP", 100, 100, 100.0, 2789.0900000000006, 2182, 9272, 2330.5, 3034.9000000000024, 8199.9, 9270.9, 6.602839220864972, 17.250175387916805, 0.0], "isController": false}, {"data": ["9. Mute People", 100, 100, 100.0, 2908.239999999999, 2165, 9864, 2364.5, 3642.7, 6282.65, 9852.519999999993, 4.024792723174756, 10.514456552362553, 0.0], "isController": false}, {"data": ["3. Get Profile Data", 100, 100, 100.0, 5308.62, 2375, 11345, 5128.5, 9302.2, 10710.75, 11344.84, 6.524859715516116, 17.046960638783766, 0.0], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 100, 100.0, 2516.1699999999987, 2170, 8531, 2296.0, 2721.8, 3123.0, 8529.599999999999, 4.044489383215369, 10.565754550050556, 0.0], "isController": false}, {"data": ["11. View People Details", 100, 100, 100.0, 2779.0, 2167, 9751, 2389.0, 3008.9, 6077.95, 9750.019999999999, 4.028521935301938, 10.52404146356202, 0.0], "isController": false}, {"data": ["7. Update Category", 100, 100, 100.0, 3124.5199999999995, 2179, 10043, 2690.5, 3962.3000000000006, 8539.0, 10036.909999999996, 4.568504728402394, 11.935218602951254, 0.0], "isController": false}, {"data": ["1. Send OTP", 100, 100, 100.0, 3261.9100000000008, 2851, 8756, 2875.0, 3183.3, 8725.0, 8755.78, 11.415525114155251, 29.823505279680365, 0.0], "isController": false}, {"data": ["14. Get Category List", 100, 100, 100.0, 2519.2000000000003, 2146, 9670, 2213.0, 2695.0, 3081.8499999999976, 9654.869999999992, 3.8940809968847354, 10.172830266744548, 0.0], "isController": false}, {"data": ["4. Update Profile Name", 100, 100, 100.0, 3383.36, 2203, 10217, 2767.0, 6265.200000000002, 6288.0, 10215.96, 6.143638262579099, 16.049055031639735, 0.0], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 100, 100.0, 2520.9300000000007, 2149, 9667, 2263.5, 3066.3, 3627.7499999999945, 9609.86999999997, 4.043017708417563, 10.561594111344707, 0.0], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, 100.0, 2461.629999999999, 2160, 10024, 2350.5, 2476.0, 2626.049999999999, 9982.46999999998, 6.257039169065198, 16.345292751220125, 0.0], "isController": false}, {"data": ["12. Remove People from Category", 100, 100, 100.0, 3006.359999999999, 2160, 10198, 2495.0, 3251.900000000001, 9611.699999999988, 10196.519999999999, 4.026089057089943, 10.517528585232306, 0.0], "isController": false}, {"data": ["10. Block People", 100, 100, 100.0, 2714.4799999999996, 2166, 8203, 2590.0, 2984.0, 3796.25, 8183.19999999999, 4.043835173278337, 10.563887540943831, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 50, 3.3333333333333335, 3.3333333333333335], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1450, 96.66666666666667, 96.66666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1500, 1500, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 1450, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 50, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["8. Add People to Category", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 91, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 9, "", "", "", "", "", ""], "isController": false}, {"data": ["6. Create Category", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 95, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 5, "", "", "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 94, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 6, "", "", "", "", "", ""], "isController": false}, {"data": ["9. Mute People", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 97, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 3, "", "", "", "", "", ""], "isController": false}, {"data": ["3. Get Profile Data", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 92, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 8, "", "", "", "", "", ""], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 98, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["11. View People Details", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 98, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 95, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 5, "", "", "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 94, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 6, "", "", "", "", "", ""], "isController": false}, {"data": ["14. Get Category List", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 98, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["12. Remove People from Category", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 99, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["10. Block People", 100, 100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection refused: no further information", 99, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 35.154.114.200:5000 [/35.154.114.200] failed: Connection timed out: no further information", 1, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
