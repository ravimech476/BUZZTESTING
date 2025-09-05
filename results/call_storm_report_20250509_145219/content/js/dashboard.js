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

    var data = {"OkPercent": 83.23379783233798, "KoPercent": 16.766202167662023};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6661136916611369, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "05 - Read Call Response (Ping)"], "isController": false}, {"data": [1.0, 500, 1500, "01 - WebSocket Connect"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Response (Unavailable)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register User"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Response (Busy)"], "isController": false}, {"data": [0.6514360313315927, 500, 1500, "07 - Listen for Incoming Call (Ping)"], "isController": false}, {"data": [0.996875, 500, 1500, "05 - Read Call Response"], "isController": false}, {"data": [0.333694474539545, 500, 1500, "07 - Listen for Incoming Call"], "isController": false}, {"data": [1.0, 500, 1500, "04 - Initiate Call"], "isController": false}, {"data": [0.4484011627906977, 500, 1500, "03 - Random Activity Decision FIXED"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4521, 758, 16.766202167662023, 1236.2525989825265, 0, 8015, 7.0, 8000.0, 8001.0, 8009.0, 15.245681064803419, 0.5061252183494468, 0.3012316089066341], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["05 - Read Call Response (Ping)", 144, 0, 0.0, 0.09722222222222222, 0, 1, 0.0, 0.5, 1.0, 1.0, 0.7259711123994858, 0.019141816440220817, 0.0], "isController": false}, {"data": ["01 - WebSocket Connect", 120, 0, 0.0, 68.1083333333333, 52, 281, 57.0, 85.50000000000003, 151.84999999999997, 269.86999999999955, 4.033613445378151, 0.508140756302521, 0.6223739495798319], "isController": false}, {"data": ["05 - Call Response (Unavailable)", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["02 - Register User", 120, 0, 0.0, 0.25833333333333325, 0, 1, 0.0, 1.0, 1.0, 1.0, 4.0431266846361185, 0.0, 0.3774637803234501], "isController": false}, {"data": ["05 - Call Response (Busy)", 7, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.21383839926683978, 0.0116942874599053, 0.0], "isController": false}, {"data": ["07 - Listen for Incoming Call (Ping)", 383, 0, 0.0, 1624.6031331592703, 0, 7998, 0.0, 5913.600000000003, 7012.399999999997, 7900.839999999998, 1.5251611772810716, 0.04021421072909075, 0.0], "isController": false}, {"data": ["05 - Read Call Response", 640, 0, 0.0, 25.084374999999984, 0, 8011, 0.0, 0.0, 1.0, 1.0, 2.3536161105022764, 0.14569679563440985, 0.0], "isController": false}, {"data": ["07 - Listen for Incoming Call", 923, 0, 0.0, 5331.751895991331, 0, 8015, 8000.0, 8005.0, 8009.0, 8013.76, 3.2986787415701424, 0.0835565789967442, 0.0], "isController": false}, {"data": ["04 - Initiate Call", 807, 0, 0.0, 0.21313506815365554, 0, 1, 0.0, 1.0, 1.0, 1.0, 2.8811344600818285, 0.0, 0.21281613935122706], "isController": false}, {"data": ["03 - Random Activity Decision FIXED", 1376, 758, 55.08720930232558, 15.42441860465114, 7, 1636, 12.0, 20.0, 26.299999999999727, 58.15000000000009, 4.751135127669492, 0.19900139517117552, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Assertion failed", 758, 100.0, 16.766202167662023], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4521, 758, "Assertion failed", 758, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["03 - Random Activity Decision FIXED", 1376, 758, "Assertion failed", 758, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
