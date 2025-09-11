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

    var data = {"OkPercent": 93.33333333333333, "KoPercent": 6.666666666666667};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8633333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [1.0, 500, 1500, "6. Create Category"], "isController": false}, {"data": [1.0, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [1.0, 500, 1500, "Get Category People (for Contact Details)"], "isController": false}, {"data": [0.0, 500, 1500, "11. View People Details"], "isController": false}, {"data": [1.0, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.95, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [1.0, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.0, 500, 1500, "5. Buzz Installed Contacts"], "isController": false}, {"data": [1.0, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 150, 10, 6.666666666666667, 484.37999999999994, 37, 6423, 55.0, 108.80000000000001, 6294.299999999999, 6418.92, 1.2719301964708176, 190.24006556270191, 0.4698192163214083], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 10, 0, 0.0, 69.4, 55, 153, 59.5, 144.3, 153.0, 153.0, 0.386877127824203, 0.2469741977135562, 0.17307462134401114], "isController": false}, {"data": ["6. Create Category", 10, 0, 0.0, 57.1, 37, 109, 48.0, 107.0, 109.0, 109.0, 0.3868920957944829, 0.20515860157851973, 0.17138110805896234], "isController": false}, {"data": ["2. Verify OTP", 10, 0, 0.0, 57.4, 53, 65, 56.0, 65.0, 65.0, 65.0, 0.3845562221196739, 0.2005400611444393, 0.10928306702814951], "isController": false}, {"data": ["9. Mute People", 10, 0, 0.0, 48.300000000000004, 46, 51, 49.0, 50.9, 51.0, 51.0, 0.38842493688094776, 0.24238626432316954, 0.15855627306273062], "isController": false}, {"data": ["3. Get Profile Data", 10, 0, 0.0, 55.1, 44, 81, 48.0, 80.3, 81.0, 81.0, 0.3844675124951942, 0.1941110390234525, 0.13028342464436754], "isController": false}, {"data": ["Get Category People (for Contact Details)", 10, 0, 0.0, 51.4, 48, 69, 49.0, 67.4, 69.0, 69.0, 0.38840985007379786, 0.19196701672104405, 0.13351588596286804], "isController": false}, {"data": ["11. View People Details", 10, 10, 100.0, 59.9, 56, 64, 60.0, 64.0, 64.0, 64.0, 0.38828919779451737, 0.12096118564106546, 0.13309522307214414], "isController": false}, {"data": ["7. Update Category", 10, 0, 0.0, 53.0, 47, 61, 51.5, 60.9, 61.0, 61.0, 0.386742468190432, 0.2251717378272808, 0.18158767451753877], "isController": false}, {"data": ["1. Send OTP", 10, 0, 0.0, 179.3, 95, 844, 104.0, 772.7000000000003, 844.0, 844.0, 0.373301478273854, 0.1323324576302822, 0.09842910071673884], "isController": false}, {"data": ["14. Get Category List", 10, 0, 0.0, 47.29999999999999, 44, 58, 46.0, 57.1, 58.0, 58.0, 0.40510431436094796, 0.2797751671055297, 0.13411168219566538], "isController": false}, {"data": ["4. Update Profile Name", 10, 0, 0.0, 66.8, 46, 104, 59.0, 102.30000000000001, 104.0, 104.0, 0.3840393256269442, 0.1905570130381351, 0.15080294222128346], "isController": false}, {"data": ["13. Get Incoming Call History", 10, 0, 0.0, 46.0, 43, 48, 46.0, 48.0, 48.0, 48.0, 0.4051863857374392, 0.1519448946515397, 0.13928282009724474], "isController": false}, {"data": ["5. Buzz Installed Contacts", 10, 0, 0.0, 6342.2, 6209, 6423, 6368.5, 6422.2, 6423.0, 6423.0, 0.3103084465959164, 693.9612945971421, 0.1072745997021039], "isController": false}, {"data": ["12. Remove People from Category", 10, 0, 0.0, 45.4, 44, 48, 45.0, 48.0, 48.0, 48.0, 0.4053341980462891, 0.14962531920068098, 0.16150034453406834], "isController": false}, {"data": ["10. Block People", 10, 0, 0.0, 87.10000000000001, 78, 100, 85.5, 99.6, 100.0, 100.0, 0.38774718883288095, 0.25900300504071344, 0.1503277675455603], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 10, 100.0, 6.666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 150, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["11. View People Details", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
