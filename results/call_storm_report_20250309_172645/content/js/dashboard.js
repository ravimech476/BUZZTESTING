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

    var data = {"OkPercent": 84.78757423481042, "KoPercent": 15.212425765189584};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8380539058931019, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "RECEIVER - Reject Storm Call"], "isController": false}, {"data": [1.0, 500, 1500, "RECEIVER - Accept Storm Call"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "Heavy Caller - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Heavy Caller - Register"], "isController": false}, {"data": [1.0, 500, 1500, "Select Random Target"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "Regular Caller - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Regular Caller - Register"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "Receiver - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "HEAVY CALLER - Storm Call"], "isController": false}, {"data": [1.0, 500, 1500, "Receiver - Register"], "isController": false}, {"data": [1.0, 500, 1500, "REGULAR CALLER - Storm Call"], "isController": false}, {"data": [0.78125, 500, 1500, "Regular Caller - Read Response"], "isController": false}, {"data": [0.8583333333333333, 500, 1500, "Heavy Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Process Storm Call"], "isController": false}, {"data": [0.1869009584664537, 500, 1500, "RECEIVER - Listen for Storm Calls"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2189, 333, 15.212425765189584, 637.0118775696666, 0, 6016, 0.0, 4312.0, 6001.0, 6002.0, 18.88469037389789, 0.5331185054221232, 0.45324213964663457], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["RECEIVER - Reject Storm Call", 10, 0, 0.0, 0.09999999999999999, 0, 1, 0.0, 0.9000000000000004, 1.0, 1.0, 0.16879916275615273, 0.0, 0.013022591657945377], "isController": false}, {"data": ["RECEIVER - Accept Storm Call", 16, 0, 0.0, 0.3125, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.388679703631726, 0.0, 0.029986031823150735], "isController": false}, {"data": ["Heavy Caller - Connect", 24, 0, 0.0, 129.66666666666666, 51, 645, 57.5, 441.5, 625.75, 645.0, 2.5067892208063505, 0.3157966889492375, 0.38678974305410485], "isController": false}, {"data": ["Heavy Caller - Register", 24, 0, 0.0, 0.20833333333333331, 0, 1, 0.0, 1.0, 1.0, 1.0, 2.6857654431512983, 0.0, 0.10491271262309758], "isController": false}, {"data": ["Select Random Target", 528, 0, 0.0, 1.475378787878789, 0, 296, 1.0, 1.0, 2.0, 2.0, 5.057422821620483, 0.0, 0.0], "isController": false}, {"data": ["Regular Caller - Connect", 72, 0, 0.0, 100.30555555555556, 51, 681, 59.0, 172.60000000000005, 423.0499999999994, 681.0, 4.877057508636455, 0.6143949400528348, 0.7525147327778907], "isController": false}, {"data": ["Regular Caller - Register", 72, 0, 0.0, 0.25, 0, 1, 0.0, 1.0, 1.0, 1.0, 5.096623486939902, 0.0, 0.19908685495858994], "isController": false}, {"data": ["Receiver - Connect", 24, 0, 0.0, 123.91666666666666, 54, 646, 61.5, 434.5, 622.5, 646.0, 1.2493492972410203, 0.15738872982821447, 0.19277069234773556], "isController": false}, {"data": ["HEAVY CALLER - Storm Call", 240, 0, 0.0, 0.28750000000000014, 0, 1, 0.0, 1.0, 1.0, 1.0, 2.294498938794241, 0.0, 0.11875824585556129], "isController": false}, {"data": ["Receiver - Register", 24, 0, 0.0, 0.2916666666666667, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.2928944674890912, 0.0, 0.05050369013629263], "isController": false}, {"data": ["REGULAR CALLER - Storm Call", 288, 0, 0.0, 0.22222222222222227, 0, 1, 0.0, 1.0, 1.0, 1.0, 3.0974736230761786, 0.0, 0.16031845900687253], "isController": false}, {"data": ["Regular Caller - Read Response", 288, 63, 21.875, 0.05555555555555556, 0, 1, 0.0, 0.0, 1.0, 1.0, 3.0997739748143367, 0.2553294182542245, 0.0], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 33, 13.75, 125.76666666666658, 0, 6001, 0.0, 1.0, 1.0, 6000.0, 2.2839306446394243, 0.14341478559601073, 0.0], "isController": false}, {"data": ["Process Storm Call", 26, 0, 0.0, 7.769230769230771, 0, 179, 1.0, 2.0, 117.04999999999976, 179.0, 0.398253810216742, 0.0, 0.0], "isController": false}, {"data": ["RECEIVER - Listen for Storm Calls", 313, 237, 75.71884984025559, 4312.335463258787, 0, 6016, 6000.0, 6001.6, 6005.0, 6011.86, 3.4913942152171247, 0.0879624110419525, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 129, 38.73873873873874, 5.8931018730013704], "isController": false}, {"data": ["Websocket I/O error/WebSocket I/O error: Read timed out", 204, 61.26126126126126, 9.319323892188214], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2189, 333, "Websocket I/O error/WebSocket I/O error: Read timed out", 204, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 129, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Regular Caller - Read Response", 288, 63, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 63, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 33, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 29, "Websocket I/O error/WebSocket I/O error: Read timed out", 4, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["RECEIVER - Listen for Storm Calls", 313, 237, "Websocket I/O error/WebSocket I/O error: Read timed out", 200, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 37, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
