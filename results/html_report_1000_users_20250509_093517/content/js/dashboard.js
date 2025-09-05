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

    var data = {"OkPercent": 64.7, "KoPercent": 35.3};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6114615384615385, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.786, 500, 1500, "3. Get Customer Profile"], "isController": false}, {"data": [0.6945, 500, 1500, "8. Get Category People"], "isController": false}, {"data": [0.6895, 500, 1500, "12. Get Incoming Call History"], "isController": false}, {"data": [0.0035, 500, 1500, "6. Get Buzz Installed Contacts"], "isController": false}, {"data": [0.697, 500, 1500, "9A. Mute People"], "isController": false}, {"data": [0.8155, 500, 1500, "2. Verify OTP and Get JWT"], "isController": false}, {"data": [0.8245, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [0.6955, 500, 1500, "11. Get Category List"], "isController": false}, {"data": [0.7315, 500, 1500, "5. Create Category"], "isController": false}, {"data": [0.697, 500, 1500, "9B. Block People"], "isController": false}, {"data": [0.7795, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [0.001, 500, 1500, "10. Update Category"], "isController": false}, {"data": [0.534, 500, 1500, "7. Add People to Category"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13000, 4589, 35.3, 2502.3453076923065, 24, 60031, 144.0, 442.0, 7261.7499999999945, 60013.0, 34.25677295928451, 263.75159816904136, 11.12546088123572], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3. Get Customer Profile", 1000, 213, 21.3, 123.035, 24, 585, 105.0, 261.0, 282.89999999999986, 343.8600000000001, 3.3408502463877054, 1.570858650714107, 1.0415981531362233], "isController": false}, {"data": ["8. Get Category People", 1000, 300, 30.0, 202.76299999999998, 24, 909, 174.0, 427.9, 449.94999999999993, 504.96000000000004, 2.8072539441917916, 1.2000791294705517, 0.8935483821444612], "isController": false}, {"data": ["12. Get Incoming Call History", 1000, 304, 30.4, 145.83199999999997, 24, 1658, 125.0, 278.9, 293.0, 507.97, 2.8072933481184115, 0.9980613226913522, 0.8889552087573517], "isController": false}, {"data": ["6. Get Buzz Installed Contacts", 1000, 727, 72.7, 30505.468, 24, 60031, 28165.5, 60015.0, 60021.0, 60028.0, 2.779584507707788, 262.2156224462567, 0.4133627613156885], "isController": false}, {"data": ["9A. Mute People", 1000, 302, 30.2, 139.057, 24, 608, 126.0, 273.9, 287.0, 337.9200000000001, 2.8072066609399653, 1.553890319102199, 1.0772381420081634], "isController": false}, {"data": ["2. Verify OTP and Get JWT", 1000, 183, 18.3, 146.9899999999998, 24, 592, 119.0, 324.0, 355.0, 426.73000000000025, 3.3435311031980874, 1.6019040364779245, 0.9501636240533629], "isController": false}, {"data": ["1. Send OTP", 1000, 167, 16.7, 217.8699999999997, 80, 950, 198.0, 391.9, 426.0, 543.8700000000001, 3.336436219017019, 1.1484606465262694, 0.8797243936861281], "isController": false}, {"data": ["11. Get Category List", 1000, 304, 30.4, 136.982, 24, 505, 122.5, 274.0, 286.94999999999993, 370.99, 2.807411566535654, 1.8403460134755756, 0.8533516765510949], "isController": false}, {"data": ["5. Create Category", 1000, 268, 26.8, 152.17600000000007, 25, 653, 130.0, 336.79999999999995, 368.94999999999993, 400.0, 3.3340001333600053, 1.5802476901630327, 1.2087671440538108], "isController": false}, {"data": ["9B. Block People", 1000, 303, 30.3, 138.23300000000006, 24, 489, 122.0, 274.0, 289.0, 373.0, 2.8075928541146675, 1.554183602885644, 1.0198087520390142], "isController": false}, {"data": ["4. Update Profile Name", 1000, 220, 22.0, 122.49099999999986, 25, 508, 105.0, 258.0, 280.0, 318.97, 3.3379062649162683, 1.5132841367673713, 1.2297413863242643], "isController": false}, {"data": ["10. Update Category", 1000, 999, 99.9, 167.45000000000016, 24, 592, 149.0, 350.0, 367.94999999999993, 424.96000000000004, 2.8074903843454337, 0.9323746850346725, 1.0745751696777002], "isController": false}, {"data": ["7. Add People to Category", 1000, 299, 29.9, 332.1420000000001, 24, 1242, 258.5, 733.9, 763.0, 881.96, 2.807356396701918, 1.840005534878596, 1.1622537729115374], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 834, 18.17389409457398, 6.415384615384616], "isController": false}, {"data": ["502/Bad Gateway", 2474, 53.9115275659185, 19.03076923076923], "isController": false}, {"data": ["500/Internal Server Error", 6, 0.13074743952930923, 0.046153846153846156], "isController": false}, {"data": ["403/Forbidden", 769, 16.757463499673133, 5.915384615384616], "isController": false}, {"data": ["404/Not Found", 14, 0.3050773589017215, 0.1076923076923077], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 492, 10.721290041403355, 3.7846153846153845], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13000, 4589, "502/Bad Gateway", 2474, "400/Bad Request", 834, "403/Forbidden", 769, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 492, "404/Not Found", 14], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["3. Get Customer Profile", 1000, 213, "502/Bad Gateway", 170, "403/Forbidden", 43, "", "", "", "", "", ""], "isController": false}, {"data": ["8. Get Category People", 1000, 300, "502/Bad Gateway", 213, "403/Forbidden", 76, "400/Bad Request", 11, "", "", "", ""], "isController": false}, {"data": ["12. Get Incoming Call History", 1000, 304, "502/Bad Gateway", 195, "403/Forbidden", 109, "", "", "", "", "", ""], "isController": false}, {"data": ["6. Get Buzz Installed Contacts", 1000, 727, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 492, "502/Bad Gateway", 172, "403/Forbidden", 63, "", "", "", ""], "isController": false}, {"data": ["9A. Mute People", 1000, 302, "502/Bad Gateway", 212, "403/Forbidden", 86, "500/Internal Server Error", 4, "", "", "", ""], "isController": false}, {"data": ["2. Verify OTP and Get JWT", 1000, 183, "502/Bad Gateway", 169, "404/Not Found", 14, "", "", "", "", "", ""], "isController": false}, {"data": ["1. Send OTP", 1000, 167, "502/Bad Gateway", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["11. Get Category List", 1000, 304, "502/Bad Gateway", 203, "403/Forbidden", 101, "", "", "", "", "", ""], "isController": false}, {"data": ["5. Create Category", 1000, 268, "502/Bad Gateway", 167, "403/Forbidden", 60, "400/Bad Request", 41, "", "", "", ""], "isController": false}, {"data": ["9B. Block People", 1000, 303, "502/Bad Gateway", 212, "403/Forbidden", 89, "500/Internal Server Error", 2, "", "", "", ""], "isController": false}, {"data": ["4. Update Profile Name", 1000, 220, "502/Bad Gateway", 172, "403/Forbidden", 48, "", "", "", "", "", ""], "isController": false}, {"data": ["10. Update Category", 1000, 999, "400/Bad Request", 697, "502/Bad Gateway", 208, "403/Forbidden", 94, "", "", "", ""], "isController": false}, {"data": ["7. Add People to Category", 1000, 299, "502/Bad Gateway", 214, "400/Bad Request", 85, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
