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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6359489051094891, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Receiver Target"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.2172202797202797, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.9259259259259259, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [0.8970588235294118, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}, {"data": [0.24583333333333332, 500, 1500, "04 - Call Received (Ping Handled)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2740, 0, 0.0, 2079.889051094888, 0, 6015, 9.0, 6001.0, 6002.0, 6012.59, 22.477809315985496, 0.5686026303753958, 0.4349259344903116], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["01 - Connect", 120, 0, 0.0, 56.775, 49, 99, 54.0, 69.0, 72.94999999999999, 96.4799999999999, 6.105938024729048, 0.7692050831934056, 0.942127156159365], "isController": false}, {"data": ["Select Receiver Target", 300, 0, 0.0, 7.933333333333331, 4, 135, 7.0, 10.0, 12.0, 23.99000000000001, 5.2797381249890005, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 300, 0, 0.0, 0.1699999999999999, 0, 1, 0.0, 1.0, 1.0, 1.0, 5.213854950555276, 0.0, 0.2698577269330367], "isController": false}, {"data": ["05 - Call Accepted", 95, 0, 0.0, 0.17894736842105263, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.964633490043967, 0.0, 0.06970984205395855], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 20, 0, 0.0, 0.19999999999999998, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.5103472913317513, 0.03289347776161678, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.19166666666666676, 0, 1, 0.0, 1.0, 1.0, 1.0, 6.131521128199887, 0.0, 0.2395125440703081], "isController": false}, {"data": ["04 - Call Received", 1144, 0, 0.0, 4561.475524475522, 0, 6015, 6000.0, 6002.0, 6008.0, 6013.0, 9.46933640148662, 0.20559295614637738, 0.0], "isController": false}, {"data": ["Caller - Read Response", 108, 0, 0.0, 444.5185185185184, 0, 6001, 0.0, 1.0, 6000.0, 6001.0, 1.958295557570263, 0.2630432626926564, 0.0], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 87, 0, 0.0, 0.02298850574712644, 0, 1, 0.0, 0.0, 0.0, 1.0, 1.9183277473981302, 0.10490854868583525, 0.0], "isController": false}, {"data": ["07 - Call Ended", 93, 0, 0.0, 0.20430107526881727, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.0598290598290598, 0.0, 0.06727430555555555], "isController": false}, {"data": ["06 - Call Rejected", 21, 0, 0.0, 0.19047619047619047, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.28556276261575486, 0.0, 0.020636371517154164], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 34, 0, 0.0, 223.61764705882348, 0, 2661, 0.0, 1355.0, 2337.0, 2661.0, 1.2705055864877994, 0.04714766824857068, 0.0], "isController": false}, {"data": ["Process Call Decision", 127, 0, 0.0, 10.69291338582677, 5, 51, 9.0, 14.200000000000003, 25.799999999999955, 48.47999999999999, 1.2884375412147837, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 51, 0, 0.0, 0.05882352941176472, 0, 1, 0.0, 0.0, 1.0, 1.0, 1.1365409043299979, 0.06881400006685535, 0.0], "isController": false}, {"data": ["04 - Call Received (Ping Handled)", 120, 0, 0.0, 3452.358333333333, 0, 5989, 3951.0, 5986.0, 5988.0, 5989.0, 1.6647013941874178, 0.06177602829992371, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2740, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
