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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9911538461538462, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "3. Get Customer Profile"], "isController": false}, {"data": [1.0, 500, 1500, "8. Get Category People"], "isController": false}, {"data": [1.0, 500, 1500, "12. Get Incoming Call History"], "isController": false}, {"data": [0.9, 500, 1500, "6. Get Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "9A. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP and Get JWT"], "isController": false}, {"data": [0.985, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "11. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "5. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "9B. Block People"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "10. Update Category"], "isController": false}, {"data": [1.0, 500, 1500, "7. Add People to Category"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1300, 0, 0.0, 84.18538461538465, 31, 779, 39.5, 135.9000000000001, 459.95000000000005, 534.9200000000001, 16.586075351816177, 174.26936543908442, 5.939439693667946], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3. Get Customer Profile", 100, 0, 0.0, 41.080000000000005, 33, 236, 37.0, 46.0, 56.64999999999992, 234.6299999999993, 1.7071255420123597, 0.864232305643757, 0.5751546015568985], "isController": false}, {"data": ["8. Get Category People", 100, 0, 0.0, 43.339999999999996, 33, 203, 38.0, 45.900000000000006, 53.89999999999998, 202.86999999999995, 1.714324898854831, 0.8303761228828087, 0.5842767477542343], "isController": false}, {"data": ["12. Get Incoming Call History", 100, 0, 0.0, 39.06, 31, 104, 36.5, 46.70000000000002, 51.849999999999966, 103.81999999999991, 1.7169150470434722, 0.6735538209944372, 0.5868361977199368], "isController": false}, {"data": ["6. Get Buzz Installed Contacts", 100, 0, 0.0, 483.9300000000002, 410, 779, 469.5, 541.3000000000001, 645.7999999999997, 778.2599999999996, 1.6938243165418883, 220.34411364290796, 0.5822521088112741], "isController": false}, {"data": ["9A. Mute People", 100, 0, 0.0, 40.25000000000001, 34, 124, 38.0, 45.0, 52.799999999999955, 123.6199999999998, 1.714560043892737, 1.0649025272615047, 0.6965400178314245], "isController": false}, {"data": ["2. Verify OTP and Get JWT", 100, 0, 0.0, 47.24999999999999, 35, 229, 40.0, 47.80000000000001, 106.74999999999949, 228.5999999999998, 1.7084379751593117, 0.8875869167819862, 0.48550336989390597], "isController": false}, {"data": ["1. Send OTP", 100, 0, 0.0, 129.43999999999994, 93, 635, 105.0, 135.9, 342.0999999999998, 634.1999999999996, 1.689817161783095, 0.5990269821555309, 0.44555725945452707], "isController": false}, {"data": ["11. Get Category List", 100, 0, 0.0, 42.16, 32, 279, 37.0, 43.0, 46.94999999999999, 278.10999999999956, 1.717150903221375, 1.1969749167181813, 0.5651170452984409], "isController": false}, {"data": ["5. Create Category", 100, 0, 0.0, 43.87000000000001, 35, 236, 39.0, 44.0, 50.94999999999999, 235.2199999999996, 1.7071838295547663, 0.9169444397022671, 0.6618671682941819], "isController": false}, {"data": ["9B. Block People", 100, 0, 0.0, 41.18999999999999, 33, 115, 38.0, 46.0, 51.94999999999999, 115.0, 1.71505994134495, 1.1405818555233505, 0.6615709734680227], "isController": false}, {"data": ["4. Update Profile Name", 100, 0, 0.0, 43.05000000000001, 33, 204, 39.0, 44.900000000000006, 56.74999999999994, 203.34999999999968, 1.707008978867229, 0.8518374884776894, 0.6718013852377863], "isController": false}, {"data": ["10. Update Category", 100, 0, 0.0, 47.5, 35, 312, 39.0, 49.80000000000001, 112.0999999999998, 310.91999999999945, 1.7170034855170757, 1.0127637746604625, 0.6958559047749867], "isController": false}, {"data": ["7. Add People to Category", 100, 0, 0.0, 52.289999999999985, 39, 298, 45.0, 51.900000000000006, 61.0, 297.2999999999996, 1.7133556069562237, 1.0925988392015762, 0.7479198792084297], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1300, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
