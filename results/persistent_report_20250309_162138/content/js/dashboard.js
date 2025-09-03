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

    var data = {"OkPercent": 62.19512195121951, "KoPercent": 37.80487804878049};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6097560975609756, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Accept Call"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "Read Accept Response"], "isController": false}, {"data": [1.0, 500, 1500, "Read Registration Response"], "isController": false}, {"data": [1.0, 500, 1500, "Trigger Call"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "Open WebSocket - PERSISTENT"], "isController": false}, {"data": [1.0, 500, 1500, "Send Heartbeat"], "isController": false}, {"data": [0.0, 500, 1500, "Read Call Response"], "isController": false}, {"data": [1.0, 500, 1500, "Register User - INITIAL"], "isController": false}, {"data": [0.18181818181818182, 500, 1500, "Listen for Any Messages"], "isController": false}, {"data": [0.25, 500, 1500, "Listen for Messages"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 82, 31, 37.80487804878049, 1251.8658536585363, 0, 6009, 0.0, 6001.0, 6004.7, 6009.0, 0.2787598585803644, 0.004747363254691324, 0.009322095118302964], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Accept Call", 5, 0, 0.0, 0.4, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.0247469623103764, 0.0, 0.0015950190551609791], "isController": false}, {"data": ["Read Accept Response", 3, 2, 66.66666666666667, 4002.0, 0, 6005, 6001.0, 6005.0, 6005.0, 6005.0, 0.025084241243509452, 4.1643759876919994E-4, 0.0], "isController": false}, {"data": ["Read Registration Response", 3, 0, 0.0, 0.6666666666666667, 0, 2, 0.0, 2.0, 2.0, 2.0, 0.41887740854509914, 0.06626771502373639, 0.0], "isController": false}, {"data": ["Trigger Call", 3, 0, 0.0, 0.3333333333333333, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.017310821571591785, 0.0, 8.959702571234031E-4], "isController": false}, {"data": ["Open WebSocket - PERSISTENT", 3, 0, 0.0, 487.6666666666667, 139, 703, 621.0, 703.0, 703.0, 703.0, 0.4098360655737705, 0.05162973872950819, 0.06323642418032786], "isController": false}, {"data": ["Send Heartbeat", 25, 0, 0.0, 0.4, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.091404002032825, 0.0, 0.006159058730727466], "isController": false}, {"data": ["Read Call Response", 2, 2, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.020737637775680974, 0.0, 0.0], "isController": false}, {"data": ["Register User - INITIAL", 3, 0, 0.0, 1.0, 0, 3, 0.0, 3.0, 3.0, 3.0, 0.4185851820845542, 0.0, 0.0163509836751779], "isController": false}, {"data": ["Listen for Any Messages", 11, 9, 81.81818181818181, 2103.181818181818, 0, 6003, 0.0, 6002.6, 6003.0, 6003.0, 0.04556355909386507, 3.1551470253209123E-4, 0.0], "isController": false}, {"data": ["Listen for Messages", 24, 18, 75.0, 2751.291666666667, 0, 6009, 1.0, 6006.5, 6008.75, 6009.0, 0.09193817157961272, 0.0016011367771840103, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 15, 48.38709677419355, 18.29268292682927], "isController": false}, {"data": ["Websocket I/O error/WebSocket I/O error: Read timed out", 16, 51.61290322580645, 19.51219512195122], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 82, 31, "Websocket I/O error/WebSocket I/O error: Read timed out", 16, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 15, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Read Accept Response", 3, 2, "Websocket I/O error/WebSocket I/O error: Read timed out", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Read Call Response", 2, 2, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Listen for Any Messages", 11, 9, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 6, "Websocket I/O error/WebSocket I/O error: Read timed out", 3, "", "", "", "", "", ""], "isController": false}, {"data": ["Listen for Messages", 24, 18, "Websocket I/O error/WebSocket I/O error: Read timed out", 11, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 7, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
