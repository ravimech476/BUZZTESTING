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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7966666666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [1.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.95, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 150, 20, 13.333333333333334, 488.99999999999983, 40, 6519, 51.0, 136.4000000000001, 6371.249999999999, 6512.88, 1.269604814341456, 189.8938663275411, 0.4701174701854469], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 10, 0, 0.0, 67.3, 54, 153, 57.0, 144.10000000000002, 153.0, 153.0, 0.3814464449191334, 0.259823139971773, 0.17064513322017089], "isController": false}, {"data": ["6. Create Category", 10, 0, 0.0, 65.80000000000001, 47, 162, 49.0, 155.00000000000003, 162.0, 162.0, 0.3820147457691867, 0.2025722724147152, 0.16922059441494441], "isController": false}, {"data": ["2. Verify OTP", 10, 0, 0.0, 56.1, 53, 64, 55.5, 63.400000000000006, 64.0, 64.0, 0.3808653260207191, 0.19861531649908593, 0.10823418932815357], "isController": false}, {"data": ["9. Mute People", 10, 0, 0.0, 49.400000000000006, 46, 62, 48.0, 60.800000000000004, 62.0, 62.0, 0.3830683777054204, 0.2562517956330205, 0.15636970886803295], "isController": false}, {"data": ["3. Get Profile Data", 10, 0, 0.0, 55.7, 45, 138, 46.5, 129.10000000000002, 138.0, 138.0, 0.3797660641045116, 0.1958539633335865, 0.12869025805104056], "isController": false}, {"data": ["Get Category People (for Contact Details)", 10, 0, 0.0, 48.49999999999999, 44, 53, 48.5, 52.8, 53.0, 53.0, 0.3831124051796797, 0.1893488166615585, 0.1316948892805149], "isController": false}, {"data": ["11. View People Details", 10, 10, 100.0, 55.0, 51, 64, 53.5, 63.7, 64.0, 64.0, 0.38327392587482273, 0.12576175692767622, 0.13661619428155303], "isController": false}, {"data": ["7. Update Category", 10, 10, 100.0, 53.0, 47, 74, 49.0, 72.80000000000001, 74.0, 74.0, 0.3820293398533008, 0.13356103873777506, 0.17937471347799513], "isController": false}, {"data": ["1. Send OTP", 10, 0, 0.0, 147.1, 86, 624, 96.0, 572.0000000000002, 624.0, 624.0, 0.3726337755254136, 0.13209576222238784, 0.09825304628111492], "isController": false}, {"data": ["14. Get Category List", 10, 0, 0.0, 46.6, 44, 49, 47.0, 48.9, 49.0, 49.0, 0.43708204029896414, 0.35009247016915074, 0.14469805826303597], "isController": false}, {"data": ["4. Update Profile Name", 10, 0, 0.0, 75.2, 44, 138, 62.0, 136.4, 138.0, 138.0, 0.3792763407418645, 0.18819366087005993, 0.14893263341045285], "isController": false}, {"data": ["13. Get Incoming Call History", 10, 0, 0.0, 46.7, 44, 49, 47.0, 48.9, 49.0, 49.0, 0.43710114520500043, 0.16391292945187516, 0.1502535186642189], "isController": false}, {"data": ["5. Buzz Installed Contacts", 10, 0, 0.0, 6425.3, 6299, 6519, 6459.0, 6517.8, 6519.0, 6519.0, 0.3063913229977327, 685.2088870718181, 0.10592043783320057], "isController": false}, {"data": ["12. Remove People from Category", 10, 0, 0.0, 45.9, 40, 51, 46.0, 50.8, 51.0, 51.0, 0.43702473560003496, 0.16132358403985664, 0.17412704309063892], "isController": false}, {"data": ["10. Block People", 10, 0, 0.0, 97.39999999999999, 89, 110, 94.5, 109.8, 110.0, 110.0, 0.38208772734219776, 0.25559579416934125, 0.14813362085434814], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 10, 50.0, 6.666666666666667], "isController": false}, {"data": ["404/Not Found", 10, 50.0, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 150, 20, "400/Bad Request", 10, "404/Not Found", 10, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["7. Update Category", 10, 10, "400/Bad Request", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
