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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6466760464298277, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9833333333333333, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Receiver Target"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}, {"data": [0.9642857142857143, 500, 1500, "Caller - Read Response (Timeout)"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.24371859296482412, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.9381443298969072, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (User Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [0.8571428571428571, 500, 1500, "Caller - Read Response (Ping Handled)"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "Caller - Read Response (Target Unavailable)"], "isController": false}, {"data": [0.25630252100840334, 500, 1500, "04 - Call Received (Ping Handled)"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2843, 0, 0.0, 2031.3186774533956, 0, 6018, 17.0, 6010.0, 6012.0, 6014.5599999999995, 22.78446521021334, 0.5763595520644664, 0.43931146716568625], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["01 - Connect", 120, 0, 0.0, 109.49999999999997, 51, 1042, 58.0, 188.9, 374.19999999999914, 1037.3799999999999, 6.101901759381674, 0.7686966083596054, 0.9415043730295942], "isController": false}, {"data": ["Select Receiver Target", 300, 0, 0.0, 18.080000000000013, 6, 159, 13.0, 30.900000000000034, 44.0, 111.73000000000025, 4.972155926809865, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 300, 0, 0.0, 0.3766666666666665, 0, 2, 0.0, 1.0, 1.0, 2.0, 4.963682390509439, 0.0, 0.2569093424775393], "isController": false}, {"data": ["05 - Call Accepted", 102, 0, 0.0, 0.3137254901960783, 0, 2, 0.0, 1.0, 1.0, 1.9699999999999989, 1.069821591516944, 0.0, 0.07731132594946666], "isController": false}, {"data": ["Caller - Read Response (Timeout)", 28, 0, 0.0, 160.64285714285714, 0, 4495, 0.0, 1.0, 2472.699999999987, 4495.0, 0.5868790609935025, 0.037826189478096836, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.3166666666666667, 0, 1, 0.0, 1.0, 1.0, 1.0, 6.130581383467866, 0.0, 0.23947583529171348], "isController": false}, {"data": ["04 - Call Received", 1194, 0, 0.0, 4441.638190954772, 0, 6018, 6002.0, 6013.0, 6014.0, 6015.0, 9.661288495460651, 0.22642854722622305, 0.0], "isController": false}, {"data": ["Caller - Read Response", 97, 0, 0.0, 372.0927835051548, 0, 6015, 0.0, 1.0, 6010.1, 6015.0, 1.8175345237872174, 0.2488936109913995, 0.0], "isController": false}, {"data": ["Caller - Read Response (User Busy)", 107, 0, 0.0, 0.17757009345794397, 0, 2, 0.0, 1.0, 1.0, 1.9200000000000017, 2.149241739479763, 0.11753665762779955, 0.0], "isController": false}, {"data": ["07 - Call Ended", 102, 0, 0.0, 0.28431372549019607, 0, 1, 0.0, 1.0, 1.0, 1.0, 1.068364878028343, 0.0, 0.067816129952971], "isController": false}, {"data": ["06 - Call Rejected", 31, 0, 0.0, 0.2258064516129032, 0, 2, 0.0, 1.0, 1.3999999999999986, 2.0, 0.31435698785162347, 0.0, 0.022717204200214978], "isController": false}, {"data": ["Caller - Read Response (Ping Handled)", 28, 0, 0.0, 528.857142857143, 0, 5819, 0.5, 3316.600000000001, 4982.899999999995, 5819.0, 0.9784735812133072, 0.036310543052837575, 0.0], "isController": false}, {"data": ["Process Call Decision", 155, 0, 0.0, 26.18709677419356, 5, 231, 18.0, 49.20000000000002, 75.59999999999997, 167.71999999999974, 1.4516234769660132, 0.0, 0.0], "isController": false}, {"data": ["Caller - Read Response (Target Unavailable)", 40, 0, 0.0, 0.1, 0, 1, 0.0, 0.8999999999999986, 1.0, 1.0, 0.8318429480514078, 0.05036549099530009, 0.0], "isController": false}, {"data": ["04 - Call Received (Ping Handled)", 119, 0, 0.0, 3306.378151260505, 0, 5926, 3772.0, 5921.0, 5925.0, 5925.8, 1.7278178676694786, 0.06411824118304706, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2843, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
