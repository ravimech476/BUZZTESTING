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

    var data = {"OkPercent": 82.2, "KoPercent": 17.8};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.22513333333333332, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0075, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.0235, 500, 1500, "6. Create Category"], "isController": false}, {"data": [0.506, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [0.287, 500, 1500, "9. Mute People"], "isController": false}, {"data": [0.551, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [0.0085, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.0095, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.3605, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.2695, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [0.4555, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.328, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [0.238, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [0.3325, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 15000, 2670, 17.8, 17205.355266666666, 30, 247115, 1645.5, 5847.0, 240010.0, 240037.0, 23.269198252017826, 15.904771206092962, 7.965084434709732], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 1000, 39, 3.9, 4287.514000000005, 33, 7287, 4044.5, 5547.8, 5632.95, 6973.95, 1.908083787775289, 1.2801621090097808, 0.8473215005504822], "isController": false}, {"data": ["6. Create Category", 1000, 39, 3.9, 2092.848, 32, 7470, 1886.5, 3301.0, 3455.0, 4391.560000000001, 1.927049609965159, 1.0162156858706795, 0.8529998531829078], "isController": false}, {"data": ["2. Verify OTP", 1000, 39, 3.9, 1328.763, 227, 31084, 840.5, 1633.8, 2441.85, 19212.95, 3.3222922487599544, 1.8324745294388316, 0.9309101814137682], "isController": false}, {"data": ["9. Mute People", 1000, 39, 3.9, 1655.0299999999982, 32, 4661, 1453.0, 2835.7, 2913.8999999999996, 3141.95, 1.9082840518976931, 1.1660696421108676, 0.7693403694151683], "isController": false}, {"data": ["3. Get Profile Data", 1000, 54, 5.4, 1241.6009999999999, 33, 31032, 687.0, 1463.9999999999993, 2521.449999999998, 19221.99, 3.3076986686512857, 1.7674481104771356, 1.0862366141569504], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 39, 3.9, 2526.9719999999998, 32, 5603, 2314.5, 3795.0, 3851.95, 5240.98, 1.8944201748170937, 0.9241181414885596, 0.6416497333129999], "isController": false}, {"data": ["11. View People Details", 1000, 999, 99.9, 4944.420999999984, 35, 7686, 5463.5, 6063.0, 6224.399999999996, 7531.6900000000005, 1.8905092653859097, 0.5870326661095966, 0.6388388970627158], "isController": false}, {"data": ["7. Update Category", 1000, 39, 3.9, 2558.759999999995, 33, 5609, 2294.0, 3744.5, 3831.95, 5287.400000000001, 1.9261773277371461, 1.1151776693928497, 0.9078239276489272], "isController": false}, {"data": ["1. Send OTP", 1000, 25, 2.5, 2645.7040000000065, 291, 30278, 1218.0, 3306.7999999999997, 15997.699999999995, 21061.94, 3.3198767661744397, 1.3765817137867842, 0.8534741784134973], "isController": false}, {"data": ["14. Get Category List", 1000, 111, 11.1, 1543.5590000000013, 41, 4662, 1403.5, 2859.6, 2944.8999999999996, 4521.730000000004, 1.8901519304121663, 1.2370103000285413, 0.6155600939547271], "isController": false}, {"data": ["4. Update Profile Name", 1000, 55, 5.5, 1498.8230000000017, 31, 43015, 914.5, 1912.0, 2910.0, 19234.88, 3.289138278662373, 1.743962786689515, 1.2588919797652214], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 81, 8.1, 1456.4050000000009, 47, 4723, 1371.5, 2266.899999999999, 2897.8999999999996, 4641.42, 1.888666865606243, 0.6951972470555683, 0.6390536734334452], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, 100.0, 226968.1760000001, 32, 247115, 240023.0, 240039.0, 240042.0, 240286.29, 1.8389350359419854, 5.509596626151863, 0.014497775923007468], "isController": false}, {"data": ["12. Remove People from Category", 1000, 72, 7.2, 1724.8070000000016, 33, 4711, 1475.5, 2865.0, 2924.8999999999996, 3891.8100000000013, 1.8911671148732727, 0.6872305530103598, 0.7446193488380669], "isController": false}, {"data": ["10. Block People", 1000, 39, 3.9, 1606.9459999999997, 30, 4653, 1394.0, 2941.2, 3030.5999999999995, 4550.8, 1.9049614721542256, 1.244488633928316, 0.7289342514453895], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 39, 1.4606741573033708, 0.26], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 62, 2.3220973782771535, 0.41333333333333333], "isController": false}, {"data": ["502/Bad Gateway", 159, 5.955056179775281, 1.06], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to buzz.pazl.info:443 [buzz.pazl.info/35.154.114.200] failed: Connection timed out: no further information", 25, 0.9363295880149812, 0.16666666666666666], "isController": false}, {"data": ["403/Forbidden", 468, 17.528089887640448, 3.12], "isController": false}, {"data": ["404/Not Found", 973, 36.441947565543074, 6.486666666666666], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 944, 35.355805243445694, 6.293333333333333], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 15000, 2670, "404/Not Found", 973, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 944, "403/Forbidden", 468, "502/Bad Gateway", 159, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 62], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["8. Add People to Category", 1000, 39, "400/Bad Request", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["6. Create Category", 1000, 39, "403/Forbidden", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP", 1000, 39, "404/Not Found", 25, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 14, "", "", "", "", "", ""], "isController": false}, {"data": ["9. Mute People", 1000, 39, "403/Forbidden", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["3. Get Profile Data", 1000, 54, "403/Forbidden", 39, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 15, "", "", "", "", "", ""], "isController": false}, {"data": ["Get Category People (for Contact Details)", 1000, 39, "403/Forbidden", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["11. View People Details", 1000, 999, "404/Not Found", 948, "403/Forbidden", 39, "502/Bad Gateway", 12, "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 1000, 39, "403/Forbidden", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 1000, 25, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to buzz.pazl.info:443 [buzz.pazl.info/35.154.114.200] failed: Connection timed out: no further information", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["14. Get Category List", 1000, 111, "502/Bad Gateway", 72, "403/Forbidden", 39, "", "", "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 1000, 55, "403/Forbidden", 39, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 16, "", "", "", "", "", ""], "isController": false}, {"data": ["13. Get Incoming Call History", 1000, 81, "502/Bad Gateway", 42, "403/Forbidden", 39, "", "", "", "", "", ""], "isController": false}, {"data": ["5. Buzz Installed Contacts", 1000, 1000, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 944, "403/Forbidden", 39, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 17, "", "", "", ""], "isController": false}, {"data": ["12. Remove People from Category", 1000, 72, "403/Forbidden", 39, "502/Bad Gateway", 33, "", "", "", "", "", ""], "isController": false}, {"data": ["10. Block People", 1000, 39, "403/Forbidden", 39, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
