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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9443174735092458, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "06 - Call Accepted"], "isController": false}, {"data": [0.7497013142174432, 500, 1500, "05 - Call Received"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "08 - Call Rejected"], "isController": false}, {"data": [0.9982316534040672, 500, 1500, "Random Activity Decision"], "isController": false}, {"data": [0.9219409282700421, 500, 1500, "05 - Call Received (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [0.96875, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.8734693877551021, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "09 - Timeout (No Response)"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended by Receiver"], "isController": false}, {"data": [0.9712230215827338, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4813, 0, 0.0, 322.24683149802667, 0, 6016, 0.0, 14.0, 5478.000000000031, 6001.0, 15.787315697111836, 0.3751148049136503, 0.3314991881652535], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["06 - Call Accepted", 289, 0, 0.0, 0.21453287197231824, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.160922310596931, 0.0, 0.08389477635173134], "isController": false}, {"data": ["05 - Call Received", 837, 0, 0.0, 1494.808841099163, 0, 6015, 0.0, 6001.0, 6001.0, 6001.0, 2.8583917875023053, 0.16167765208044477, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 104.48333333333336, 50, 1302, 54.0, 193.70000000000013, 286.5999999999997, 1261.4699999999984, 4.014452027298274, 0.5057268667201927, 0.6194174026495384], "isController": false}, {"data": ["08 - Call Rejected", 79, 0, 0.0, 0.2278481012658228, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.3124394401401627, 0.0, 0.022578631416378947], "isController": false}, {"data": ["Random Activity Decision", 1131, 0, 0.0, 11.80990274093725, 3, 1586, 7.0, 11.0, 16.0, 38.680000000000064, 3.8634042364225762, 0.0, 0.0], "isController": false}, {"data": ["05 - Call Received (Ping Handled)", 237, 0, 0.0, 289.9113924050633, 0, 5989, 0.0, 40.20000000000334, 3091.4, 5725.840000000002, 0.8365010959223219, 0.031042032856492416, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 652, 0, 0.0, 0.21932515337423317, 0, 6, 0.0, 1.0, 1.0, 1.0, 2.3010492361010626, 0.0, 0.11909727491538703], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 32, 0, 0.0, 78.68749999999997, 0, 2518, 0.0, 0.0, 881.2999999999946, 2518.0, 0.13132676973082116, 0.008464420705306832, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.31666666666666676, 0, 2, 0.0, 1.0, 1.0, 1.789999999999992, 4.198299688626107, 0.0, 0.1639960815869573], "isController": false}, {"data": ["Caller - Read Response", 245, 0, 0.0, 757.7102040816325, 0, 6016, 0.0, 6000.0, 6000.7, 6001.0, 0.8874142920788314, 0.08473377458047036, 0.0], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 117, 0, 0.0, 0.042735042735042736, 0, 1, 0.0, 0.0, 0.09999999999999432, 1.0, 0.46643278583957903, 0.025508042975601976, 0.0], "isController": false}, {"data": ["09 - Timeout (No Response)", 28, 0, 0.0, 6.5, 4, 12, 6.0, 8.200000000000003, 11.099999999999994, 12.0, 0.12965964343598058, 0.005191450567260941, 0.0], "isController": false}, {"data": ["07 - Call Ended by Receiver", 276, 0, 0.0, 0.1847826086956522, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.1613522179302682, 0.0, 0.07371864664596431], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 139, 0, 0.0, 95.07194244604318, 0, 4402, 0.0, 1.0, 1.0, 4324.399999999999, 0.5252338991248621, 0.01949110172533668, 0.0], "isController": false}, {"data": ["Process Call Decision", 414, 0, 0.0, 8.070048309178738, 4, 33, 7.0, 11.0, 14.25, 22.850000000000023, 1.5988259828531708, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 97, 0, 0.0, 0.030927835051546393, 0, 1, 0.0, 0.0, 0.0, 1.0, 0.3794131222179631, 0.01944278342551377, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4813, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
