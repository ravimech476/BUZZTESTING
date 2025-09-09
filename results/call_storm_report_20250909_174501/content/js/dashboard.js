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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9536721789883269, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "06 - Call Accepted"], "isController": false}, {"data": [0.8148148148148148, 500, 1500, "05 - Call Received"], "isController": false}, {"data": [0.9958333333333333, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "08 - Call Rejected"], "isController": false}, {"data": [0.9986474301172227, 500, 1500, "Random Activity Decision"], "isController": false}, {"data": [0.946, 500, 1500, "05 - Call Received (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.7962962962962963, 500, 1500, "Timeout Behavior"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [0.9794520547945206, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4112, 0, 0.0, 267.5751459143976, 0, 6015, 0.0, 12.0, 193.54999999999518, 6001.0, 13.513469103385269, 0.38526991918045017, 0.27943277710498904], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["06 - Call Accepted", 302, 0, 0.0, 0.23178807947019875, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.2020761686409374, 0.0, 0.08686878562444275], "isController": false}, {"data": ["05 - Call Received", 810, 0, 0.0, 1096.672839506174, 0, 6015, 0.0, 6001.0, 6001.0, 6002.0, 2.774856375489454, 0.17068524821261566, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 85.66666666666669, 49, 681, 54.0, 160.50000000000003, 266.34999999999985, 641.5199999999985, 4.037141703673799, 0.5085852341542189, 0.6229183488090432], "isController": false}, {"data": ["08 - Call Rejected", 93, 0, 0.0, 0.18279569892473116, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.3773845223651053, 0.0, 0.027271928374040817], "isController": false}, {"data": ["Random Activity Decision", 1109, 0, 0.0, 11.0775473399459, 3, 1536, 7.0, 12.0, 17.5, 41.90000000000009, 3.7826075092774505, 0.0, 0.0], "isController": false}, {"data": ["05 - Call Received (Ping Handled)", 250, 0, 0.0, 199.70400000000004, 0, 5945, 0.0, 1.0, 1589.0999999999958, 5373.650000000005, 0.9133854815550936, 0.03389516435458355, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 643, 0, 0.0, 0.20217729393468123, 0, 1, 0.0, 1.0, 1.0, 1.0, 2.267893610042219, 0.0, 0.11738121223851326], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.25, 0, 1, 0.0, 1.0, 1.0, 1.0, 4.132658332472363, 0.0, 0.16143196611220167], "isController": false}, {"data": ["Timeout Behavior", 108, 0, 0.0, 1221.5648148148152, 0, 6005, 5.0, 6001.0, 6001.0, 6004.73, 0.43805745853664474, 0.0185851200399119, 0.0], "isController": false}, {"data": ["Caller - Read Response", 200, 0, 0.0, 0.07500000000000001, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.7376616862208485, 0.08051245933639954, 0.0], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 99, 0, 0.0, 0.05050505050505051, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.4046282937356183, 0.022128109813666627, 0.0], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 146, 0, 0.0, 49.76027397260274, 0, 3206, 0.0, 1.0, 1.0, 2287.1500000000024, 0.5820628946864834, 0.02159999023250622, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 112, 0, 0.0, 0.10714285714285716, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.4607953657151791, 0.02374529690444256, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4112, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
