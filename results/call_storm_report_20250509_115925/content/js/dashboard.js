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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6840846994535519, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Receiver Target"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}, {"data": [0.96875, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.2877397831526272, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [0.8387096774193549, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}, {"data": [0.5169491525423728, 500, 1500, "04 - Call Received (Ping Handled)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2928, 0, 0.0, 1802.1775956284157, 0, 6009, 11.0, 6001.0, 6001.0, 6002.0, 23.854720839477608, 0.6128865928199572, 0.47556333405978346], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["01 - Connect", 120, 0, 0.0, 69.375, 50, 290, 55.0, 75.60000000000002, 257.0499999999989, 289.58, 6.120263171316366, 0.7710097159177844, 0.944337481511705], "isController": false}, {"data": ["Select Receiver Target", 300, 0, 0.0, 12.889999999999999, 5, 198, 11.0, 17.0, 21.0, 74.99000000000001, 5.257992148065059, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 300, 0, 0.0, 0.3100000000000003, 0, 1, 0.0, 1.0, 1.0, 1.0, 5.180273518441774, 0.0, 0.26811962546622464], "isController": false}, {"data": ["05 - Call Accepted", 126, 0, 0.0, 0.246031746031746, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.2576356449874238, 0.0, 0.09088382590729428], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 32, 0, 0.0, 78.03125000000001, 0, 1362, 0.0, 0.6999999999999993, 1213.7999999999995, 1362.0, 0.7732830699337876, 0.04984051036682616, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.3083333333333335, 0, 1, 0.0, 1.0, 1.0, 1.0, 6.1747452917567145, 0.0, 0.24120098795924666], "isController": false}, {"data": ["04 - Call Received", 1199, 0, 0.0, 4160.027522935783, 0, 6009, 6000.0, 6001.0, 6002.0, 6003.0, 9.862873970732188, 0.26106038748180016, 0.0], "isController": false}, {"data": ["Caller - Read Response", 96, 0, 0.0, 500.10416666666663, 0, 6001, 0.0, 1.0, 6000.15, 6001.0, 1.5297585849733089, 0.2036223458290176, 0.0], "isController": false}, {"data": ["07 - Call Ended", 125, 0, 0.0, 0.17600000000000002, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.294639158173834, 0.0, 0.08217924343876874], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 91, 0, 0.0, 0.0879120879120879, 0, 1, 0.0, 0.0, 1.0, 1.0, 2.2256462934429035, 0.12171503167265879, 0.0], "isController": false}, {"data": ["06 - Call Rejected", 36, 0, 0.0, 0.3055555555555556, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.38768037906525954, 0.0, 0.028015964893387896], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 31, 0, 0.0, 514.9032258064515, 0, 4979, 0.0, 2324.4, 4553.5999999999985, 4979.0, 1.5066096423017106, 0.055909342194790046, 0.0], "isController": false}, {"data": ["Process Call Decision", 184, 0, 0.0, 15.038043478260864, 7, 95, 12.0, 21.5, 29.75, 66.95000000000019, 1.7204783677896527, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 50, 0, 0.0, 0.05999999999999999, 0, 1, 0.0, 0.0, 1.0, 1.0, 1.0856820254483865, 0.06573465388457028, 0.0], "isController": false}, {"data": ["04 - Call Received (Ping Handled)", 118, 0, 0.0, 1756.5254237288127, 0, 5996, 715.0, 5267.500000000001, 5782.3, 5995.62, 1.5813242920893582, 0.058681956151753534, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2928, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
