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

    var data = {"OkPercent": 75.75757575757575, "KoPercent": 24.242424242424242};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7424242424242424, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Receiver - Register User"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Registration Response"], "isController": false}, {"data": [1.0, 500, 1500, "Monitor - Listen for Messages/Pings"], "isController": false}, {"data": [1.0, 500, 1500, "Monitor - Register User"], "isController": false}, {"data": [1.0, 500, 1500, "Receiver - Read Registration Response"], "isController": false}, {"data": [1.0, 500, 1500, "Monitor - Open WebSocket"], "isController": false}, {"data": [0.7, 500, 1500, "CALLER - Listen for Response (Accept/Reject/Timeout)"], "isController": false}, {"data": [0.06666666666666667, 500, 1500, "RECEIVER - Listen for Incoming Call"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Register User"], "isController": false}, {"data": [1.0, 500, 1500, "RECEIVER - Accept Call"], "isController": false}, {"data": [1.0, 500, 1500, "CALLER - Log Call Result"], "isController": false}, {"data": [1.0, 500, 1500, "RECEIVER - Process Incoming Call"], "isController": false}, {"data": [1.0, 500, 1500, "Send Heartbeat"], "isController": false}, {"data": [1.0, 500, 1500, "Receiver - Open WebSocket"], "isController": false}, {"data": [1.0, 500, 1500, "CALLER - Trigger Call"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Open WebSocket"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 16, 24.242424242424242, 1072.3030303030303, 0, 6011, 1.0, 6001.0, 6001.65, 6011.0, 0.6336466363924385, 0.021526584356608647, 0.016885617781468715], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Receiver - Register User", 2, 0, 0.0, 0.5, 0, 1, 0.5, 1.0, 1.0, 1.0, 0.5385029617662898, 0.0, 0.021035271943995692], "isController": false}, {"data": ["Caller - Read Registration Response", 2, 0, 0.0, 1.0, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.9009009009009009, 0.14252533783783783, 0.0], "isController": false}, {"data": ["Monitor - Listen for Messages/Pings", 2, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.09998000399920015, 0.014645508398320335, 0.0], "isController": false}, {"data": ["Monitor - Register User", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 39.0625], "isController": false}, {"data": ["Receiver - Read Registration Response", 2, 0, 0.0, 1.0, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.5403944879762226, 0.08549209673061335, 0.0], "isController": false}, {"data": ["Monitor - Open WebSocket", 1, 0, 0.0, 102.0, 102, 102, 102.0, 102.0, 102.0, 102.0, 9.803921568627452, 1.2350643382352942, 1.512714460784314], "isController": false}, {"data": ["CALLER - Listen for Response (Accept/Reject/Timeout)", 10, 3, 30.0, 0.09999999999999999, 0, 1, 0.0, 0.9000000000000004, 1.0, 1.0, 0.12381447638857936, 0.006214906334348611, 0.0], "isController": false}, {"data": ["RECEIVER - Listen for Incoming Call", 15, 13, 86.66666666666667, 4638.666666666667, 0, 6011, 6000.0, 6009.8, 6011.0, 6011.0, 0.26266482217591536, 0.003232008554117709, 0.0], "isController": false}, {"data": ["Caller - Register User", 2, 0, 0.0, 0.5, 0, 1, 0.5, 1.0, 1.0, 1.0, 0.8956560680698612, 0.0, 0.03498656515897895], "isController": false}, {"data": ["RECEIVER - Accept Call", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, Infinity], "isController": false}, {"data": ["CALLER - Log Call Result", 10, 0, 0.0, 16.5, 0, 137, 1.5, 125.10000000000004, 137.0, 137.0, 0.12056181807221654, 0.0, 0.0], "isController": false}, {"data": ["RECEIVER - Process Incoming Call", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 0.0, 0.0], "isController": false}, {"data": ["Send Heartbeat", 3, 0, 0.0, 0.33333333333333337, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.07498687729647312, 0.0, 0.005052826692828755], "isController": false}, {"data": ["Receiver - Open WebSocket", 2, 0, 0.0, 198.0, 61, 335, 198.0, 335.0, 335.0, 335.0, 0.49578582052553294, 0.06245739340604859, 0.0764982027764006], "isController": false}, {"data": ["CALLER - Trigger Call", 10, 0, 0.0, 0.39999999999999997, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.1266415916315236, 0.0, 0.0065546917543659695], "isController": false}, {"data": ["Caller - Open WebSocket", 2, 0, 0.0, 207.5, 75, 340, 207.5, 340.0, 340.0, 340.0, 0.7818608287724785, 0.09849613956215794, 0.12063868256450352], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 5, 31.25, 7.575757575757576], "isController": false}, {"data": ["Websocket I/O error/WebSocket I/O error: Read timed out", 11, 68.75, 16.666666666666668], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 66, 16, "Websocket I/O error/WebSocket I/O error: Read timed out", 11, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 5, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["CALLER - Listen for Response (Accept/Reject/Timeout)", 10, 3, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["RECEIVER - Listen for Incoming Call", 15, 13, "Websocket I/O error/WebSocket I/O error: Read timed out", 11, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 2, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
