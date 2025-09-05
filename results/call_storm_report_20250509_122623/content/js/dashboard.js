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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5152818991097923, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9333333333333333, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Receiver Target"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.13821138211382114, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}, {"data": [0.2050561797752809, 500, 1500, "04 - Call Received (Ping Handled)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3370, 0, 0.0, 2798.5676557863503, 0, 6002, 66.0, 6001.0, 6001.0, 6002.0, 15.564957138634348, 0.32667249679001625, 0.24101489611430313], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["01 - Connect", 120, 0, 0.0, 200.29999999999995, 50, 2398, 55.0, 477.8000000000004, 1476.6999999999994, 2343.189999999998, 5.9880239520958085, 0.7543506736526946, 0.923933383233533], "isController": false}, {"data": ["Select Receiver Target", 300, 0, 0.0, 8.559999999999993, 3, 120, 7.0, 12.0, 14.0, 37.950000000000045, 1.692944934144442, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 300, 0, 0.0, 0.20000000000000007, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.6961034849272936, 0.0, 0.08778660615346344], "isController": false}, {"data": ["05 - Call Accepted", 83, 0, 0.0, 0.19277108433734938, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.5999147109206161, 0.0, 0.04335321153137264], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 33, 0, 0.0, 0.060606060606060635, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.24716694254492075, 0.015930681843715593, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.32499999999999984, 0, 1, 0.0, 1.0, 1.0, 1.0, 6.019563581640331, 0.0, 0.23513920240782546], "isController": false}, {"data": ["04 - Call Received", 1722, 0, 0.0, 5078.25493612078, 0, 6002, 6000.0, 6001.0, 6002.0, 6002.0, 9.375867757795527, 0.14131371894447983, 0.0], "isController": false}, {"data": ["Caller - Read Response", 88, 0, 0.0, 0.0340909090909091, 0, 1, 0.0, 0.0, 0.0, 1.0, 0.49976147747665883, 0.07142698051782104, 0.0], "isController": false}, {"data": ["07 - Call Ended", 81, 0, 0.0, 0.17283950617283958, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.6159133767260783, 0.0, 0.03909606395233895], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 53, 0, 0.0, 0.03773584905660377, 0, 1, 0.0, 0.0, 0.29999999999999716, 1.0, 0.4150807449524615, 0.022699728239587737, 0.0], "isController": false}, {"data": ["06 - Call Rejected", 32, 0, 0.0, 0.0625, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.21824381926683717, 0.0, 0.01577152600170503], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 93, 0, 0.0, 0.07526881720430108, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.6810492552396854, 0.0252733122061602, 0.0], "isController": false}, {"data": ["Process Call Decision", 134, 0, 0.0, 11.492537313432836, 5, 43, 10.0, 17.0, 26.5, 41.25000000000003, 0.9116948679743365, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 33, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.24184151319501954, 0.014642747869229698, 0.0], "isController": false}, {"data": ["04 - Call Received (Ping Handled)", 178, 0, 0.0, 3697.3539325842685, 0, 6000, 4453.0, 5991.0, 5995.05, 5999.21, 1.376004947433519, 0.05106268359616573, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3370, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
