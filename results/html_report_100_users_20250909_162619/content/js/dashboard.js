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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8106666666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.51, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [1.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [1.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.65, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 200, 13.333333333333334, 4187.117333333324, 31, 60016, 102.0, 718.8000000000002, 60003.95, 60016.0, 13.345670664436456, 8.31104247204082, 4.683122689530766], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 100, 0, 0.0, 686.7800000000002, 367, 739, 704.5, 733.0, 734.0, 738.99, 67.24949562878278, 40.48958158204438, 30.401500504371214], "isController": false}, {"data": ["6. Create Category", 100, 0, 0.0, 326.7700000000001, 194, 401, 328.0, 386.0, 399.79999999999995, 401.0, 117.78563015312132, 58.14745288574794, 52.87470553592462], "isController": false}, {"data": ["2. Verify OTP", 100, 0, 0.0, 96.75, 41, 158, 83.0, 148.9, 150.0, 157.92999999999995, 181.15942028985506, 87.92600769927536, 52.36639492753623], "isController": false}, {"data": ["9. Mute People", 100, 0, 0.0, 159.60000000000002, 33, 236, 204.5, 230.70000000000002, 233.0, 235.99, 86.88097306689835, 50.991664856646395, 35.889308210251954], "isController": false}, {"data": ["3. Get Profile Data", 100, 0, 0.0, 57.28, 34, 93, 44.5, 90.70000000000002, 91.94999999999999, 93.0, 179.85611510791367, 84.30755395683452, 61.82553956834532], "isController": false}, {"data": ["Get Category People (for Contact Details)", 100, 0, 0.0, 77.54, 33, 149, 56.5, 141.9, 144.0, 149.0, 72.3589001447178, 33.2059515195369, 25.15602387843705], "isController": false}, {"data": ["11. View People Details", 100, 100, 100.0, 80.00999999999999, 37, 153, 59.5, 146.0, 149.95, 153.0, 66.35700066357, 21.19017501658925, 23.069426011944262], "isController": false}, {"data": ["7. Update Category", 100, 0, 0.0, 410.88000000000005, 155, 472, 427.5, 458.9, 464.95, 471.98, 100.50251256281408, 54.89262719849246, 47.74360081658291], "isController": false}, {"data": ["1. Send OTP", 100, 0, 0.0, 575.23, 317, 738, 621.5, 725.0, 729.0, 737.99, 134.9527665317139, 42.96347840755735, 36.242198043184885], "isController": false}, {"data": ["14. Get Category List", 100, 0, 0.0, 50.070000000000014, 32, 84, 46.0, 76.0, 79.0, 84.0, 60.97560975609756, 39.794326410060975, 20.483993902439025], "isController": false}, {"data": ["4. Update Profile Name", 100, 0, 0.0, 68.90999999999998, 36, 117, 55.0, 111.0, 113.94999999999999, 116.99, 172.41379310344828, 79.45851293103449, 68.68265086206897], "isController": false}, {"data": ["13. Get Incoming Call History", 100, 0, 0.0, 53.26, 31, 102, 47.5, 83.0, 101.04999999999978, 102.0, 62.81407035175879, 21.285627355527637, 21.89904601130653], "isController": false}, {"data": ["5. Buzz Installed Contacts", 100, 100, 100.0, 60008.67999999999, 60001, 60016, 60005.0, 60016.0, 60016.0, 60016.0, 1.6512549537648613, 4.368407880614266, 0.0], "isController": false}, {"data": ["12. Remove People from Category", 100, 0, 0.0, 53.56999999999999, 32, 99, 46.0, 85.9, 88.0, 99.0, 64.47453255963894, 21.47052304964539, 25.940925209542232], "isController": false}, {"data": ["10. Block People", 100, 0, 0.0, 101.43, 32, 183, 57.5, 172.0, 174.95, 182.93999999999997, 77.39938080495357, 48.828125, 30.38530379256966], "isController": false}]}, function(index, item){
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
