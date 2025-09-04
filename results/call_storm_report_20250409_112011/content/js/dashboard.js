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

    var data = {"OkPercent": 94.92455418381344, "KoPercent": 5.075445816186557};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8664837677183356, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8263888888888888, 500, 1500, "Regular Caller - Read Response"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Heavy Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.26199261992619927, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Random Target"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2187, 111, 5.075445816186557, 493.78006401463284, 0, 6016, 0.0, 168.80000000000064, 6001.0, 6011.0, 18.844026262730704, 0.5397775923460683, 0.4646198587128849], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Regular Caller - Read Response", 288, 50, 17.36111111111111, 0.07638888888888892, 0, 1, 0.0, 0.0, 1.0, 1.0, 3.1458563173819485, 0.2621973615222449, 0.0], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 35, 14.583333333333334, 133.5708333333334, 0, 6013, 0.0, 0.0, 1.0, 6010.95, 2.4442905446694096, 0.1528178882602762, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.3833333333333336, 0, 2, 0.0, 1.0, 1.0, 2.0, 6.2754941951678695, 0.0, 0.2451364919987449], "isController": false}, {"data": ["04 - Call Received", 271, 26, 9.59409594095941, 3814.4612546125436, 0, 6016, 6000.0, 6010.0, 6012.0, 6015.0, 2.906259718811329, 0.09136520477870602, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 109.70833333333336, 52, 722, 58.5, 231.60000000000002, 338.9999999999998, 713.5999999999997, 6.1945075366508355, 0.7803627658476151, 0.955793155069172], "isController": false}, {"data": ["Select Random Target", 528, 0, 0.0, 1.1268939393939392, 0, 297, 1.0, 1.0, 1.0, 2.0, 5.377713046046669, 0.0, 0.0], "isController": false}, {"data": ["07 - Call Ended", 17, 0, 0.0, 0.3529411764705883, 0, 2, 0.0, 1.1999999999999993, 2.0, 2.0, 0.42799597180261834, 0.0, 0.027167713053877142], "isController": false}, {"data": ["06 - Call Rejected", 10, 0, 0.0, 0.39999999999999997, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.17267280230690865, 0.0, 0.012478307979210195], "isController": false}, {"data": ["Process Call Decision", 43, 0, 0.0, 4.046511627906977, 0, 128, 0.0, 1.6000000000000014, 14.0, 128.0, 0.5678666701883204, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 528, 0, 0.0, 0.20075757575757575, 0, 2, 0.0, 1.0, 1.0, 1.0, 5.244963642865658, 0.0, 0.2714678447967576], "isController": false}, {"data": ["05 - Call Accepted", 22, 0, 0.0, 0.13636363636363638, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.3825953879865048, 0.0, 0.02764849483496226], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 111, 100.0, 5.075445816186557], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2187, 111, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 111, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Regular Caller - Read Response", 288, 50, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 35, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 35, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["04 - Call Received", 271, 26, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 26, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
