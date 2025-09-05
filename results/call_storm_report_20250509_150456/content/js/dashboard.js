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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.962133718530747, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "06 - Call Accepted"], "isController": false}, {"data": [0.8234932349323493, 500, 1500, "05 - Call Received"], "isController": false}, {"data": [1.0, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "08 - Call Rejected"], "isController": false}, {"data": [0.9986301369863013, 500, 1500, "Random Activity Decision"], "isController": false}, {"data": [0.9617117117117117, 500, 1500, "05 - Call Received (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [0.9767441860465116, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.8858447488584474, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended by Receiver"], "isController": false}, {"data": [1.0, 500, 1500, "09 - Timeout (No Response)"], "isController": false}, {"data": [0.9760479041916168, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4846, 0, 0.0, 220.1574494428392, 0, 6015, 0.0, 14.0, 60.0, 6004.0, 15.99419113157417, 0.3898127691964949, 0.34230049032955423], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["06 - Call Accepted", 299, 0, 0.0, 0.21739130434782605, 0, 4, 0.0, 1.0, 1.0, 1.0, 1.2038200148162463, 0.0, 0.0869948057582053], "isController": false}, {"data": ["05 - Call Received", 813, 0, 0.0, 1029.7109471094718, 0, 6015, 0.0, 6001.0, 6003.0, 6012.0, 2.78097987637809, 0.17359411183951726, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 71.31666666666662, 53, 281, 58.0, 96.70000000000007, 160.89999999999998, 280.15999999999997, 4.036462713175687, 0.5084996972652965, 0.6228135826970298], "isController": false}, {"data": ["08 - Call Rejected", 89, 0, 0.0, 0.21348314606741575, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.35545970125409376, 0.0, 0.02568751747344037], "isController": false}, {"data": ["Random Activity Decision", 1095, 0, 0.0, 13.536073059360705, 3, 1338, 8.0, 14.0, 19.0, 59.279999999999745, 3.7366402315010716, 0.0, 0.0], "isController": false}, {"data": ["05 - Call Received (Ping Handled)", 222, 0, 0.0, 142.02702702702703, 0, 5738, 0.0, 1.0, 314.0999999999985, 4672.680000000005, 0.8147117865308324, 0.030233445203292613, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 663, 0, 0.0, 0.26244343891402716, 0, 4, 0.0, 1.0, 1.0, 1.0, 2.3393835036413932, 0.0, 0.12108137274706429], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 43, 0, 0.0, 130.3953488372093, 0, 5605, 0.0, 0.0, 1.0, 5605.0, 0.17740444913855702, 0.011434271135883557, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.20000000000000012, 0, 1, 0.0, 1.0, 1.0, 1.0, 4.054191019966891, 0.0, 0.15836683671745666], "isController": false}, {"data": ["Caller - Read Response", 219, 0, 0.0, 681.2602739726027, 0, 6015, 0.0, 6000.0, 6005.0, 6012.8, 0.7885697001994829, 0.07913968711066621, 0.0], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 96, 0, 0.0, 0.09375, 0, 2, 0.0, 0.0, 1.0, 2.0, 0.3923091068837989, 0.02145440428270775, 0.0], "isController": false}, {"data": ["07 - Call Ended by Receiver", 286, 0, 0.0, 0.26223776223776224, 0, 3, 0.0, 1.0, 1.0, 1.0, 1.2035162874468202, 0.0, 0.07639507683988604], "isController": false}, {"data": ["09 - Timeout (No Response)", 46, 0, 0.0, 8.565217391304346, 5, 19, 7.5, 13.300000000000004, 15.299999999999997, 19.0, 0.19707556991255842, 0.007890721060952045, 0.0], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 167, 0, 0.0, 86.79640718562874, 0, 5822, 0.0, 1.0, 1.0, 4347.079999999985, 0.6451388593790442, 0.02394069985976922, 0.0], "isController": false}, {"data": ["Process Call Decision", 453, 0, 0.0, 10.487858719646795, 4, 74, 9.0, 16.0, 21.0, 38.2999999999999, 1.7513202557778105, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 115, 0, 0.0, 0.07826086956521737, 0, 1, 0.0, 0.0, 1.0, 1.0, 0.47898904156375344, 0.02484023502742733, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4846, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
