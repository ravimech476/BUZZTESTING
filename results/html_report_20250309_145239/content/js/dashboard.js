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

    var data = {"OkPercent": 75.0, "KoPercent": 25.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7083333333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Accept Call"], "isController": false}, {"data": [1.0, 500, 1500, "Read Accept Response"], "isController": false}, {"data": [1.0, 500, 1500, "Read Registration Response"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "Open WebSocket"], "isController": false}, {"data": [0.0, 500, 1500, "Close WebSocket"], "isController": false}, {"data": [1.0, 500, 1500, "Trigger Call"], "isController": false}, {"data": [1.0, 500, 1500, "Register User"], "isController": false}, {"data": [0.0, 500, 1500, "Read Call Response"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 24, 6, 25.0, 98.66666666666669, 0, 1445, 0.0, 459.5, 1297.25, 1445.0, 0.24354850166932204, 0.011277595821113625, 0.010346054514272956], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Accept Call", 3, 0, 0.0, 0.33333333333333337, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.495949743759299, 0.0, 0.03196551082823607], "isController": false}, {"data": ["Read Accept Response", 3, 0, 0.0, 0.33333333333333337, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.49701789264413515, 0.042874264827700466, 0.0], "isController": false}, {"data": ["Read Registration Response", 3, 0, 0.0, 0.33333333333333337, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.496031746031746, 0.07847377232142858, 0.0], "isController": false}, {"data": ["Open WebSocket", 3, 0, 0.0, 788.0, 65, 1445, 854.0, 1445.0, 1445.0, 1445.0, 0.40053404539385845, 0.05045790220293725, 0.0618011515353805], "isController": false}, {"data": ["Close WebSocket", 3, 3, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.4971826317533974, 0.0, 0.015051427328471992], "isController": false}, {"data": ["Trigger Call", 3, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.496031746031746, 0.0, 0.02567351810515873], "isController": false}, {"data": ["Register User", 3, 0, 0.0, 0.33333333333333337, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.495949743759299, 0.0, 0.019373036865597618], "isController": false}, {"data": ["Read Call Response", 3, 3, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.496113775425831, 0.0, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 3, 50.0, 12.5], "isController": false}, {"data": ["WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;error&quot;,&quot;message&quot;:&quot;You are already in a call&quot;}'", 1, 16.666666666666668, 4.166666666666667], "isController": false}, {"data": ["WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Ping frame with no application data", 1, 16.666666666666668, 4.166666666666667], "isController": false}, {"data": ["WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;call_accepted&quot;,&quot;from&quot;:&quot;385&quot;}'", 1, 16.666666666666668, 4.166666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 24, 6, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 3, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;error&quot;,&quot;message&quot;:&quot;You are already in a call&quot;}'", 1, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Ping frame with no application data", 1, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;call_accepted&quot;,&quot;from&quot;:&quot;385&quot;}'", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Close WebSocket", 3, 3, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;error&quot;,&quot;message&quot;:&quot;You are already in a call&quot;}'", 1, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Ping frame with no application data", 1, "WebSocket error: unsuccesful close./WebSocket error: received not a close frame, but Text frame with text '{&quot;type&quot;:&quot;call_accepted&quot;,&quot;from&quot;:&quot;385&quot;}'", 1, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Read Call Response", 3, 3, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 3, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
