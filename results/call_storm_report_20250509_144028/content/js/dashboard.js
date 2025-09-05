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

    var data = {"OkPercent": 82.88347597103358, "KoPercent": 17.116524028966424};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6755540926047838, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9888888888888889, 500, 1500, "05 - Read Call Response (Ping)"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "01 - WebSocket Connect"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register User"], "isController": false}, {"data": [0.7525125628140703, 500, 1500, "07 - Listen for Incoming Call (Ping)"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Response (Busy)"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Response (Timeout)"], "isController": false}, {"data": [0.9966777408637874, 500, 1500, "05 - Read Call Response"], "isController": false}, {"data": [0.4413027916964925, 500, 1500, "03 - Random Activity Decision"], "isController": false}, {"data": [0.3540305010893246, 500, 1500, "07 - Listen for Incoming Call"], "isController": false}, {"data": [1.0, 500, 1500, "04 - Initiate Call"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4557, 780, 17.116524028966424, 1153.5624314241832, 0, 8011, 1.0, 8000.0, 8001.0, 8001.0, 15.00049376213832, 0.3034644100365384, 0.2949392981171204], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["05 - Read Call Response (Ping)", 180, 0, 0.0, 38.961111111111116, 0, 5343, 0.0, 1.0, 1.0, 2352.4799999999914, 0.7004954059176296, 0.018470093710718748, 0.0], "isController": false}, {"data": ["01 - WebSocket Connect", 120, 0, 0.0, 152.55833333333342, 65, 635, 111.0, 312.70000000000005, 490.2999999999996, 613.7899999999992, 4.035919685198264, 0.5084312884673595, 0.6227297951770759], "isController": false}, {"data": ["02 - Register User", 120, 0, 0.0, 0.19166666666666674, 0, 1, 0.0, 1.0, 1.0, 1.0, 4.053232452881173, 0.0, 0.37702186634465984], "isController": false}, {"data": ["07 - Listen for Incoming Call (Ping)", 398, 0, 0.0, 1149.1482412060302, 0, 7915, 0.0, 5494.500000000001, 6877.749999999999, 7895.08, 1.5448691325055215, 0.040733854079735426, 0.0], "isController": false}, {"data": ["05 - Call Response (Busy)", 10, 0, 0.0, 0.09999999999999999, 0, 1, 0.0, 0.9000000000000004, 1.0, 1.0, 0.40192926045016075, 0.021980506430868168, 0.0], "isController": false}, {"data": ["05 - Call Response (Timeout)", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["05 - Read Call Response", 602, 0, 0.0, 26.62624584717603, 0, 8001, 0.0, 0.0, 0.8500000000000227, 1.0, 2.23264783874497, 0.13570138798746453, 0.0], "isController": false}, {"data": ["03 - Random Activity Decision", 1397, 780, 55.83392984967788, 9.668575518969213, 4, 1154, 8.0, 12.0, 14.0, 34.059999999999945, 4.8238284001602185, 0.0, 0.0], "isController": false}, {"data": ["07 - Listen for Incoming Call", 918, 0, 0.0, 5168.1786492374695, 0, 8011, 8000.0, 8001.0, 8001.0, 8002.8099999999995, 3.161374750327157, 0.08482285066120257, 0.0], "isController": false}, {"data": ["04 - Initiate Call", 811, 0, 0.0, 0.19112207151664634, 0, 1, 0.0, 1.0, 1.0, 1.0, 2.904831834951109, 0.0, 0.2146275833661664], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/javax.script.ScriptException: javax.script.ScriptException: java.lang.NumberFormatException: For input string: &quot;&lt;EOF&gt;&quot;", 780, 100.0, 17.116524028966424], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4557, 780, "500/javax.script.ScriptException: javax.script.ScriptException: java.lang.NumberFormatException: For input string: &quot;&lt;EOF&gt;&quot;", 780, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["03 - Random Activity Decision", 1397, 780, "500/javax.script.ScriptException: javax.script.ScriptException: java.lang.NumberFormatException: For input string: &quot;&lt;EOF&gt;&quot;", 780, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
